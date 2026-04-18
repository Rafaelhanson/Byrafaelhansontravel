(function attachAuth(windowObj) {
  const config = windowObj.APP_AUTH_CONFIG || {};
  const loginPath = config.loginPath || "./login.html";

  function hasSupabaseKeys() {
    return Boolean(config.supabaseUrl && config.supabaseAnonKey);
  }

  function isLoginPage() {
    return window.location.pathname.endsWith("login.html");
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
    return true;
  }

  async function signIn(email, password) {
    if (!client) throw new Error("Supabase não configurado.");
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    redirectAfterLogin();
  }

  async function signUp(email, password) {
    if (!client) throw new Error("Supabase não configurado.");
    const { error } = await client.auth.signUp({ email, password });
    if (error) throw error;
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
    redirectAfterLogin
  };
})(window);
