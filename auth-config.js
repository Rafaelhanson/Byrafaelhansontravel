window.APP_AUTH_CONFIG = {
  enabled: true,
  loginPath: "./login.html",
  redirectAfterLogin: "./index.html",
  supabaseUrl: "https://dxdmqarllnljhhddyxsz.supabase.co",
  supabaseAnonKey: "sb_publishable_D5e4vSZGg5R-pO1AB819tg_aGEY1ycc",
  // Opção 2: acesso apenas para usuários aprovados (produto pago)
  // Se true, o login só entra para quem estiver na whitelist abaixo
  // ou na tabela do Supabase configurada em approvedUsersTable.
  requireApproval: true,
  // Whitelist rápida para testes (adicione/remova emails aqui).
  approvedEmails: [
    "rafaelhansonfotografo@gmail.com"
  ],
  // Opcional: tabela com usuários aprovados no Supabase.
  // Estrutura esperada: email (text), active (boolean).
  approvedUsersTable: "approved_users",
  // Se true, falha fechado quando tabela não existe/erro de leitura.
  failClosedApproval: true,
  // Opcional: webhook para notificar novo cadastro (Telegram, Make, Zapier, etc).
  // Exemplo: "https://hooks.zapier.com/hooks/catch/xxxx/yyyy"
  signupWebhookUrl: "https://dxdmqarllnljhhddyxsz.supabase.co/functions/v1/quick-endpoint",
  // URL base para abrir a tela de aprovação no celular/computador.
  // O sistema adiciona automaticamente ?approve_email=<email>.
  // Exemplo: "https://seu-dominio.com/index.html#my-account"
  signupApprovalUrl: "http://127.0.0.1:5500/index.html#my-account",
  // URL opcional para abrir direto uma busca no Hotmart por e-mail.
  // O sistema adiciona automaticamente ?email=<email>.
  hotmartCheckUrl: "https://app-vlc.hotmart.com/sales",
  // Opcional: tabela para registrar eventos de cadastro no Supabase.
  signupLogTable: "signup_notifications",
  // Sincroniza rotas e gastos entre navegador local e app publicado no Vercel.
  // Estrutura criada no arquivo supabase_access_setup.sql.
  userDataTable: "app_user_data",
  // Opcional: chave do Google Maps JavaScript API com Places API (New) habilitada.
  // Use uma chave de navegador com restrição por domínio no Google Cloud.
  googleMapsApiKey: ""
};

