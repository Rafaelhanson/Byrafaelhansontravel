window.APP_AUTH_CONFIG = {
  enabled: true,
  loginPath: "./login.html",
  redirectAfterLogin: "./index.html",
  supabaseUrl: "https://dxdmqarllnljhhddyxsz.supabase.co",
  supabaseAnonKey: "sb_publishable_D5e4vSZGg5R-pO1AB819tg_aGEY1ycc",
  // OpÃ§Ã£o 2: acesso apenas para usuÃ¡rios aprovados (produto pago)
  // Se true, o login sï¿½ entra para quem estiver na whitelist abaixo
  // ou na tabela do Supabase configurada em approvedUsersTable.
  requireApproval: true,
  // Whitelist rï¿½pida para testes (adicione/remova emails aqui).
  approvedEmails: [
    "rafaelhansonfotografo@gmail.com"
  ],
  // Opcional: tabela com usuï¿½rios aprovados no Supabase.
  // Estrutura esperada: email (text), active (boolean).
  approvedUsersTable: "approved_users",
  // Se true, falha fechado quando tabela nÃ£o existe/erro de leitura.
  failClosedApproval: true,
  // Opcional: webhook para notificar novo cadastro (Telegram, Make, Zapier, etc).
  // Exemplo: "https://hooks.zapier.com/hooks/catch/xxxx/yyyy"
  signupWebhookUrl: "",
  // Opcional: tabela para registrar eventos de cadastro no Supabase.
  signupLogTable: "signup_notifications",
  // Sincroniza rotas e gastos entre navegador local e app publicado no Vercel.
  // Estrutura criada no arquivo supabase_access_setup.sql.
  userDataTable: "app_user_data",
  // Opcional: chave do Google Maps JavaScript API com Places API (New) habilitada.
  // Use uma chave de navegador com restriÃ§Ã£o por domÃ­nio no Google Cloud.
  googleMapsApiKey: ""
};

