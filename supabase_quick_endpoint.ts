import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
const adminNotifyEmail = Deno.env.get("ADMIN_NOTIFY_EMAIL") || "";
const approvalBaseUrl = Deno.env.get("APPROVAL_BASE_URL") || "";
const hotmartCheckUrl = Deno.env.get("HOTMART_CHECK_URL") || "https://app-vlc.hotmart.com/sales";
const notifyFromEmail = Deno.env.get("NOTIFY_FROM_EMAIL") || "onboarding@resend.dev";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function normalizeEmail(email: unknown): string {
  return String(email || "").trim().toLowerCase();
}

function randomTokenHex(bytes = 32): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function appendEmailToHotmart(urlBase: string, email: string): string {
  try {
    const url = new URL(urlBase);
    url.searchParams.set("email", email);
    return url.toString();
  } catch {
    return urlBase;
  }
}

function buildApprovalLink(baseUrl: string, email: string, token: string): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("approve_email", email);
    url.searchParams.set("approve_token", token);
    return url.toString();
  } catch {
    return `${baseUrl}?approve_email=${encodeURIComponent(email)}&approve_token=${encodeURIComponent(token)}`;
  }
}

async function sendEmail(params: { to: string; subject: string; html: string }) {
  if (!resendApiKey) throw new Error("RESEND_API_KEY não configurado.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: notifyFromEmail,
      to: params.to,
      subject: params.subject,
      html: params.html
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro no Resend: ${response.status} ${errorText}`);
  }
}

async function handleSignupEvent(payload: any) {
  const email = normalizeEmail(payload?.email);
  if (!email) return json({ ok: false, error: "E-mail ausente no cadastro." }, 400);
  if (!adminNotifyEmail) return json({ ok: false, error: "ADMIN_NOTIFY_EMAIL não configurado." }, 500);
  if (!approvalBaseUrl) return json({ ok: false, error: "APPROVAL_BASE_URL não configurado." }, 500);

  const token = randomTokenHex(32);
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { error: tokenInsertError } = await supabaseAdmin.from("approval_tokens").insert({
    email,
    token_hash: tokenHash,
    expires_at: expiresAt
  });
  if (tokenInsertError) {
    return json({ ok: false, error: `Falha ao salvar token: ${tokenInsertError.message}` }, 500);
  }

  const approvalLink = buildApprovalLink(approvalBaseUrl, email, token);
  const hotmartLink = appendEmailToHotmart(hotmartCheckUrl, email);

  await sendEmail({
    to: adminNotifyEmail,
    subject: `Novo cadastro: ${email}`,
    html: `
      <h2>Novo cadastro no app</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Data:</strong> ${new Date().toISOString()}</p>
      <p><strong>Conferir no Hotmart:</strong><br/><a href="${hotmartLink}">${hotmartLink}</a></p>
      <p><strong>Aprovar usuário (1 clique):</strong><br/><a href="${approvalLink}">${approvalLink}</a></p>
      <p><small>Esse link expira em 24h e só funciona uma vez.</small></p>
    `
  });

  return json({ ok: true, event: "signup", approval_link_sent: true });
}

async function approveUserAndMarkToken(email: string, tokenHash: string) {
  const nowIso = new Date().toISOString();

  const { data: tokenRow, error: tokenError } = await supabaseAdmin
    .from("approval_tokens")
    .select("id, email, token_hash, expires_at, used_at")
    .eq("email", email)
    .eq("token_hash", tokenHash)
    .is("used_at", null)
    .gt("expires_at", nowIso)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (tokenError) throw new Error(`Erro ao validar token: ${tokenError.message}`);
  if (!tokenRow) throw new Error("Link inválido, expirado ou já utilizado.");

  const { error: approveError } = await supabaseAdmin
    .from("approved_users")
    .upsert({ email, active: true }, { onConflict: "email" });
  if (approveError) throw new Error(`Erro ao aprovar usuário: ${approveError.message}`);

  const { error: tokenUseError } = await supabaseAdmin
    .from("approval_tokens")
    .update({ used_at: nowIso })
    .eq("id", tokenRow.id);
  if (tokenUseError) throw new Error(`Erro ao concluir aprovação: ${tokenUseError.message}`);
}

async function sendApprovedEmailToUser(email: string, approvedBy?: string | null) {
  await sendEmail({
    to: email,
    subject: "Sua conta foi liberada",
    html: `
      <h2>Conta aprovada com sucesso</h2>
      <p>Olá, sua conta foi liberada e já pode ser usada no aplicativo.</p>
      <p><strong>Email:</strong> ${email}</p>
      ${approvedBy ? `<p><strong>Aprovado por:</strong> ${approvedBy}</p>` : ""}
      <p>Agora você já pode fazer login normalmente.</p>
    `
  });
}

async function handleApproveByTokenEvent(payload: any) {
  const email = normalizeEmail(payload?.email);
  const token = String(payload?.token || "").trim();
  if (!email || !token) return json({ ok: false, error: "Email/token ausentes." }, 400);

  const tokenHash = await sha256Hex(token);
  await approveUserAndMarkToken(email, tokenHash);
  await sendApprovedEmailToUser(email, "Aprovação por link seguro");

  return json({ ok: true, event: "approve_user_token", approved: true });
}

async function handleUserApprovedEvent(payload: any) {
  const email = normalizeEmail(payload?.email);
  const approvedBy = normalizeEmail(payload?.approved_by || "") || null;
  if (!email) return json({ ok: false, error: "Email ausente." }, 400);

  await sendApprovedEmailToUser(email, approvedBy);
  return json({ ok: true, event: "user_approved", emailed: true });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Método não permitido." }, 405);

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return json({ ok: false, error: "SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY não configurados." }, 500);
  }

  let payload: any = {};
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "JSON inválido." }, 400);
  }

  const event = String(payload?.event || "signup").trim();

  try {
    if (event === "approve_user_token") return await handleApproveByTokenEvent(payload);
    if (event === "user_approved") return await handleUserApprovedEvent(payload);
    return await handleSignupEvent(payload);
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Erro interno." }, 500);
  }
});

