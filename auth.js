(function attachAuth(windowObj) {
  const config = windowObj.APP_AUTH_CONFIG || {};
  const loginPath = config.loginPath || "./login.html";
  const approvedUsersTable = config.approvedUsersTable || "approved_users";
  const signupLogTable = config.signupLogTable || "signup_notifications";

  function hasSupabaseKeys() {
    return Boolean(config.supabaseUrl && config.supabaseAnonKey);
  }

  function isLoginPage() {
    return window.location.pathname.endsWith("login.html");
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function buildAdminApprovalLink(email) {
    const normalized = normalizeEmail(email);
    if (!normalized) return "";
    const defaultBase = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, "/")}index.html#my-account`;
    let base = config.signupApprovalUrl || defaultBase;
    // Evita gerar e-mail com localhost quando o cadastro foi feito no app publicado.
    if (/^https?:\/\/(127\.0\.0\.1|localhost)/i.test(base) && window.location.protocol !== "file:") {
      base = defaultBase;
    }
    if (window.location.protocol === "file:" && (!base || base.startsWith("./") || base.startsWith("file://"))) {
      base = "http://127.0.0.1:5500/index.html#my-account";
    }
    try {
      const url = new URL(base, window.location.href);
      url.searchParams.set("approve_email", normalized);
      return url.toString();
    } catch (_error) {
      return "";
    }
  }

  function buildHotmartCheckLink(email) {
    const normalized = normalizeEmail(email);
    if (!normalized) return "";
    const base = config.hotmartCheckUrl || "";
    if (!base) return "";
    try {
      const url = new URL(base, window.location.href);
      url.searchParams.set("email", normalized);
      return url.toString();
    } catch (_error) {
      return "";
    }
  }

  function withNext(path) {
    const next = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const target = new URL(path, window.location.href);
    target.searchParams.set("next", next);
    return target.toString();
  }

  function redirectToLogin() {
    window.location.href = withNext(loginPath);
  }

  function sanitizeNextPath(nextValue) {
    if (!nextValue) return null;
    try {
      const candidate = new URL(nextValue, window.location.origin);
      if (candidate.origin !== window.location.origin) return null;
      return `${candidate.pathname}${candidate.search}${candidate.hash}`;
    } catch (_error) {
      return null;
    }
  }

  function hasApproveEmailParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      return Boolean(String(params.get("approve_email") || "").trim());
    } catch (_error) {
      return false;
    }
  }

  function redirectAfterLogin() {
    const params = new URLSearchParams(window.location.search);
    const safeNext = sanitizeNextPath(params.get("next"));
    const fallback = config.redirectAfterLogin || "./index.html";
    window.location.href = safeNext || fallback;
  }

  function createClient() {
    if (!windowObj.supabase || !windowObj.supabase.createClient) return null;
    if (!hasSupabaseKeys()) return null;
    return windowObj.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }

  const client = createClient();

  function isEmailInWhitelist(email) {
    const normalized = normalizeEmail(email);
    const list = Array.isArray(config.approvedEmails) ? config.approvedEmails : [];
    return list.map(normalizeEmail).includes(normalized);
  }

  async function isUserApproved(email) {
    if (!config.requireApproval) return true;
    if (isEmailInWhitelist(email)) return true;
    if (!client) return false;

    try {
      const normalized = normalizeEmail(email);
      const { data, error } = await client
        .from(approvedUsersTable)
        .select("email, active")
        .eq("email", normalized)
        .maybeSingle();

      if (error) {
        if (config.failClosedApproval) return false;
        return true;
      }
      if (!data) return false;
      return data.active !== false;
    } catch (_err) {
      return !config.failClosedApproval;
    }
  }

  async function isAdminUser(email) {
    if (!client) return false;
    const adminsTable = config.adminUsersTable || "app_admins";
    const normalized = normalizeEmail(email);
    if (!normalized) return false;
    try {
      const { data, error } = await client
        .from(adminsTable)
        .select("email, active")
        .eq("email", normalized)
        .maybeSingle();
      if (error || !data) return false;
      return data.active !== false;
    } catch (_err) {
      return false;
    }
  }

  async function isCurrentUserAdmin() {
    const session = await getSession();
    const email = normalizeEmail(session?.user?.email || "");
    if (!email) return false;
    return isAdminUser(email);
  }

  async function notifyUserApproved(email) {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) return;
    const approvalWebhookUrl = config.approvalWebhookUrl || config.signupWebhookUrl || "";
    if (!approvalWebhookUrl) return;

    const session = await getSession();
    const approvedBy = normalizeEmail(session?.user?.email || "");
    const payload = {
      event: "user_approved",
      email: normalizedEmail,
      approved_by: approvedBy || null,
      approved_at: new Date().toISOString(),
      source: "web"
    };

    try {
      await fetch(approvalWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (_err) {
      // Não interrompe a aprovação se o webhook falhar.
    }
  }

  async function approveUserByToken(email, token) {
    const normalizedEmail = normalizeEmail(email);
    const normalizedToken = String(token || "").trim();
    if (!normalizedEmail) throw new Error("E-mail inválido para aprovação.");
    if (!normalizedToken) throw new Error("Token de aprovação ausente.");

    const approvalWebhookUrl = config.approvalWebhookUrl || config.signupWebhookUrl || "";
    if (!approvalWebhookUrl) throw new Error("Webhook de aprovação não configurado.");

    const response = await fetch(approvalWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "approve_user_token",
        email: normalizedEmail,
        token: normalizedToken,
        source: "web"
      })
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (_error) {}

    if (!response.ok || payload?.ok === false) {
      throw new Error(payload?.error || "Não foi possível aprovar este usuário por link.");
    }
    return true;
  }

  async function approveUserEmail(email) {
    if (!client) throw new Error("Supabase não configurado.");
    const normalized = normalizeEmail(email);
    if (!normalized) throw new Error("E-mail inválido para aprovação.");
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) throw new Error("Somente administradores podem aprovar usuários.");

    const { error } = await client
      .from(approvedUsersTable)
      .upsert({ email: normalized, active: true }, { onConflict: "email" });
    if (error) throw error;
    await notifyUserApproved(normalized);
    return true;
  }

  async function notifyNewSignup(email, userId) {
    const normalizedEmail = normalizeEmail(email);
    const approvalLink = buildAdminApprovalLink(normalizedEmail);
    const hotmartCheckLink = buildHotmartCheckLink(normalizedEmail);
    const payload = {
      email: normalizedEmail,
      user_id: userId || null,
      created_at: new Date().toISOString(),
      source: "web",
      approval_link: approvalLink || null,
      hotmart_check_link: hotmartCheckLink || null
    };

    if (client && signupLogTable) {
      try {
        await client.from(signupLogTable).insert(payload);
      } catch (_err) {
      }
    }

    if (config.signupWebhookUrl) {
      try {
        await fetch(config.signupWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch (_err) {
      }
    }
  }

  async function getSession() {
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data?.session || null;
  }

  async function requireAuth() {
    if (!config.enabled) return true;
    if (isLoginPage()) return true;
    if (!client) {
      alert("Autenticação não configurada. Preencha supabaseUrl e supabaseAnonKey em auth-config.js.");
      redirectToLogin();
      return false;
    }
    const session = await getSession();
    if (!session) {
      redirectToLogin();
      return false;
    }
    const approvalFlow = hasApproveEmailParam();
    if (approvalFlow) {
      const adminViaWhitelist = isEmailInWhitelist(session.user?.email || "");
      const adminViaTable = await isAdminUser(session.user?.email || "");
      const isAdminForApproval = adminViaWhitelist || adminViaTable;
      if (!isAdminForApproval) {
        if (client) await client.auth.signOut();
        alert("Para aprovar usuários, entre com a conta de administrador.");
        window.location.href = withNext(loginPath);
        return false;
      }
      return true;
    }
    const approved = await isUserApproved(session.user?.email || "");
    if (!approved) {
      await signOut();
      alert("Sua conta ainda não foi liberada. Aguarde aprovação do administrador.");
      return false;
    }
    return true;
  }

  async function signIn(email, password) {
    if (!client) throw new Error("Supabase não configurado.");
    const normalizedEmail = normalizeEmail(email);
    const { error } = await client.auth.signInWithPassword({ email: normalizedEmail, password });
    if (error) throw error;

    const approved = await isUserApproved(normalizedEmail);
    if (!approved) {
      await client.auth.signOut();
      throw new Error("Sua conta ainda não foi liberada. Aguarde aprovação do administrador.");
    }
    redirectAfterLogin();
  }

  async function signUp(email, password) {
    if (!client) throw new Error("Supabase não configurado.");
    const normalizedEmail = normalizeEmail(email);
    const { data, error } = await client.auth.signUp({ email: normalizedEmail, password });
    if (error) throw error;
    await notifyNewSignup(normalizedEmail, data?.user?.id || null);
  }

  async function signOut() {
    if (!client) return;
    await client.auth.signOut();
    window.location.href = loginPath;
  }

  function bindLogoutButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    button.addEventListener("click", () => {
      signOut();
    });
  }

  async function bindUserEmailChip(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const applyEmail = (email) => {
      if (!email) {
        el.hidden = true;
        el.textContent = "";
        return;
      }
      el.textContent = email;
      el.hidden = false;
    };

    const session = await getSession();
    let email = session?.user?.email;

    if (!email && client) {
      const { data } = await client.auth.getUser();
      email = data?.user?.email || "";
    }

    applyEmail(email);

    if (client) {
      client.auth.onAuthStateChange((_event, currentSession) => {
        applyEmail(currentSession?.user?.email || "");
      });
    }
  }

  windowObj.AppAuth = {
    client,
    config,
    hasSupabaseKeys,
    requireAuth,
    getSession,
    signIn,
    signUp,
    signOut,
    bindLogoutButton,
    bindUserEmailChip,
    redirectAfterLogin,
    isUserApproved,
    isCurrentUserAdmin,
    approveUserEmail,
    approveUserByToken
  };
})(window);

