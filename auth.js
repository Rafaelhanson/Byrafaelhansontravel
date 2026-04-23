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

  function withNext(path) {
    const next = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const target = new URL(path, window.location.href);
    target.searchParams.set("next", next);
    return target.toString();
  }

  function redirectToLogin() {
    window.location.href = withNext(loginPath);
  }

  function redirectAfterLogin() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") || config.redirectAfterLogin || "./index.html";
    window.location.href = next;
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

  async function notifyNewSignup(email, userId) {
    const payload = {
      email: normalizeEmail(email),
      user_id: userId || null,
      created_at: new Date().toISOString(),
      source: "web"
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
    isUserApproved
  };
})(window);
