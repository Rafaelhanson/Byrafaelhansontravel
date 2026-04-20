const POIS = [
  { id: "puerto-madryn", name: "Puerto Madryn", city: "Puerto Madryn", country: "Argentina", category: "city", lat: -42.7692, lng: -65.0385, distFromRoute: 12, description: "Base para natureza e fauna marinha na Patagônia atlântica.", maps: "https://maps.google.com/?q=Puerto+Madryn", image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60d?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "buenos-aires", name: "Buenos Aires", city: "Buenos Aires", country: "Argentina", category: "city", lat: -34.6037, lng: -58.3816, distFromRoute: 0, description: "Capital argentina com cultura, gastronomia e ótima estrutura.", maps: "https://maps.google.com/?q=Buenos+Aires", image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "ushuaia", name: "Ushuaia", city: "Ushuaia", country: "Argentina", category: "city", lat: -54.8019, lng: -68.303, distFromRoute: 0, description: "Cidade mais austral da jornada.", maps: "https://maps.google.com/?q=Ushuaia", image: "https://images.unsplash.com/photo-1612298484490-72f0605e9055?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "torres", name: "Parque Nacional Torres del Paine", city: "Puerto Natales", country: "Chile", category: "national_park", lat: -50.9423, lng: -73.4068, distFromRoute: 20, description: "Parque nacional icônico com lagos e torres de granito.", maps: "https://maps.google.com/?q=Torres+del+Paine", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "calafate", name: "El Calafate", city: "El Calafate", country: "Argentina", category: "city", lat: -50.3379, lng: -72.2648, distFromRoute: 0, description: "Base principal para visitar glaciares.", maps: "https://maps.google.com/?q=El+Calafate", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "perito-moreno", name: "Glaciar Perito Moreno", city: "El Calafate", country: "Argentina", category: "attraction", lat: -50.4966, lng: -73.1371, distFromRoute: 45, description: "Um dos glaciares mais impressionantes do planeta.", maps: "https://maps.google.com/?q=Glaciar+Perito+Moreno", image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "chalten", name: "El Chaltén", city: "El Chaltén", country: "Argentina", category: "city", lat: -49.3315, lng: -72.8863, distFromRoute: 0, description: "Capital do trekking na Patagônia argentina.", maps: "https://maps.google.com/?q=El+Chalten", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "fitz-roy", name: "Fitz Roy", city: "El Chaltén", country: "Argentina", category: "viewpoint", lat: -49.2713, lng: -73.0434, distFromRoute: 12, description: "Montanha símbolo da região com visual épico.", maps: "https://maps.google.com/?q=Fitz+Roy", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "bariloche", name: "Bariloche", city: "Bariloche", country: "Argentina", category: "city", lat: -41.1335, lng: -71.3103, distFromRoute: 0, description: "Cidade alpina com montanhas, lagos e esportes.", maps: "https://maps.google.com/?q=Bariloche", image: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "cerro-catedral", name: "Cerro Catedral", city: "Bariloche", country: "Argentina", category: "attraction", lat: -41.1715, lng: -71.4393, distFromRoute: 9, description: "Centro de esqui e trekking clássico de Bariloche.", maps: "https://maps.google.com/?q=Cerro+Catedral+Bariloche", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "circuito-chico", name: "Circuito Chico", city: "Bariloche", country: "Argentina", category: "viewpoint", lat: -41.0898, lng: -71.5319, distFromRoute: 6, description: "Roteiro panorâmico com mirantes e lagos.", maps: "https://maps.google.com/?q=Circuito+Chico+Bariloche", image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico", "gratuito"] },
  { id: "nahuel-huapi", name: "Lago Nahuel Huapi", city: "Bariloche", country: "Argentina", category: "viewpoint", lat: -41.0956, lng: -71.423, distFromRoute: 4, description: "Lago icônico da região dos lagos andinos.", maps: "https://maps.google.com/?q=Lago+Nahuel+Huapi", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico", "gratuito"] },
  { id: "cerro-otto", name: "Cerro Otto", city: "Bariloche", country: "Argentina", category: "attraction", lat: -41.127, lng: -71.3711, distFromRoute: 5, description: "Mirante com teleférico e visual da cidade.", maps: "https://maps.google.com/?q=Cerro+Otto+Bariloche", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "piedras-blancas", name: "Piedras Blancas", city: "Bariloche", country: "Argentina", category: "attraction", lat: -41.133, lng: -71.3309, distFromRoute: 6, description: "Complexo recreativo de neve e aventura.", maps: "https://maps.google.com/?q=Piedras+Blancas+Bariloche", image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "isla-victoria", name: "Isla Victoria e Bosque de Arrayanes", city: "Bariloche", country: "Argentina", category: "attraction", lat: -40.7872, lng: -71.6467, distFromRoute: 18, description: "Passeio náutico clássico com bosque único.", maps: "https://maps.google.com/?q=Isla+Victoria+Bosque+de+Arrayanes", image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "cerro-tronador", name: "Cerro Tronador", city: "Bariloche", country: "Argentina", category: "viewpoint", lat: -41.1633, lng: -71.8857, distFromRoute: 42, description: "Montanha e glaciar impressionantes no parque.", maps: "https://maps.google.com/?q=Cerro+Tronador", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "ruta-7-lagos", name: "Ruta de los 7 Lagos", city: "Neuquén", country: "Argentina", category: "viewpoint", lat: -40.7627, lng: -71.6463, distFromRoute: 14, description: "Rota cênica imperdível entre lagos andinos.", maps: "https://maps.google.com/?q=Ruta+de+los+7+Lagos", image: "https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico", "gratuito"] },
  { id: "valle", name: "Valle Encantado", city: "Neuquén", country: "Argentina", category: "attraction", lat: -40.8235, lng: -69.8352, distFromRoute: 9, description: "Parada cênica com formações rochosas.", maps: "https://maps.google.com/?q=Valle+Encantado+Neuquen", image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "gratuito", "turistico"] }
];

const STAGES = [
  { id: "s1", title: "Etapa 1: Brasil até Ushuaia", sum: "Logística e fronteiras.", km: 4300, time: "6-9 dias", must: ["Canal Beagle", "Tierra del Fuego"], sleep: ["Río Gallegos", "Río Grande", "Ushuaia"], tips: ["Abasteça acima de meio tanque"] },
  { id: "s2", title: "Etapa 2: Ushuaia até Torres del Paine", sum: "Trecho com vento e fronteira.", km: 820, time: "2-3 dias", must: ["Miradores"], sleep: ["Río Gallegos", "Puerto Natales"], tips: ["Checar horários de fronteira"] },
  { id: "s3", title: "Etapa 3: Torres del Paine até El Chaltén / El Calafate", sum: "Parques e glaciares.", km: 620, time: "3-4 dias", must: ["Perito Moreno", "Fitz Roy"], sleep: ["El Calafate", "El Chaltén"], tips: ["Reserve ingressos"] },
  { id: "s4", title: "Etapa 4: El Chaltén até Bariloche", sum: "Subida cênica.", km: 1450, time: "3-5 dias", must: ["Valle Encantado"], sleep: ["Neuquén", "Bariloche"], tips: ["Planeje alimentação de estrada"] },
  { id: "s5", title: "Etapa 5: Bariloche até Buenos Aires", sum: "Natureza para cidade.", km: 1600, time: "3-4 dias", must: ["Laguna de Gómez"], sleep: ["Junín", "Buenos Aires"], tips: ["Revisão leve do carro"] },
  { id: "s6", title: "Etapa 6: Buenos Aires até Brasil", sum: "Retorno organizado.", km: 1250, time: "2-3 dias", must: ["Lihué Calel"], sleep: ["Paso de los Libres"], tips: ["Planeje câmbio final"] }
];

const TOPICS = [
  ["Documentos", ["RG/passaporte", "CNH e documento do veículo", "Carta Verde", "SOAPEX para Chile"]],
  ["Fronteiras", ["Uruguaiana ↔ Paso de los Libres", "Valide horários oficiais"]],
  ["Combustível", ["Trechos longos sem posto", "Regra: tanque acima de meio"]],
  ["Dinheiro/Internet", ["Cartão + espécie", "Mapas offline", "Chip internacional"]],
  ["Melhor época", ["Novembro-março", "Outubro/abril também são ótimos"]],
  ["Links úteis", ["Receita Federal", "Parques nacionais ARG/CHI", "Google Maps"]]
];

const CITY_REFERENCE = [
  ["São Paulo", -23.5505, -46.6333], ["Rio de Janeiro", -22.9068, -43.1729], ["Curitiba", -25.4284, -49.2733], ["Porto Alegre", -30.0346, -51.2177],
  ["Florianópolis", -27.5949, -48.5482], ["Brasília", -15.7939, -47.8828], ["Belo Horizonte", -19.9167, -43.9345], ["Salvador", -12.9777, -38.5016],
  ["Erechim", -27.6344, -52.2739], ["Chapecó", -27.1004, -52.6152], ["Passo Fundo", -28.2628, -52.4069], ["Santa Maria", -29.6842, -53.8069],
  ["Uruguaiana", -29.7618, -57.0858], ["Pelotas", -31.7654, -52.3376], ["Caxias do Sul", -29.1634, -51.1797],
  ["Buenos Aires", -34.6037, -58.3816], ["Rosário", -32.9442, -60.6505], ["Córdoba", -31.4201, -64.1888], ["Mendoza", -32.8895, -68.8458],
  ["Neuquén", -38.9516, -68.0591], ["Bariloche", -41.1335, -71.3103], ["El Calafate", -50.3379, -72.2648], ["El Chaltén", -49.3315, -72.8863],
  ["Ushuaia", -54.8019, -68.303], ["Punta Arenas", -53.1638, -70.9171], ["Puerto Natales", -51.7308, -72.506], ["Montevideo", -34.9011, -56.1645]
].map(([name, lat, lng]) => ({ name, lat, lng }));

const CITY_ALIASES = {
  erixim: "Erechim",
  erexim: "Erechim",
  erechim: "Erechim"
};

const originInput = document.getElementById("origin");
const dest1Input = document.getElementById("dest1");
const dest2Input = document.getElementById("dest2");
const dest3Input = document.getElementById("dest3");
const dest4Input = document.getElementById("dest4");
const dest5Input = document.getElementById("dest5");
const originList = document.getElementById("originList");
const dest1List = document.getElementById("dest1List");
const dest2List = document.getElementById("dest2List");
const dest3List = document.getElementById("dest3List");
const dest4List = document.getElementById("dest4List");
const dest5List = document.getElementById("dest5List");
const warnEl = document.getElementById("warn");
const genBtn = document.getElementById("genBtn");
const printBtn = document.getElementById("printBtn");
const planActionsEl = document.getElementById("planActions");
const viewRouteBtn = document.getElementById("viewRouteBtn");
const saveRouteBtn = document.getElementById("saveRouteBtn");
const clearPlannerBtn = document.getElementById("clearPlannerBtn");
const routeFocusHeaderEl = document.getElementById("routeFocusHeader");
const routeFocusTitleEl = document.getElementById("routeFocusTitle");
const routeFocusMetaEl = document.getElementById("routeFocusMeta");
const routeShareBtn = document.getElementById("routeShareBtn");
const routeSaveBtn = document.getElementById("routeSaveBtn");
const routePdfBtn = document.getElementById("routePdfBtn");
const routeFocusBackBtn = document.getElementById("routeFocusBackBtn");
const quickMapBtn = document.getElementById("quickMapBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenuPanel = document.getElementById("mobileMenuPanel");
const accountMenuBtn = document.getElementById("accountMenuBtn");
const accountMenuPanel = document.getElementById("accountMenuPanel");
const styleEl = document.getElementById("style");
const daysInputEl = document.getElementById("daysInput");
const dayLimitModeEl = document.getElementById("dayLimitMode");
const dayLimitValueEl = document.getElementById("dayLimitValue");
const dayLimitLabelEl = document.getElementById("dayLimitLabel");
const dayLimitHelpEl = document.getElementById("dayLimitHelp");
const sumKmEl = document.getElementById("sumKm");
const sumTimeEl = document.getElementById("sumTime");
const sumDaysEl = document.getElementById("sumDays");
const daysOutEl = document.getElementById("daysOut");
const mapSectionEl = document.getElementById("mapa");
const destinosSectionEl = document.getElementById("destinos");
const localDetailSectionEl = document.getElementById("localDetail");
const localDetailBodyEl = document.getElementById("localDetailBody");
const backToPlacesBtn = document.getElementById("backToPlaces");
const savedRoutesListEl = document.getElementById("savedRoutesList");
const savedRoutesEmptyEl = document.getElementById("savedRoutesEmpty");
const userCollabsListEl = document.getElementById("userCollabsList");
const userCollabsEmptyEl = document.getElementById("userCollabsEmpty");
const collabDetailSectionEl = document.getElementById("collab-detail");
const collabDetailBodyEl = document.getElementById("collabDetailBody");
const backToCollabsBtn = document.getElementById("backToCollabsBtn");
const addCommunityPointBtn = document.getElementById("addCommunityPointBtn");
const useGpsPointBtn = document.getElementById("useGpsPointBtn");
const mapGoCollabsBtn = document.getElementById("mapGoCollabsBtn");
const mapBackToCollabsBtn = document.getElementById("mapBackToCollabsBtn");
const communityStatusEl = document.getElementById("communityStatus");
const communityModalEl = document.getElementById("communityModal");
const communityFormEl = document.getElementById("communityForm");
const communityNameEl = document.getElementById("communityName");
const communityCategoryEl = document.getElementById("communityCategory");
const communityDescriptionEl = document.getElementById("communityDescription");
const communityLatEl = document.getElementById("communityLat");
const communityLonEl = document.getElementById("communityLon");
const communityPhotoEl = document.getElementById("communityPhoto");
const communityRemovePhotoEl = document.getElementById("communityRemovePhoto");
const communityCancelBtn = document.getElementById("communityCancelBtn");
const communitySaveBtn = document.getElementById("communitySaveBtn");

let selectedOrigin = null;
const selectedDestinations = [null, null, null, null, null];
let routeCoords = [];
let routeLayer = null;
let routeMarkers = [];
let poisLayer = null;
let dayStopsLayer = null;
let borderCrossingsLayer = null;
let dynamicRoutePois = [];
let selectedCats = new Set(["fuel_station", "hotel", "camping"]);
let maxPoiDistance = 999;
let currentPlanSnapshot = null;
let routesStorageKeyCache = null;
let communityLayer = null;
let communityPoints = [];
let showCommunityPoints = true;
let isAddingCommunityPoint = false;
let supabaseClient = null;
let editingCommunityId = null;
let editingCommunityPhotoUrl = null;
let communityDraftMarker = null;
let myCollaborationsCache = [];
let routeOpenContext = "planner";
let pendingOpenRouteContext = null;
let mapBackTargetHash = null;

const map = L.map("map").setView([-30, -58], 4);
const mapTiles = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri"
}).addTo(map);

const COMMUNITY_CATEGORY_LABELS = {
  camping: "Camping",
  hotel: "Hotel/Pousada",
  fuel_station: "Posto",
  viewpoint: "Mirante",
  alert: "Alerta",
  support: "Apoio"
};

const COMMUNITY_CATEGORY_COLORS = {
  camping: "#166534",
  hotel: "#7c3aed",
  fuel_station: "#1d4ed8",
  viewpoint: "#ea580c",
  alert: "#b42318",
  support: "#0f766e"
};

function initSupabaseClient() {
  const cfg = window.APP_AUTH_CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase?.createClient) return null;
  if (supabaseClient) return supabaseClient;
  supabaseClient = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  return supabaseClient;
}

async function getCurrentUserEmail() {
  try {
    if (window.AppAuth && typeof window.AppAuth.getSession === "function") {
      const session = await window.AppAuth.getSession();
      return (session?.user?.email || "usuario@sem-email").trim().toLowerCase();
    }
  } catch (_error) {}
  return "usuario@sem-email";
}

function revealMapSection() {
  if (!mapSectionEl) return;
  if (mapSectionEl.hidden) mapSectionEl.hidden = false;
  setTimeout(() => map.invalidateSize(), 120);
}

function syncMapViewport() {
  setTimeout(() => {
    map.invalidateSize();
    if (routeLayer) map.fitBounds(routeLayer.getBounds(), { padding: [24, 24] });
  }, 180);
}

function debounce(fn, ms) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function bindAccountMenu() {
  if (!accountMenuBtn || !accountMenuPanel) return;
  accountMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    accountMenuPanel.hidden = !accountMenuPanel.hidden;
  });
  document.addEventListener("click", (event) => {
    if (!accountMenuPanel.hidden && !event.target.closest(".account")) {
      accountMenuPanel.hidden = true;
    }
  });
  accountMenuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      exitRouteFocusMode();
      if (destinosSectionEl) destinosSectionEl.hidden = true;
      accountMenuPanel.hidden = true;
    });
  });
}

function bindMobileMenu() {
  if (!mobileMenuBtn || !mobileMenuPanel) return;
  mobileMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = mobileMenuPanel.hidden;
    mobileMenuPanel.hidden = !willOpen;
    mobileMenuBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });
  document.addEventListener("click", (event) => {
    if (!mobileMenuPanel.hidden && !event.target.closest("#mobileMenuPanel") && !event.target.closest("#mobileMenuBtn")) {
      mobileMenuPanel.hidden = true;
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
  });
  mobileMenuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuPanel.hidden = true;
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function setDestinationsVisibility(show) {
  if (!destinosSectionEl) return;
  destinosSectionEl.hidden = !show;
}

function setCollabDetailVisibility(show) {
  if (!collabDetailSectionEl) return;
  collabDetailSectionEl.hidden = !show;
}

function setSectionVisibility(sectionId) {
  const sections = {
    home: document.getElementById("home"),
    planner: document.getElementById("planner"),
    "my-routes": document.getElementById("my-routes"),
    "my-collabs": document.getElementById("my-collabs"),
    "collab-detail": document.getElementById("collab-detail"),
    mapa: document.getElementById("mapa"),
    destinos: document.getElementById("destinos")
  };

  Object.entries(sections).forEach(([key, element]) => {
    if (!element) return;
    element.hidden = key !== sectionId;
  });
  const homeIntroEl = document.getElementById("homeIntro");
  if (homeIntroEl) {
    homeIntroEl.hidden = sectionId !== "home";
  }

  const footerEl = document.querySelector(".footer");
  if (footerEl) footerEl.hidden = false;
}

function updateActiveNav(hash) {
  const normalized = hash || "#home";
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", href === normalized);
  });
  if (quickMapBtn) {
    quickMapBtn.classList.toggle("active", normalized === "#mapa");
  }
  if (accountMenuBtn) {
    const accountHashes = new Set(["#my-collabs"]);
    const accountActive = accountHashes.has(normalized) || normalized.startsWith("#collab/");
    accountMenuBtn.classList.toggle("active", accountActive);
  }
}

function renderCollabDetail(item) {
  if (!collabDetailBodyEl) return;
  if (!item) {
    collabDetailBodyEl.innerHTML = `<p class="tiny">Colaboração não encontrada.</p>`;
    return;
  }
  const createdAt = item.created_at ? new Date(item.created_at).toLocaleString("pt-BR") : "-";
  const category = COMMUNITY_CATEGORY_LABELS[item.category] || item.category || "Ponto";
  const photoHtml = item.photo_url ? `<img src="${item.photo_url}" alt="foto colaboração" class="collab-detail-photo">` : "";
  const mapsUrl = `https://www.google.com/maps?q=${item.lat},${item.lon}`;
  collabDetailBodyEl.innerHTML = `
    <article class="collab-detail-card">
      <div class="collab-detail-head">
        <div>
          <h3 class="collab-detail-title">${item.name || "Ponto colaborativo"}</h3>
          <div class="collab-detail-meta">${category} • ${Number(item.lat).toFixed(5)}, ${Number(item.lon).toFixed(5)}</div>
          <div class="collab-detail-meta">Criado em: ${createdAt}</div>
          <p class="collab-detail-meta" style="margin-top:8px">${item.description || "Sem descrição."}</p>
          <p class="collab-detail-meta"><a href="${mapsUrl}" target="_blank" rel="noreferrer">Abrir no Google Maps</a></p>
        </div>
        <div class="saved-route-actions" style="margin-top:0">
          <button type="button" data-action="detail-edit">Editar</button>
          <button type="button" data-action="detail-delete" class="danger" title="Excluir colaboração">&#128465;</button>
        </div>
      </div>
      ${photoHtml}
    </article>
  `;
  const editBtn = collabDetailBodyEl.querySelector("[data-action='detail-edit']");
  const delBtn = collabDetailBodyEl.querySelector("[data-action='detail-delete']");
  editBtn?.addEventListener("click", () => {
    openCommunityModal(Number(item.lat), Number(item.lon), item);
    setCommunityStatus("Edite os campos e salve as alterações.");
  });
  delBtn?.addEventListener("click", async () => {
    const confirmDelete = window.confirm("Deseja excluir esta colaboração?");
    if (!confirmDelete) return;
    await deleteMyCollaboration(item.id);
    window.location.hash = "#my-collabs";
  });
}

function openCollabDetailById(collabId) {
  const item = myCollaborationsCache.find((p) => p.id === collabId) || communityPoints.find((p) => p.id === collabId);
  renderCollabDetail(item || null);
  setCollabDetailVisibility(true);
  if (destinosSectionEl) destinosSectionEl.hidden = true;
}

function openCollaborativeMap(backTargetHash = null) {
  exitRouteFocusMode();
  revealMapSection();
  mapBackTargetHash = backTargetHash;
  if (mapBackToCollabsBtn) {
    mapBackToCollabsBtn.style.display = mapBackTargetHash ? "inline-flex" : "none";
  }
  handleSectionVisibilityByHash("#mapa");
  window.location.hash = "#mapa";
  setCommunityStatus("Use os botões para adicionar ponto colaborativo.");
  requestAnimationFrame(() => {
    map.invalidateSize();
    mapSectionEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function handleSectionVisibilityByHash(hash) {
  const normalized = hash || "#home";
  if (normalized.startsWith("#collab/")) {
    exitRouteFocusMode();
    const collabId = decodeURIComponent(normalized.replace("#collab/", "").trim());
    setSectionVisibility("collab-detail");
    openCollabDetailById(collabId);
    updateActiveNav("#my-collabs");
    return;
  }
  if (normalized === "#route") {
    setSectionVisibility("planner");
    setCollabDetailVisibility(false);
    revealMapSection();
    updateActiveNav(routeOpenContext === "saved" ? "#my-routes" : "#planner");
    if (currentPlanSnapshot) {
      enterRouteFocusMode();
      updateRouteFocusHeader(currentPlanSnapshot);
    }
    requestAnimationFrame(() => {
      map.invalidateSize();
      if (routeLayer) map.fitBounds(routeLayer.getBounds(), { padding: [24, 24] });
    });
    return;
  }

  const target = normalized.replace("#", "");
  const allowedTargets = new Set(["home", "planner", "my-routes", "my-collabs", "mapa", "destinos", "route"]);
  const sectionId = allowedTargets.has(target) ? target : "home";
  if (sectionId === "mapa") revealMapSection();
  if (sectionId === "planner" && normalized !== "#route") {
    clearPlannerData();
  } else {
    exitRouteFocusMode();
  }
  setSectionVisibility(sectionId);
  setCollabDetailVisibility(false);
  updateActiveNav(`#${sectionId}`);

  if (sectionId === "mapa") {
    requestAnimationFrame(() => {
      map.invalidateSize();
    });
  }
}

function enterRouteFocusMode() {
  document.body.classList.add("route-focus");
  setDestinationsVisibility(false);
  if (routeFocusBackBtn) routeFocusBackBtn.style.display = "inline-flex";
  const plannerSection = document.getElementById("planner");
  if (plannerSection) plannerSection.scrollIntoView({ behavior: "auto", block: "start" });
  requestAnimationFrame(() => {
    map.invalidateSize();
    if (routeLayer) map.fitBounds(routeLayer.getBounds(), { padding: [24, 24] });
  });
}

function exitRouteFocusMode() {
  document.body.classList.remove("route-focus");
  if (routeFocusBackBtn) routeFocusBackBtn.style.display = "";
  requestAnimationFrame(() => map.invalidateSize());
}

function clearRouteLayers() {
  routeCoords = [];
  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }
  routeMarkers.forEach((marker) => map.removeLayer(marker));
  routeMarkers = [];
  if (dayStopsLayer) {
    map.removeLayer(dayStopsLayer);
    dayStopsLayer = null;
  }
  if (borderCrossingsLayer) {
    map.removeLayer(borderCrossingsLayer);
    borderCrossingsLayer = null;
  }
  dynamicRoutePois = [];
  drawPoiMarkers();
}

function clearPlannerData() {
  selectedOrigin = null;
  selectedDestinations.fill(null);
  currentPlanSnapshot = null;
  pendingOpenRouteContext = null;
  routeOpenContext = "planner";
  clearRouteLayers();
  exitRouteFocusMode();
  updateRouteFocusHeader(null);

  originInput.value = "";
  dest1Input.value = "";
  dest2Input.value = "";
  dest3Input.value = "";
  dest4Input.value = "";
  dest5Input.value = "";
  daysInputEl.value = "";
  dayLimitModeEl.value = "hours";
  updateDayLimitUi();
  dayLimitValueEl.value = "";

  sumKmEl.textContent = "-";
  sumTimeEl.textContent = "-";
  sumDaysEl.textContent = "-";
  daysOutEl.innerHTML = "";
  warnEl.textContent = "";
  localStorage.removeItem("lastPlan");
  if (planActionsEl) planActionsEl.style.display = "none";
  if (mapSectionEl) mapSectionEl.hidden = true;
}

function updateRouteFocusHeader(route) {
  if (!routeFocusHeaderEl || !routeFocusTitleEl || !routeFocusMetaEl) return;
  if (!route) {
    routeFocusHeaderEl.style.display = "none";
    routeFocusTitleEl.textContent = "Rota da viagem";
    routeFocusMetaEl.textContent = "";
    return;
  }
  const destinationText = (route.destinations || []).join(" - ");
  const createdAtDate = new Date(route.createdAt || Date.now());
  const createdDate = createdAtDate.toLocaleDateString("pt-BR");
  const createdTime = createdAtDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  routeFocusTitleEl.textContent = `${route.origin || "-"} -> ${destinationText || "-"}`;
  routeFocusMetaEl.textContent = `${route.totalKm || 0} km - ${route.totalHours || 0} h - ${route.totalDays || 0} dias • criada em ${createdDate} às ${createdTime}`;
  routeFocusHeaderEl.style.display = "block";
}

async function shareRoute(route) {
  if (!route) {
    warnEl.textContent = "Gere ou abra uma rota antes de compartilhar.";
    return;
  }
  const shareText = `${route.name || "Rota"}\n${route.origin || "-"} -> ${(route.destinations || []).join(" - ") || "-"}\n${route.totalKm || 0} km • ${route.totalHours || 0} h • ${route.totalDays || 0} dias`;
  try {
    if (navigator.share) {
      await navigator.share({
        title: route.name || "Rota da viagem",
        text: shareText,
        url: window.location.href
      });
      return;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareText);
      warnEl.textContent = "Resumo da rota copiado para a área de transferência.";
      return;
    }
  } catch (_error) {}
  warnEl.textContent = "Não foi possível compartilhar agora.";
}

async function getRoutesStorageKey() {
  if (routesStorageKeyCache) return routesStorageKeyCache;
  let email = "guest";
  try {
    if (window.AppAuth && typeof window.AppAuth.getSession === "function") {
      const session = await window.AppAuth.getSession();
      const userEmail = session?.user?.email?.trim().toLowerCase();
      if (userEmail) email = userEmail;
    }
  } catch (_error) {}
  routesStorageKeyCache = `myRoutes:${email}`;
  return routesStorageKeyCache;
}

async function readSavedRoutes() {
  const key = await getRoutesStorageKey();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function writeSavedRoutes(routes) {
  const key = await getRoutesStorageKey();
  localStorage.setItem(key, JSON.stringify(routes));
}

function renderSavedRoutes(routes = []) {
  if (!savedRoutesListEl || !savedRoutesEmptyEl) return;
  if (!routes.length) {
    savedRoutesListEl.innerHTML = "";
    savedRoutesEmptyEl.hidden = false;
    return;
  }
  savedRoutesEmptyEl.hidden = true;
  savedRoutesListEl.innerHTML = routes
    .map((route) => {
      const createdAt = new Date(route.createdAt || Date.now()).toLocaleString("pt-BR");
      const destinationText = Array.isArray(route.destinations) && route.destinations.length ? route.destinations.join(" • ") : "-";
      return `<article class="saved-route-item" data-route-id="${route.id}">
        <h4 class="saved-route-title">${route.name || "Rota salva"}</h4>
        <div class="saved-route-meta">${route.origin || "-"} → ${destinationText}</div>
        <div class="saved-route-meta">${route.totalKm || 0} km • ${route.totalHours || 0} h • ${route.totalDays || 0} dias • salvo em ${createdAt}</div>
        <div class="saved-route-actions">
          <button type="button" data-action="open">Abrir</button>
          <button type="button" data-action="delete">Excluir</button>
        </div>
      </article>`;
    })
    .join("");
}

async function refreshSavedRoutes() {
  const routes = await readSavedRoutes();
  routes.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  renderSavedRoutesV2(routes);
}

function renderSavedRoutesV2(routes = []) {
  if (!savedRoutesListEl || !savedRoutesEmptyEl) return;
  if (!routes.length) {
    savedRoutesListEl.innerHTML = "";
    savedRoutesEmptyEl.hidden = false;
    return;
  }
  savedRoutesEmptyEl.hidden = true;
  savedRoutesListEl.innerHTML = routes
    .map((route) => {
      const createdAtDate = new Date(route.createdAt || Date.now());
      const createdDate = createdAtDate.toLocaleDateString("pt-BR");
      const createdTime = createdAtDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      const destinationText = Array.isArray(route.destinations) && route.destinations.length ? route.destinations.join(" - ") : "-";
      return `<article class="saved-route-item clickable" data-route-id="${route.id}">
        <h4 class="saved-route-title">${route.name || "Rota salva"}</h4>
        <div class="saved-route-meta">${route.origin || "-"} -> ${destinationText}</div>
        <div class="saved-route-meta">${route.totalKm || 0} km - ${route.totalHours || 0} h - ${route.totalDays || 0} dias</div>
        <div class="saved-route-meta">Criada em: ${createdDate} as ${createdTime}</div>
        <div class="saved-route-actions">
          <button type="button" data-action="open">Ver rota</button>
          <button type="button" data-action="pdf">PDF</button>
          <button type="button" data-action="delete" class="danger" title="Excluir rota">&#128465;</button>
        </div>
      </article>`;
    })
    .join("");
}

function buildRoutePdfHtml(route) {
  const createdAtDate = new Date(route.createdAt || Date.now());
  const createdDate = createdAtDate.toLocaleDateString("pt-BR");
  const createdTime = createdAtDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const daysRows = (route.days || [])
    .map((day) => `<tr><td>${day.day}</td><td>${day.from} -> ${day.to}</td><td>${day.km} km</td><td>${day.hours} h</td></tr>`)
    .join("");

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${route.name || "Rota"} - PDF</title><style>
    body{font-family:Arial,sans-serif;color:#1f2937;padding:26px}
    h1{margin:0 0 6px;font-size:24px}.muted{color:#4b5563;margin:0 0 14px}
    .meta{margin:8px 0 16px;padding:12px;border:1px solid #dbe3ec;border-radius:10px;background:#f8fafc}
    table{width:100%;border-collapse:collapse;margin-top:10px}
    th,td{border:1px solid #dbe3ec;padding:8px;font-size:13px;text-align:left}
    th{background:#eef3f8}
  </style></head><body>
    <h1>${route.name || "Rota da viagem"}</h1>
    <p class="muted">By Rafael Hanson</p>
    <div class="meta">
      <div><b>Origem:</b> ${route.origin || "-"}</div>
      <div><b>Destinos:</b> ${(route.destinations || []).join(" - ") || "-"}</div>
      <div><b>Resumo:</b> ${route.totalKm || 0} km - ${route.totalHours || 0} h - ${route.totalDays || 0} dias</div>
      <div><b>Criada em:</b> ${createdDate} as ${createdTime}</div>
    </div>
    <h2 style="font-size:18px;margin:14px 0 8px">Trechos por dia</h2>
    <table><thead><tr><th>Dia</th><th>Trecho</th><th>Distancia</th><th>Tempo</th></tr></thead><tbody>${daysRows}</tbody></table>
  </body></html>`;
}

function exportRouteToPdf(route) {
  if (!route) {
    warnEl.textContent = "Gere ou abra uma rota antes de exportar.";
    return;
  }
  const printWindow = window.open("", "_blank", "width=980,height=760");
  if (!printWindow) {
    warnEl.textContent = "Nao foi possivel abrir a janela de impressao. Verifique o bloqueador de pop-up.";
    return;
  }
  printWindow.document.open();
  printWindow.document.write(buildRoutePdfHtml(route));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 300);
}

function updateDayLimitUi() {
  if (!dayLimitModeEl || !dayLimitValueEl || !dayLimitLabelEl || !dayLimitHelpEl) return;
  const mode = dayLimitModeEl.value;
  if (mode === "hours") {
    dayLimitLabelEl.textContent = "Horas máximas por dia";
    dayLimitHelpEl.textContent = "Exemplo: 8 horas por dia.";
    dayLimitValueEl.placeholder = "Ex.: 8";
    dayLimitValueEl.min = "1";
    dayLimitValueEl.max = "16";
    dayLimitValueEl.step = "0.5";
  } else {
    dayLimitLabelEl.textContent = "Quilometragem máxima por dia";
    dayLimitHelpEl.textContent = "Exemplo: 650 km por dia.";
    dayLimitValueEl.placeholder = "Ex.: 650";
    dayLimitValueEl.min = "50";
    dayLimitValueEl.max = "1500";
    dayLimitValueEl.step = "50";
  }
}

async function searchCities(query) {
  const q = query.trim();
  if (q.length < 2) return [];
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&limit=7&addressdetails=1`;
  const response = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
  if (!response.ok) return [];
  const data = await response.json();
  return data;
}

function renderAutocomplete(listEl, items, onPick) {
  if (!items.length) {
    listEl.hidden = true;
    listEl.innerHTML = "";
    return;
  }
  listEl.innerHTML = items
    .map((item) => {
      const city = item.address?.city || item.address?.town || item.address?.municipality || item.display_name.split(",")[0];
      const country = item.address?.country || "";
      return `<div class="item" data-lat="${item.lat}" data-lon="${item.lon}" data-label="${city}"><span>${city}</span><small>${country}</small></div>`;
    })
    .join("");
  listEl.hidden = false;
  listEl.onclick = (event) => {
    const row = event.target.closest(".item");
    if (!row) return;
    const picked = {
      name: row.dataset.label,
      lat: Number(row.dataset.lat),
      lon: Number(row.dataset.lon)
    };
    onPick(picked);
    listEl.hidden = true;
  };
}

function bindAutocomplete(inputEl, listEl, assignFn) {
  const runSearch = debounce(async () => {
    const items = await searchCities(inputEl.value);
    renderAutocomplete(listEl, items, (picked) => {
      inputEl.value = picked.name;
      assignFn(picked);
    });
  }, 300);

  inputEl.addEventListener("input", () => {
    assignFn(null);
    runSearch();
  });
  inputEl.addEventListener("focus", () => runSearch());
  inputEl.addEventListener("blur", () => setTimeout(() => (listEl.hidden = true), 150));
}

bindAutocomplete(originInput, originList, (value) => (selectedOrigin = value));
[
  [dest1Input, dest1List, 0],
  [dest2Input, dest2List, 1],
  [dest3Input, dest3List, 2],
  [dest4Input, dest4List, 3],
  [dest5Input, dest5List, 4]
].forEach(([inputEl, listEl, idx]) => {
  bindAutocomplete(inputEl, listEl, (value) => (selectedDestinations[idx] = value));
});

if (dayLimitModeEl) {
  dayLimitModeEl.addEventListener("change", updateDayLimitUi);
  updateDayLimitUi();
}

function normalizeName(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function resolveAlias(inputValue) {
  const normalized = normalizeName(inputValue);
  const canonical = CITY_ALIASES[normalized];
  if (!canonical) return null;
  const found = CITY_REFERENCE.find((city) => city.name === canonical);
  return found ? { name: found.name, lat: found.lat, lon: found.lng } : null;
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i += 1) dp[i][0] = i;
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function fallbackByFuzzy(inputValue) {
  const needle = normalizeName(inputValue);
  if (!needle) return null;
  const alias = resolveAlias(inputValue);
  if (alias) return alias;
  let best = null;
  let bestScore = Number.POSITIVE_INFINITY;
  for (const city of CITY_REFERENCE) {
    const score = levenshtein(needle, normalizeName(city.name));
    if (score < bestScore) {
      bestScore = score;
      best = city;
    }
  }
  if (!best) return null;
  if (bestScore > Math.max(3, Math.floor(needle.length * 0.5))) return null;
  return { name: best.name, lat: best.lat, lon: best.lng };
}

async function geocodeIfNeeded(inputValue) {
  const query = inputValue.trim();
  if (!query) return null;
  try {
    const items = await searchCities(query);
    const preferred =
      items.find((item) =>
        ["city", "town", "municipality", "village", "administrative"].includes(item.type)
      ) || items[0];
    if (preferred) {
      return {
        name:
          preferred.address?.city ||
          preferred.address?.town ||
          preferred.address?.municipality ||
          preferred.address?.village ||
          preferred.display_name.split(",")[0],
        lat: Number(preferred.lat),
        lon: Number(preferred.lon)
      };
    }
  } catch (e) {
    // fallback below
  }
  return fallbackByFuzzy(query);
}

async function applySavedRoute(route) {
  if (!route || !route.origin) return;
  warnEl.textContent = "Carregando rota salva...";
  routeOpenContext = "saved";

  originInput.value = route.origin || "";
  const destinations = Array.isArray(route.destinations) ? route.destinations : [];
  const destinationInputs = [dest1Input, dest2Input, dest3Input, dest4Input, dest5Input];
  for (let i = 0; i < destinationInputs.length; i += 1) {
    const value = destinations[i] || "";
    destinationInputs[i].value = value;
    selectedDestinations[i] = null;
  }

  if (styleEl && route.style) styleEl.value = route.style;
  if (daysInputEl) daysInputEl.value = route.daysRequested || route.totalDays || "";
  if (dayLimitModeEl && route.dayLimitMode) dayLimitModeEl.value = route.dayLimitMode;
  updateDayLimitUi();
  if (dayLimitValueEl && route.dayLimitValue) dayLimitValueEl.value = route.dayLimitValue;

  if (applySavedSnapshotToUi(route)) {
    warnEl.textContent = "Rota carregada em Minhas rotas.";
    return;
  }

  selectedOrigin = route.origin ? await geocodeIfNeeded(route.origin) : null;
  for (let i = 0; i < destinationInputs.length; i += 1) {
    const value = destinationInputs[i].value.trim();
    selectedDestinations[i] = value ? await geocodeIfNeeded(value) : null;
  }

  pendingOpenRouteContext = "saved";
  await generatePlan();
  warnEl.textContent = "Rota carregada em Minhas rotas.";
}

function renderDaysHtml(days = [], style = "fast", limitMode = "km") {
  return days
    .map((day) => {
      const borderHtml = day.borderCrossing
        ? `<div class="tiny" style="margin-top:6px;color:#b42318;font-weight:700">Fronteira/aduana neste dia: ${day.borderText}</div>`
        : "";
      return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} → ${day.to}</b><div class="tiny">${day.km} km • ${day.hours} h</div><div class="tiny">${sleepByStyle(style, day.to)}</div><div class="tiny">Parada próxima da meta diária (${limitMode === "hours" ? "±45min" : "±50km"}).</div>${borderHtml}</article>`;
    })
    .join("");
}

function applySavedSnapshotToUi(route) {
  if (!Array.isArray(route.routeCoords) || route.routeCoords.length < 2) return false;
  if (!Array.isArray(route.days) || !route.days.length) return false;

  routeCoords = route.routeCoords;
  const firstCoord = routeCoords[0];
  const lastCoord = routeCoords[routeCoords.length - 1];
  const fallbackWaypoints = [
    { name: route.origin || "Origem", lat: firstCoord[0], lon: firstCoord[1] },
    { name: (route.destinations || [])[route.destinations.length - 1] || "Destino", lat: lastCoord[0], lon: lastCoord[1] }
  ];
  const waypoints = Array.isArray(route.waypoints) && route.waypoints.length ? route.waypoints : fallbackWaypoints;

  revealMapSection();
  drawRoute(waypoints);
  sumKmEl.textContent = `${Math.round(route.totalKm || 0)} km`;
  sumTimeEl.textContent = `${Number(route.totalHours || 0).toFixed(1)} h`;
  sumDaysEl.textContent = String(route.totalDays || route.days.length || 0);
  if (daysInputEl) daysInputEl.value = String(route.totalDays || route.days.length || "");
  daysOutEl.innerHTML = renderDaysHtml(route.days, route.style || styleEl?.value || "fast", route.dayLimitMode || dayLimitModeEl?.value || "km");

  const savedBoundaryPoints = Array.isArray(route.boundaryPoints) ? route.boundaryPoints : [];
  if (savedBoundaryPoints.length >= 2) drawDayStops(savedBoundaryPoints, route.days);

  dynamicRoutePois = Array.isArray(route.dynamicRoutePois) ? route.dynamicRoutePois : [];
  drawPoiMarkers();
  currentPlanSnapshot = route;
  updateRouteFocusHeader(currentPlanSnapshot);
  if (planActionsEl) planActionsEl.style.display = "flex";
  openRouteInFullView("saved");
  return true;
}

function renderDaysHtml(days = [], style = "fast", limitMode = "km") {
  return days
    .map((day) => {
      const borderHtml = day.borderCrossing
        ? `<div class="tiny" style="margin-top:6px;color:#b42318;font-weight:700">Fronteira/aduana neste dia: ${day.borderText}</div>`
        : "";
      return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} → ${day.to}</b><div class="tiny">${day.km} km • ${day.hours} h</div><div class="tiny">${sleepByStyle(style, day.to)}</div><div class="tiny">Parada próxima da meta diária (${limitMode === "hours" ? "±45min" : "±50km"}).</div>${borderHtml}</article>`;
    })
    .join("");
}

function openRouteInFullView(context = "planner") {
  routeOpenContext = context;
  setSectionVisibility("planner");
  revealMapSection();
  updateActiveNav(context === "saved" ? "#my-routes" : "#planner");
  enterRouteFocusMode();
  if (window.location.hash !== "#route") {
    window.location.hash = "#route";
  } else {
    handleSectionVisibilityByHash("#route");
  }
}

function haversineKm(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function buildCumulativeDistances(coords) {
  const cumulative = [0];
  for (let i = 1; i < coords.length; i += 1) {
    cumulative.push(cumulative[i - 1] + haversineKm(coords[i - 1], coords[i]));
  }
  return cumulative;
}

function buildCumulativeMetricFromSegments(values, factor = 1) {
  const cumulative = [0];
  for (let i = 0; i < values.length; i += 1) {
    cumulative.push(cumulative[i] + values[i] * factor);
  }
  return cumulative;
}

function pointInfoAtTarget(coords, cumulative, target) {
  if (target <= 0) return { index: 0, coord: coords[0] };
  for (let i = 1; i < cumulative.length; i += 1) {
    if (cumulative[i] >= target) {
      return { index: i, coord: coords[i] };
    }
  }
  const last = coords.length - 1;
  return { index: last, coord: coords[last] };
}

const reverseGeocodeCache = new Map();
async function reverseGeocodeMeta(lat, lon) {
  const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  if (reverseGeocodeCache.has(key)) return reverseGeocodeCache.get(key);
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const response = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
    if (!response.ok) throw new Error("reverse failed");
    const data = await response.json();
    const label =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      data.address?.county ||
      data.display_name?.split(",")?.[0] ||
      "Parada intermediária";
    const meta = {
      label,
      country: data.address?.country || "",
      countryCode: data.address?.country_code?.toUpperCase() || ""
    };
    reverseGeocodeCache.set(key, meta);
    return meta;
  } catch (error) {
    let min = Number.POSITIVE_INFINITY;
    let nearest = "Parada intermediária";
    for (const city of CITY_REFERENCE) {
      const d = haversineKm([lat, lon], [city.lat, city.lng]);
      if (d < min) {
        min = d;
        nearest = city.name;
      }
    }
    const fallback = { label: nearest, country: "", countryCode: "" };
    reverseGeocodeCache.set(key, fallback);
    return fallback;
  }
}

function sampleRoutePoints(coords, maxPoints = 22) {
  if (!coords.length) return [];
  const step = Math.max(1, Math.floor(coords.length / maxPoints));
  const sampled = [];
  for (let i = 0; i < coords.length; i += step) sampled.push(coords[i]);
  const last = coords[coords.length - 1];
  if (sampled[sampled.length - 1] !== last) sampled.push(last);
  return sampled;
}

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter"
];

async function runOverpassQuery(query) {
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const response = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`);
      if (!response.ok) continue;
      const data = await response.json();
      if (Array.isArray(data.elements)) return data.elements;
    } catch (error) {
      // try next endpoint
    }
  }
  return [];
}

function mapAmenityElement(el) {
  const tourism = el.tags?.tourism;
  const amenity = el.tags?.amenity;
  let category = null;
  if (amenity === "fuel") category = "fuel_station";
  if (tourism === "camp_site") category = "camping";
  if (tourism === "hotel" || tourism === "guest_house" || tourism === "motel") category = "hotel";
  if (!category) return null;
  const lat = el.lat ?? el.center?.lat;
  const lng = el.lon ?? el.center?.lon;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return {
    id: `dyn-${el.type}-${el.id}`,
    name: el.tags?.name || (category === "fuel_station" ? "Posto de combustivel" : category === "camping" ? "Camping" : "Hotel/Pousada"),
    city: el.tags?.["addr:city"] || "Ao longo da rota",
    country: "",
    category,
    lat,
    lng,
    distFromRoute: 0,
    description: category === "fuel_station" ? "Posto encontrado ao longo da rota." : "Opcao encontrada proxima da parada.",
    maps: `https://maps.google.com/?q=${lat},${lng}`,
    image: "",
    tags: ["carro"]
  };
}

async function fetchRouteAmenities(coords, stopCoords = []) {
  const points = sampleRoutePoints(coords, 24);
  if (!points.length) return [];

  const fuelClauses = points
    .map(([lat, lon]) => `nwr(around:8000,${lat},${lon})["amenity"="fuel"];`)
    .join("\n");

  const stayClauses = stopCoords
    .map(([lat, lon]) => `
      nwr(around:22000,${lat},${lon})["tourism"="camp_site"];
      nwr(around:22000,${lat},${lon})["tourism"="hotel"];
      nwr(around:22000,${lat},${lon})["tourism"="guest_house"];
      nwr(around:22000,${lat},${lon})["tourism"="motel"];
    `)
    .join("\n");

  const query = `[out:json][timeout:60];(${fuelClauses}\n${stayClauses});out center;`;
  let elements = await runOverpassQuery(query);
  if (!elements.length) {
    const fallbackFuel = points
      .map(([lat, lon]) => `nwr(around:12000,${lat},${lon})["amenity"="fuel"];`)
      .join("\n");
    const fallbackStay = stopCoords
      .map(([lat, lon]) => `
        nwr(around:32000,${lat},${lon})["tourism"="camp_site"];
        nwr(around:32000,${lat},${lon})["tourism"="hotel"];
        nwr(around:32000,${lat},${lon})["tourism"="guest_house"];
        nwr(around:32000,${lat},${lon})["tourism"="motel"];
      `)
      .join("\n");
    const fallbackQuery = `[out:json][timeout:70];(${fallbackFuel}\n${fallbackStay});out center;`;
    elements = await runOverpassQuery(fallbackQuery);
  }
  if (!elements.length) return [];

  const seen = new Set();
  const mapped = [];
  for (const el of elements) {
    const key = `${el.type}-${el.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const mappedEl = mapAmenityElement(el);
    if (mappedEl) mapped.push(mappedEl);
  }
  return mapped;
}

function sleepByStyle(style, cityLabel) {
  if (style === "camping") return `Parada recomendada: camping na região de ${cityLabel}.`;
  if (style === "hotel") return `Parada recomendada: hotel/pousada com estacionamento em ${cityLabel}.`;
  if (style === "panoramic") return `Parada recomendada: parada cênica em ${cityLabel}.`;
  return `Parada recomendada: parada funcional em ${cityLabel}.`;
}

function drawRoute(waypoints) {
  if (routeLayer) map.removeLayer(routeLayer);
  routeMarkers.forEach((marker) => map.removeLayer(marker));
  routeMarkers = [];
  routeLayer = L.polyline(routeCoords, { color: "#e86c39", weight: 4 }).addTo(map);
  waypoints.forEach((point, index) => {
    const label = index === 0 ? "Origem" : `Destino ${index}`;
    const marker = L.marker([point.lat, point.lon]).addTo(map).bindPopup(`${label}: ${point.name}`);
    routeMarkers.push(marker);
  });
  map.fitBounds(routeLayer.getBounds(), { padding: [24, 24] });
}

async function fetchDrivingRoute(from, to) {
  const routeServers = [
    "https://router.project-osrm.org",
    "https://routing.openstreetmap.de/routed-car"
  ];
  let lastError = null;
  for (const base of routeServers) {
    try {
      const osrmUrl = `${base}/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson&steps=true&annotations=distance,duration`;
      const response = await fetch(osrmUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data.routes?.length) throw new Error("Sem rota");
      return data.routes[0];
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Rota indisponível");
}

function drawDayStops(boundaryPoints, days) {
  if (dayStopsLayer) map.removeLayer(dayStopsLayer);
  if (borderCrossingsLayer) map.removeLayer(borderCrossingsLayer);
  dayStopsLayer = L.layerGroup();
  borderCrossingsLayer = L.layerGroup();

  for (let i = 1; i < boundaryPoints.length; i += 1) {
    const stop = boundaryPoints[i];
    const day = days[i - 1];
    const dayNumber = i;
    const icon = L.divIcon({
      className: "day-stop-icon",
      html: `<div style="width:28px;height:28px;border-radius:999px;background:#23433c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)">${dayNumber}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const marker = L.marker(stop.coord, { icon }).bindPopup(
      `<b>Dia ${dayNumber}</b><br>${day.from} → ${day.to}<br>${day.km} km • ${day.hours} h${day.borderCrossing ? `<br><span style="color:#b42318;font-weight:700">Fronteira/aduana neste trecho</span>` : ""}`
    );
    marker.addTo(dayStopsLayer);

    if (day.borderCrossing) {
      const borderIcon = L.divIcon({
        className: "border-stop-icon",
        html: `<div style="min-width:36px;height:24px;border-radius:999px;background:#b42318;color:#fff;display:flex;align-items:center;justify-content:center;font:700 11px/1 Inter;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.28);padding:0 8px">FR</div>`,
        iconSize: [36, 24],
        iconAnchor: [18, 12]
      });
      L.marker(stop.coord, { icon: borderIcon })
        .bindPopup(`<b>Fronteira/aduana</b><br>${day.borderText || "Mudança de país neste dia."}`)
        .addTo(borderCrossingsLayer);
    }
  }

  dayStopsLayer.addTo(map);
  borderCrossingsLayer.addTo(map);
}

function computePoiDistanceToRoute(poi) {
  if (!routeCoords.length) return Number.POSITIVE_INFINITY;
  let min = Number.POSITIVE_INFINITY;
  for (let i = 0; i < routeCoords.length; i += 12) {
    const d = haversineKm(routeCoords[i], [poi.lat, poi.lng]);
    if (d < min) min = d;
  }
  return min;
}

function drawPoiMarkers() {
  if (poisLayer) map.removeLayer(poisLayer);
  poisLayer = L.layerGroup();
  const allPois = [...dynamicRoutePois];
  const visible = allPois.filter((poi) => selectedCats.has(poi.category)).filter((poi) => computePoiDistanceToRoute(poi) <= maxPoiDistance);
  visible.forEach((poi) => {
    const categoryLabel = poi.category === "fuel_station" ? "Posto" : poi.category === "hotel" ? "Hotel" : "Camping";
    const color = poi.category === "fuel_station" ? "#1d4ed8" : poi.category === "hotel" ? "#7c3aed" : "#166534";
    const letter = poi.category === "fuel_station" ? "P" : poi.category === "hotel" ? "H" : "C";
    const icon = L.divIcon({
      className: "route-poi-icon",
      html: `<div style="width:26px;height:26px;border-radius:999px;background:${color};color:#fff;display:flex;align-items:center;justify-content:center;font:700 12px/1 Inter;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.28)">${letter}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    const marker = L.marker([poi.lat, poi.lng], { icon }).bindPopup(
      `<b>${poi.name}</b><br><small>${categoryLabel} • ${poi.city}</small><p>${poi.description}</p><a href="${poi.maps}" target="_blank" rel="noreferrer">Google Maps</a>`
    );
    marker.addTo(poisLayer);
  });
  poisLayer.addTo(map);
}

function drawCommunityPoints() {
  if (communityLayer) map.removeLayer(communityLayer);
  communityLayer = L.layerGroup();

  if (!showCommunityPoints) {
    return;
  }

  communityPoints.forEach((point) => {
    const color = COMMUNITY_CATEGORY_COLORS[point.category] || "#334155";
    const label = COMMUNITY_CATEGORY_LABELS[point.category] || "Ponto";
    const icon = L.divIcon({
      className: "community-point-icon",
      html: `<div style="width:28px;height:28px;border-radius:8px;background:${color};color:#fff;display:flex;align-items:center;justify-content:center;font:800 11px/1 Inter;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.26)">C</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const photoHtml = point.photo_url
      ? `<div style="margin:8px 0"><img src="${point.photo_url}" alt="foto do ponto" style="width:220px;max-width:100%;height:120px;object-fit:cover;border-radius:8px;border:1px solid #dce4ec"></div>`
      : "";
    const mapsUrl = `https://www.google.com/maps?q=${point.lat},${point.lon}`;

    L.marker([point.lat, point.lon], { icon })
      .bindPopup(
        `<b>${point.name}</b><br><small>${label} • ${point.user_email || "colaborador"}</small>${photoHtml}<p style="margin:6px 0 8px">${point.description || "Sem descrição."}</p><a href="${mapsUrl}" target="_blank" rel="noreferrer">Abrir no Google Maps</a>`
      )
      .addTo(communityLayer);
  });

  communityLayer.addTo(map);
}

function setCommunityStatus(text) {
  if (communityStatusEl) communityStatusEl.textContent = text;
}

function setDraftMarker(lat, lon) {
  if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return;
  const coords = [Number(lat), Number(lon)];
  if (!communityDraftMarker) {
    communityDraftMarker = L.marker(coords, { draggable: true }).addTo(map);
    communityDraftMarker.bindPopup("Ponto em edição");
    communityDraftMarker.on("dragend", () => {
      const p = communityDraftMarker.getLatLng();
      if (communityLatEl) communityLatEl.value = Number(p.lat).toFixed(6);
      if (communityLonEl) communityLonEl.value = Number(p.lng).toFixed(6);
    });
  } else {
    communityDraftMarker.setLatLng(coords);
  }
}

function clearDraftMarker() {
  if (!communityDraftMarker) return;
  map.removeLayer(communityDraftMarker);
  communityDraftMarker = null;
}

function openCommunityModal(lat, lon, item = null) {
  if (!communityModalEl) return;
  editingCommunityId = item?.id || null;
  editingCommunityPhotoUrl = item?.photo_url || null;

  if (communityFormEl) communityFormEl.reset();
  if (communityRemovePhotoEl) communityRemovePhotoEl.checked = false;

  if (item) {
    if (communityNameEl) communityNameEl.value = item.name || "";
    if (communityCategoryEl) communityCategoryEl.value = item.category || "camping";
    if (communityDescriptionEl) communityDescriptionEl.value = item.description || "";
  }

  if (typeof lat === "number" && typeof lon === "number") {
    communityLatEl.value = lat.toFixed(6);
    communityLonEl.value = lon.toFixed(6);
    setDraftMarker(lat, lon);
  }
  if (communitySaveBtn) communitySaveBtn.textContent = editingCommunityId ? "Salvar alterações" : "Salvar ponto";
  communityModalEl.hidden = false;
}

function closeCommunityModal() {
  if (!communityModalEl) return;
  communityModalEl.hidden = true;
  communityFormEl?.reset();
  editingCommunityId = null;
  editingCommunityPhotoUrl = null;
  clearDraftMarker();
  if (communitySaveBtn) communitySaveBtn.textContent = "Salvar ponto";
}

async function loadCommunityPoints() {
  const sb = initSupabaseClient();
  if (!sb) {
    setCommunityStatus("Supabase não configurado para pontos colaborativos.");
    return;
  }
  const { data, error } = await sb
    .from("community_points")
    .select("id,name,category,description,lat,lon,photo_url,user_email,created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    setCommunityStatus("Não foi possível carregar pontos colaborativos (verifique a tabela no Supabase).");
    return;
  }

  communityPoints = (data || []).filter((p) => Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lon)));
  drawCommunityPoints();
  setCommunityStatus(`Pontos colaborativos carregados: ${communityPoints.length}.`);
}

function renderMyCollaborations(items = []) {
  if (!userCollabsListEl || !userCollabsEmptyEl) return;
  if (!items.length) {
    userCollabsListEl.innerHTML = "";
    userCollabsEmptyEl.hidden = false;
    return;
  }
  userCollabsEmptyEl.hidden = true;
  userCollabsListEl.innerHTML = items
    .map((item) => {
      const createdAt = item.created_at ? new Date(item.created_at).toLocaleString("pt-BR") : "-";
      const category = COMMUNITY_CATEGORY_LABELS[item.category] || item.category || "Ponto";
      const photoTag = item.photo_url
        ? `<img src="${item.photo_url}" alt="foto colaboração" style="width:100%;max-width:220px;height:110px;object-fit:cover;border-radius:8px;border:1px solid #dce4ec;margin-top:8px">`
        : "";
      return `<article class="saved-route-item" data-collab-id="${item.id}">
        <h4 class="saved-route-title"><a class="collab-title-link" href="#collab/${item.id}">${item.name || "Ponto colaborativo"}</a></h4>
        <div class="saved-route-meta">${category} • ${Number(item.lat).toFixed(5)}, ${Number(item.lon).toFixed(5)}</div>
        <div class="saved-route-meta">${item.description || "Sem descrição."}</div>
        <div class="saved-route-meta">Criado em: ${createdAt}</div>
        ${photoTag}
        <div class="saved-route-actions">
          <button type="button" data-action="open-detail">Detalhes</button>
          <button type="button" data-action="open-map">Ver no mapa</button>
          <button type="button" data-action="edit-collab">Editar</button>
          <button type="button" data-action="delete-collab" class="danger" title="Excluir colaboração">&#128465;</button>
        </div>
      </article>`;
    })
    .join("");
}

async function refreshMyCollaborations() {
  const sb = initSupabaseClient();
  if (!sb) {
    renderMyCollaborations([]);
    return;
  }
  const email = await getCurrentUserEmail();
  const { data, error } = await sb
    .from("community_points")
    .select("id,name,category,description,lat,lon,photo_url,user_email,created_at")
    .eq("user_email", email)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    renderMyCollaborations([]);
    setCommunityStatus("Não foi possível carregar suas colaborações.");
    return;
  }
  myCollaborationsCache = data || [];
  renderMyCollaborations(myCollaborationsCache);
}

async function deleteMyCollaboration(collabId) {
  const sb = initSupabaseClient();
  if (!sb || !collabId) return;
  try {
    const email = await getCurrentUserEmail();
    const { error } = await sb.from("community_points").delete().eq("id", collabId).eq("user_email", email);
    if (error) throw error;
    await loadCommunityPoints();
    await refreshMyCollaborations();
    setCommunityStatus("Colaboração removida.");
  } catch (error) {
    console.error(error);
    setCommunityStatus("Não foi possível excluir. Verifique a policy de delete no Supabase.");
  }
}

async function uploadCommunityPhoto(file) {
  if (!file) return null;
  const sb = initSupabaseClient();
  if (!sb) return null;
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `community/${safeName}`;
  const { error } = await sb.storage.from("community-points").upload(path, file, {
    cacheControl: "3600",
    upsert: false
  });
  if (error) throw error;
  const { data } = sb.storage.from("community-points").getPublicUrl(path);
  return data?.publicUrl || null;
}

async function saveCommunityPoint(event) {
  event.preventDefault();
  const sb = initSupabaseClient();
  if (!sb) {
    setCommunityStatus("Supabase não configurado para salvar pontos.");
    return;
  }
  const lat = Number(communityLatEl?.value);
  const lon = Number(communityLonEl?.value);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    setCommunityStatus("Defina latitude e longitude válidas.");
    return;
  }
  if (!communityNameEl?.value.trim()) {
    setCommunityStatus("Informe o nome do ponto.");
    return;
  }

  try {
    const isEditing = Boolean(editingCommunityId);
    communitySaveBtn.disabled = true;
    communitySaveBtn.textContent = "Salvando...";
    const photoFile = communityPhotoEl?.files?.[0] || null;
    const userEmail = await getCurrentUserEmail();
    let photoUrl = editingCommunityPhotoUrl || null;
    if (photoFile) {
      photoUrl = await uploadCommunityPhoto(photoFile);
    } else if (communityRemovePhotoEl?.checked) {
      photoUrl = null;
    }

    const payload = {
      name: communityNameEl.value.trim(),
      category: communityCategoryEl.value,
      description: communityDescriptionEl.value.trim(),
      lat,
      lon,
      photo_url: photoUrl
    };

    let error = null;
    if (editingCommunityId) {
      const result = await sb
        .from("community_points")
        .update(payload)
        .eq("id", editingCommunityId)
        .eq("user_email", userEmail);
      error = result.error;
    } else {
      const result = await sb.from("community_points").insert({ ...payload, user_email: userEmail });
      error = result.error;
    }
    if (error) throw error;

    closeCommunityModal();
    await loadCommunityPoints();
    await refreshMyCollaborations();
    setCommunityStatus(isEditing ? "Colaboração atualizada com sucesso." : "Ponto colaborativo salvo com sucesso.");
  } catch (_error) {
    setCommunityStatus("Não foi possível salvar o ponto. Confira a tabela, RLS e bucket no Supabase.");
  } finally {
    communitySaveBtn.disabled = false;
    communitySaveBtn.textContent = "Salvar ponto";
  }
}

function setupCommunityUi() {
  initSupabaseClient();
  loadCommunityPoints();
  refreshMyCollaborations();

  addCommunityPointBtn?.addEventListener("click", () => {
    isAddingCommunityPoint = true;
    revealMapSection();
    const center = map.getCenter();
    openCommunityModal(Number(center.lat), Number(center.lng));
    setCommunityStatus("Formulário aberto. Ajuste a posição clicando no mapa ou arrastando o alfinete.");
  });

  useGpsPointBtn?.addEventListener("click", () => {
    if (!navigator.geolocation) {
      setCommunityStatus("Seu navegador não liberou GPS.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        map.setView([lat, lon], 12);
        openCommunityModal(lat, lon);
        setCommunityStatus("GPS obtido. Complete os dados e salve o ponto.");
      },
      () => setCommunityStatus("Não consegui ler seu GPS agora. Tente novamente ou clique no mapa."),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  });

  map.on("click", (event) => {
    const { lat, lng } = event.latlng;
    if (isAddingCommunityPoint || (communityModalEl && !communityModalEl.hidden)) {
      setDraftMarker(lat, lng);
      if (communityLatEl) communityLatEl.value = Number(lat).toFixed(6);
      if (communityLonEl) communityLonEl.value = Number(lng).toFixed(6);
      if (communityModalEl && communityModalEl.hidden) openCommunityModal(lat, lng);
      setCommunityStatus("Coordenada atualizada no formulário.");
      isAddingCommunityPoint = false;
    }
  });

  communityCancelBtn?.addEventListener("click", () => {
    closeCommunityModal();
    setCommunityStatus("Cadastro cancelado.");
  });

  communityModalEl?.addEventListener("click", (event) => {
    if (event.target === communityModalEl) closeCommunityModal();
  });

  communityFormEl?.addEventListener("submit", saveCommunityPoint);

  userCollabsListEl?.addEventListener("click", async (event) => {
    const container = event.target.closest("[data-collab-id]");
    if (!container) return;
    const collabId = container.dataset.collabId;
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    if (button.dataset.action === "open-map") {
      openCollaborativeMap("#my-collabs");
      const item = communityPoints.find((point) => point.id === collabId);
      if (item) {
        map.setView([Number(item.lat), Number(item.lon)], 11);
      }
      return;
    }

    if (button.dataset.action === "open-detail") {
      window.location.hash = `#collab/${collabId}`;
      return;
    }

    if (button.dataset.action === "edit-collab") {
      const item = communityPoints.find((point) => point.id === collabId);
      if (!item) {
        setCommunityStatus("Não encontrei a colaboração para editar.");
        return;
      }
      openCommunityModal(Number(item.lat), Number(item.lon), item);
      setCommunityStatus("Edite os campos e salve as alterações.");
      return;
    }

    if (button.dataset.action === "delete-collab") {
      const confirmDelete = window.confirm("Deseja excluir esta colaboração?");
      if (!confirmDelete) return;
      await deleteMyCollaboration(collabId);
    }
  });
}

async function generatePlan() {
  warnEl.textContent = "";
  if (planActionsEl) planActionsEl.style.display = "none";
  if (!selectedOrigin) selectedOrigin = await geocodeIfNeeded(originInput.value);

  const destinationInputs = [dest1Input, dest2Input, dest3Input, dest4Input, dest5Input];
  const destinations = [];
  for (let i = 0; i < destinationInputs.length; i += 1) {
    if (!selectedDestinations[i] && destinationInputs[i].value.trim()) {
      selectedDestinations[i] = await geocodeIfNeeded(destinationInputs[i].value);
    }
    if (selectedDestinations[i]) destinations.push(selectedDestinations[i]);
  }

  if (!selectedOrigin || !destinations.length) {
    warnEl.textContent = "Informe origem e pelo menos um destino válido para calcular a rota.";
    return;
  }

  try {
    const waypoints = [selectedOrigin, ...destinations];
    const finalDestination = waypoints[waypoints.length - 1];
    routeCoords = [];
    let fullDuration = 0;
    const segmentDistanceStepsKm = [];
    const segmentDurationStepsSec = [];

    for (let i = 0; i < waypoints.length - 1; i += 1) {
      const segment = await fetchDrivingRoute(waypoints[i], waypoints[i + 1]);
      const segmentCoords = segment.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      if (!routeCoords.length) routeCoords = segmentCoords;
      else routeCoords = [...routeCoords, ...segmentCoords.slice(1)];
      fullDuration += segment.duration;

      const annDistanceM = [];
      const annDurationS = [];
      (segment.legs || []).forEach((leg) => {
        if (leg.annotation?.distance?.length) annDistanceM.push(...leg.annotation.distance);
        if (leg.annotation?.duration?.length) annDurationS.push(...leg.annotation.duration);
      });

      if (annDistanceM.length === segmentCoords.length - 1 && annDurationS.length === segmentCoords.length - 1) {
        segmentDistanceStepsKm.push(...annDistanceM.map((meters) => meters / 1000));
        segmentDurationStepsSec.push(...annDurationS);
      } else {
        const fallbackDistances = [];
        for (let j = 1; j < segmentCoords.length; j += 1) {
          fallbackDistances.push(haversineKm(segmentCoords[j - 1], segmentCoords[j]));
        }
        const fallbackTotalKm = fallbackDistances.reduce((sum, value) => sum + value, 0) || 1;
        segmentDistanceStepsKm.push(...fallbackDistances);
        segmentDurationStepsSec.push(
          ...fallbackDistances.map((distKm) => (segment.duration * distKm) / fallbackTotalKm)
        );
      }
    }

    revealMapSection();
    drawRoute(waypoints);

    const cumulativeKm = segmentDistanceStepsKm.length
      ? buildCumulativeMetricFromSegments(segmentDistanceStepsKm)
      : buildCumulativeDistances(routeCoords);
    const cumulativeHours = segmentDurationStepsSec.length
      ? buildCumulativeMetricFromSegments(segmentDurationStepsSec, 1 / 3600)
      : cumulativeKm.map((km) => (fullDuration > 0 ? (km / cumulativeKm[cumulativeKm.length - 1]) * (fullDuration / 3600) : 0));

    const totalKm = cumulativeKm[cumulativeKm.length - 1] || 0;
    const totalHours = cumulativeHours[cumulativeHours.length - 1] || fullDuration / 3600;
    sumKmEl.textContent = `${Math.round(totalKm)} km`;
    sumTimeEl.textContent = `${totalHours.toFixed(1)} h`;

    const requestedDays = Number(daysInputEl?.value);
    const hasRequestedDays = Number.isFinite(requestedDays) && requestedDays > 0;
    const limitMode = dayLimitModeEl?.value === "hours" ? "hours" : "km";
    const requestedLimit = Number(dayLimitValueEl?.value);
    const hasRequestedLimit = Number.isFinite(requestedLimit) && requestedLimit > 0;

    let dayLimit = hasRequestedLimit ? requestedLimit : limitMode === "hours" ? 8 : 650;
    if (!hasRequestedLimit && hasRequestedDays) {
      dayLimit = limitMode === "hours" ? Math.max(1, totalHours / requestedDays) : Math.max(80, totalKm / requestedDays);
      if (dayLimitValueEl) dayLimitValueEl.value = limitMode === "hours" ? dayLimit.toFixed(1) : String(Math.round(dayLimit));
    }

    const activeCumulative = limitMode === "hours" ? cumulativeHours : cumulativeKm;
    const totalMetric = activeCumulative[activeCumulative.length - 1] || 0;
    const tolerance = limitMode === "hours" ? 0.75 : 50;
    const boundaries = [0];
    let target = dayLimit;
    while (target < totalMetric - tolerance && boundaries.length < 120) {
      boundaries.push(target);
      target += dayLimit;
    }
    boundaries.push(totalMetric);

    const boundaryPoints = boundaries.map((targetValue) => pointInfoAtTarget(routeCoords, activeCumulative, targetValue));
    const dayMetas = await Promise.all(
      boundaryPoints.map(async (point, index) => {
        const meta = await reverseGeocodeMeta(point.coord[0], point.coord[1]);
        if (index === 0) return { ...meta, label: selectedOrigin.name };
        if (index === boundaryPoints.length - 1) return { ...meta, label: finalDestination.name };
        return meta;
      })
    );

    const days = [];
    for (let i = 1; i < boundaries.length; i += 1) {
      const prevIdx = boundaryPoints[i - 1].index;
      const currIdx = boundaryPoints[i].index;
      const dist = (cumulativeKm[currIdx] || 0) - (cumulativeKm[prevIdx] || 0);
      const duration = (cumulativeHours[currIdx] || 0) - (cumulativeHours[prevIdx] || 0);
      const fromMeta = dayMetas[i - 1];
      const toMeta = dayMetas[i];
      const borderCrossing = Boolean(fromMeta?.countryCode && toMeta?.countryCode && fromMeta.countryCode !== toMeta.countryCode);
      days.push({
        day: i,
        from: fromMeta?.label || "Origem",
        to: toMeta?.label || "Parada",
        km: Math.round(dist),
        hours: duration.toFixed(1),
        borderCrossing,
        borderText: borderCrossing ? `Saída de ${fromMeta.country || fromMeta.countryCode} e entrada em ${toMeta.country || toMeta.countryCode}.` : ""
      });
    }

    sumDaysEl.textContent = String(days.length);
    if (daysInputEl && (!hasRequestedDays || Number(daysInputEl.value) !== days.length)) {
      daysInputEl.value = String(days.length);
    }
    daysOutEl.innerHTML = days
      .map(
        (day) => `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} → ${day.to}</b><div class="tiny">${day.km} km • ${day.hours} h</div><div class="tiny">${sleepByStyle(styleEl.value, day.to)}</div><div class="tiny">Parada próxima da meta diária (${limitMode === "hours" ? "±45min" : "±50km"}).</div></article>`
      )
      .join("");
    daysOutEl.innerHTML = days
      .map((day) => {
        const borderHtml = day.borderCrossing
          ? `<div class="tiny" style="margin-top:6px;color:#b42318;font-weight:700">Fronteira/aduana neste dia: ${day.borderText}</div>`
          : "";
        return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} → ${day.to}</b><div class="tiny">${day.km} km • ${day.hours} h</div><div class="tiny">${sleepByStyle(styleEl.value, day.to)}</div><div class="tiny">Parada próxima da meta diária (${limitMode === "hours" ? "±45min" : "±50km"}).</div>${borderHtml}</article>`;
      })
      .join("");

    daysOutEl.innerHTML = renderDaysHtml(days, styleEl.value, limitMode);
    currentPlanSnapshot = {
      id: String(Date.now()),
      createdAt: Date.now(),
      name: `${waypoints[0].name} → ${waypoints[waypoints.length - 1].name}`,
      origin: waypoints[0].name,
      destinations: waypoints.slice(1).map((point) => point.name),
      style: styleEl.value,
      dayLimitMode: limitMode,
      dayLimitValue: dayLimit,
      daysRequested: hasRequestedDays ? requestedDays : null,
      totalKm: Math.round(totalKm),
      totalHours: Number(totalHours.toFixed(1)),
      totalDays: days.length,
      days,
      waypoints: waypoints.map((point) => ({ name: point.name, lat: point.lat, lon: point.lon })),
      routeCoords,
      boundaryPoints,
      dynamicRoutePois: []
    };
    currentPlanSnapshot.name = `${currentPlanSnapshot.origin} → ${currentPlanSnapshot.destinations[currentPlanSnapshot.destinations.length - 1] || "-"}`;
    updateRouteFocusHeader(currentPlanSnapshot);
    localStorage.setItem("lastPlan", JSON.stringify(currentPlanSnapshot));
    drawDayStops(boundaryPoints, days);
    syncMapViewport();
    const stayStops = boundaryPoints.slice(1).map((point) => point.coord);
    dynamicRoutePois = [];
    fetchRouteAmenities(routeCoords, stayStops).then((pois) => { dynamicRoutePois = pois; if (currentPlanSnapshot) { currentPlanSnapshot.dynamicRoutePois = pois; localStorage.setItem("lastPlan", JSON.stringify(currentPlanSnapshot)); } drawPoiMarkers(); }).catch(() => {});
    drawPoiMarkers();
    if (planActionsEl) planActionsEl.style.display = "flex";
    openRouteInFullView(pendingOpenRouteContext || "planner");
    pendingOpenRouteContext = null;
    if (false && !dynamicRoutePois.length) {
      warnEl.textContent = "Rota gerada. Não encontrei postos/hotéis/campings próximos neste momento.";
    }
  } catch (error) {
    if (planActionsEl) planActionsEl.style.display = "none";
    exitRouteFocusMode();
    warnEl.textContent = "Não foi possível calcular a rota agora. Tente selecionar a cidade na sugestão ou tente novamente em alguns segundos.";
  }
}

genBtn.addEventListener("click", generatePlan);

async function saveCurrentRoute() {
  if (!currentPlanSnapshot) {
    warnEl.textContent = "Gere um roteiro antes de salvar.";
    return;
  }
  const suggestedName = currentPlanSnapshot.name || "Minha rota";
  const routeName = window.prompt("Nome para salvar esta rota:", suggestedName);
  if (routeName === null) return;

  const routes = await readSavedRoutes();
  const entry = {
    ...currentPlanSnapshot,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: routeName.trim() || suggestedName,
    createdAt: Date.now()
  };
  routes.unshift(entry);
  await writeSavedRoutes(routes.slice(0, 40));
  await refreshSavedRoutes();
  warnEl.textContent = "Rota salva em Minhas rotas.";
}

saveRouteBtn?.addEventListener("click", saveCurrentRoute);
routeSaveBtn?.addEventListener("click", saveCurrentRoute);
viewRouteBtn?.addEventListener("click", () => {
  if (!currentPlanSnapshot) {
    warnEl.textContent = "Gere uma rota antes de abrir a visualização.";
    return;
  }
  openRouteInFullView("planner");
});
clearPlannerBtn?.addEventListener("click", clearPlannerData);
printBtn?.addEventListener("click", () => exportRouteToPdf(currentPlanSnapshot));
routePdfBtn?.addEventListener("click", () => exportRouteToPdf(currentPlanSnapshot));

if (savedRoutesListEl) {
  savedRoutesListEl.addEventListener("click", async (event) => {
    const container = event.target.closest("[data-route-id]");
    if (!container) return;
    const routeId = container.dataset.routeId;
    const routes = await readSavedRoutes();
    const route = routes.find((item) => item.id === routeId);
    if (!route) return;
    const button = event.target.closest("button[data-action]");

    if (!button) {
      await applySavedRoute(route);
      return;
    }

    if (button.dataset.action === "open") {
      await applySavedRoute(route);
      return;
    }

    if (button.dataset.action === "pdf") {
      exportRouteToPdf(route);
      return;
    }

    if (button.dataset.action === "delete") {
      const filtered = routes.filter((item) => item.id !== routeId);
      await writeSavedRoutes(filtered);
      await refreshSavedRoutes();
      warnEl.textContent = "Rota removida de Minhas rotas.";
    }
  });
}

const CATEGORY_LABELS = {
  fuel_station: "Postos",
  hotel: "Hotéis",
  camping: "Campings"
};

const catBar = document.getElementById("catBar");
Object.entries(CATEGORY_LABELS).forEach(([key, label]) => {
  const button = document.createElement("button");
  button.className = "pill active";
  button.textContent = label;
  button.onclick = () => {
    if (selectedCats.has(key)) {
      selectedCats.delete(key);
      button.classList.remove("active");
    } else {
      selectedCats.add(key);
      button.classList.add("active");
    }
    drawPoiMarkers();
  };
  catBar.appendChild(button);
});

if (catBar) {
  const collabButton = document.createElement("button");
  collabButton.className = `pill ${showCommunityPoints ? "active" : ""}`;
  collabButton.textContent = "Colaborações";
  collabButton.onclick = () => {
    showCommunityPoints = !showCommunityPoints;
    collabButton.classList.toggle("active", showCommunityPoints);
    drawCommunityPoints();
  };
  catBar.appendChild(collabButton);
}

maxPoiDistance = 999;

const stageBtns = document.getElementById("stageBtns");
const stTitle = document.getElementById("stTitle");
const stSum = document.getElementById("stSum");
const stMeta = document.getElementById("stMeta");
const stMust = document.getElementById("stMust");
const stSleep = document.getElementById("stSleep");
const stTips = document.getElementById("stTips");
let activeStage = STAGES[0].id;

function renderStages() {
  if (!stageBtns || !stTitle || !stSum || !stMeta || !stMust || !stSleep || !stTips) return;
  stageBtns.innerHTML = STAGES.map((stage) => `<button class="stbtn ${stage.id === activeStage ? "active" : ""}" data-stage="${stage.id}">${stage.title}<br><small>${stage.km} km • ${stage.time}</small></button>`).join("");
  const stage = STAGES.find((item) => item.id === activeStage);
  stTitle.textContent = stage.title;
  stSum.textContent = stage.sum;
  stMeta.textContent = `${stage.km} km • ${stage.time}`;
  stMust.textContent = stage.must.join(" • ");
  stSleep.textContent = stage.sleep.join(" • ");
  stTips.textContent = stage.tips.join(" • ");
}
if (stageBtns) {
  stageBtns.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stage]");
    if (!button) return;
    activeStage = button.dataset.stage;
    renderStages();
  });
  renderStages();
}

const TOURISTIC_CATEGORIES = new Set(["city", "attraction", "national_park", "viewpoint"]);

const BOOK_MAIN_IDS = [
  "puerto-madryn",
  "ushuaia",
  "torres",
  "calafate",
  "chalten",
  "bariloche",
  "buenos-aires"
];

const PHOTO_OVERRIDES = {
  "puerto-madryn": "./puerto-madryn-cover.jpg",
  ushuaia: "./ushuaia-cover.jpg",
  torres: "./torres-cover.jpg",
  calafate:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Perito_Moreno_Glacier_(30600924084).jpg",
  chalten: "https://commons.wikimedia.org/wiki/Special:FilePath/Fitz_Roy_El_Chalten_sunrise-13.jpg",
  bariloche: "./bariloche-cover.jpg",
  "buenos-aires": "https://commons.wikimedia.org/wiki/Special:FilePath/Puerto_Madero,_Buenos_Aires_(40689219792)_(cropped).jpg"
};

const PHOTO_FALLBACKS = {
  "puerto-madryn": "https://commons.wikimedia.org/wiki/Special:FilePath/Puerto_Madryn_(29380505724).jpg",
  ushuaia: "https://commons.wikimedia.org/wiki/Special:FilePath/Ushuaia_aerial.jpg",
  torres: "https://commons.wikimedia.org/wiki/Special:FilePath/Torres_del_Paine_y_cuernos_del_Paine,_montaje.jpg",
  calafate:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Perito_Moreno_Glacier_(30600924084).jpg",
  chalten: "https://commons.wikimedia.org/wiki/Special:FilePath/Fitz_Roy_El_Chalten_sunrise-13.jpg",
  bariloche: "https://commons.wikimedia.org/wiki/Special:FilePath/San_Carlos_de_Bariloche_2009-11-27.jpg",
  "buenos-aires":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Puerto_Madero,_Buenos_Aires_(40689219792)_(cropped).jpg"
};

const DESCRIPTION_OVERRIDES = {
  "puerto-madryn": "Base para Península Valdés, vida selvagem e parada estratégica antes de seguir ao sul.",
  ushuaia: "Fim do mundo com atrações clássicas, trilhas, canal e ótima base para explorar a Terra do Fogo.",
  torres: "Parque incrível com paisagens únicas; fronteiras e clima exigem atenção extra no planejamento.",
  calafate: "Base do Perito Moreno, com mini trekking disputado e opções de passeio, hospedagem ou wild camping.",
  chalten: "Destino ideal para trekking e mirantes do Fitz Roy, com trilhas clássicas e perfil mais aventureiro.",
  bariloche: "Região de lagos e montanhas com roteiros cênicos, boa estrutura e muitas atividades ao ar livre.",
  "buenos-aires": "Grande etapa urbana da viagem, ótima para descanso, organização e experiências culturais."
};

const EBOOK_CHAPTERS = {
  "puerto-madryn": {
    chapter: "Capítulo Puerto Madryn",
    bestSeason: "Setembro a dezembro",
    highlights: ["Península Valdés", "avistagem de fauna marinha", "costeira patagônica"],
    logistics: ["Boa estrutura urbana para abastecimento", "base para passeios de dia inteiro", "ideal para pausa longa na rota"],
    tips: ["Reserve passeios de fauna com antecedência", "leve corta-vento para atividades costeiras", "prefira sair cedo para bate-voltas"]
  },
  ushuaia: {
    chapter: "Capítulo Ushuaia",
    bestSeason: "Novembro a março",
    highlights: ["Canal Beagle", "Parque Nacional Tierra del Fuego", "Fim do Mundo"],
    logistics: ["Cidade base com boa rede hoteleira", "ponto final clássico da ida", "ótima para revisão do carro"],
    tips: ["Verifique previsão de vento e frio", "reserve navegação no Beagle", "deixe dias extras para clima variável"]
  },
  torres: {
    chapter: "Capítulo Torres del Paine",
    bestSeason: "Outubro a abril",
    highlights: ["Mirantes das torres", "lagos e trilhas cênicas", "paisagem ícone da Patagônia chilena"],
    logistics: ["Base comum em Puerto Natales", "controle de documentos de fronteira", "parque com infraestrutura organizada"],
    tips: ["Compre ingressos oficiais antecipadamente", "leve roupa por camadas", "evite dirigir longos trechos noturnos na região"]
  },
  calafate: {
    chapter: "Capítulo El Calafate",
    bestSeason: "Outubro a março",
    highlights: ["Glaciar Perito Moreno", "Lago Argentino", "passeios de glaciar"],
    logistics: ["Hub de hospedagem e serviços", "base logística para glaciares", "boa oferta de mercados e combustível"],
    tips: ["Compre ingresso do parque antecipado", "considere passeio de barco no glaciar", "planeje pelo menos 2 noites"]
  },
  chalten: {
    chapter: "Capítulo El Chaltén",
    bestSeason: "Novembro a março",
    highlights: ["Fitz Roy", "trilhas e mirantes", "vibe de vila de montanha"],
    logistics: ["Base principal para trekking", "acesso por estrada cênica", "estrutura menor que Calafate"],
    tips: ["Saia cedo para trilhas longas", "acompanhe vento e chuva", "leve água e alimentação para os percursos"]
  },
  bariloche: {
    chapter: "Capítulo Bariloche",
    bestSeason: "Ano todo (neve no inverno, lagos no verão)",
    highlights: ["Circuito Chico", "Cerro Catedral", "lagos andinos"],
    logistics: ["Cidade com excelente estrutura", "boa etapa de descanso", "ponto forte para atividades ao ar livre"],
    tips: ["Distribua passeios por zonas", "evite horários de pico nas saídas", "reserve com antecedência em alta temporada"]
  },
  "buenos-aires": {
    chapter: "Capítulo Buenos Aires",
    bestSeason: "Março a maio e setembro a novembro",
    highlights: ["cultura e gastronomia", "bairros clássicos", "etapa urbana da viagem"],
    logistics: ["Entrada e saída estratégica no roteiro", "ampla oferta de serviços", "bom ponto para reorganizar a jornada"],
    tips: ["Planeje estacionamento com antecedência", "considere hospedagem com garagem", "aproveite para manutenção leve e compras"]
  }
};

POIS.forEach((poi) => {
  if (PHOTO_OVERRIDES[poi.id]) poi.image = PHOTO_OVERRIDES[poi.id];
  if (DESCRIPTION_OVERRIDES[poi.id]) poi.description = DESCRIPTION_OVERRIDES[poi.id];
});

const placesForGrid = BOOK_MAIN_IDS
  .map((id) => POIS.find((poi) => poi.id === id))
  .filter(Boolean)
  .filter((poi) => TOURISTIC_CATEGORIES.has(poi.category));

function renderPlacesGrid() {
  const placesGridEl = document.getElementById("placesGrid");
  if (!placesGridEl) return;
  placesGridEl.innerHTML = placesForGrid
    .map(
      (poi) =>
        `<article class="place">
          <img src="${poi.image}" alt="${poi.name}" loading="lazy" referrerpolicy="no-referrer" data-fallback="${PHOTO_FALLBACKS[poi.id] || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"}" onerror="if(this.dataset.failed){this.onerror=null;return;} this.dataset.failed='1'; this.src=this.dataset.fallback;">
          <div class="c">
            <div class="tiny">${poi.category}</div>
            <h4>${poi.name}</h4>
            <p class="tiny">${poi.description}</p>
            <p class="tiny">${poi.city} • <a href="${poi.maps}" target="_blank" rel="noreferrer">Google Maps</a></p>
            <div class="place-actions">
              <a class="link-btn" href="./local.html?place=${poi.id}">Abrir página</a>
            </div>
          </div>
        </article>`
    )
    .join("");
}

function renderLocalDetail(placeId) {
  const poi = placesForGrid.find((item) => item.id === placeId);
  const chapter = EBOOK_CHAPTERS[placeId];
  if (!poi || !chapter || !localDetailBodyEl || !localDetailSectionEl) return;

  localDetailBodyEl.innerHTML = `
    <article class="local-detail">
      <header class="local-hero" style="background:linear-gradient(120deg,#102723cc,#10272355),url('${poi.image}') center/cover">
        <div class="local-hero-content">
          <span class="badge">capítulo do e-book</span>
          <h2>${poi.name}</h2>
          <p>${chapter.chapter}</p>
          <div class="local-meta">
            <span class="local-chip">${poi.city}</span>
            <span class="local-chip">${poi.country}</span>
            <span class="local-chip">${poi.category}</span>
          </div>
        </div>
      </header>

      <div class="local-grid">
        <section class="local-block" style="grid-column:1 / -1">
          <p class="tiny"><a href="${poi.maps}" target="_blank" rel="noreferrer">Abrir localização no Google Maps</a></p>
        </section>
      </div>
    </article>
  `;

  if (destinosSectionEl) destinosSectionEl.hidden = true;
  localDetailSectionEl.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeLocalDetail() {
  if (localDetailSectionEl) localDetailSectionEl.hidden = true;
  if (destinosSectionEl) destinosSectionEl.hidden = false;
}

function openLocalFromHash() {
  const hash = window.location.hash || "";
  if (!hash.startsWith("#local/")) {
    closeLocalDetail();
    return;
  }
  const placeId = decodeURIComponent(hash.replace("#local/", "").trim());
  renderLocalDetail(placeId);
}

renderPlacesGrid();

const topicsGridEl = document.getElementById("topicsGrid");
if (topicsGridEl) {
  topicsGridEl.innerHTML = TOPICS.map(
    (topic) => `<article class="card"><h3 style="margin:0 0 6px;font-family:'Playfair Display',serif">${topic[0]}</h3><ul class="tiny" style="padding-left:18px">${topic[1].map((item) => `<li>${item}</li>`).join("")}</ul></article>`
  ).join("");
}

routeFocusBackBtn?.addEventListener("click", () => {
  if (window.location.hash === "#route") {
    window.history.back();
    return;
  }
  exitRouteFocusMode();
  const plannerSection = document.getElementById("planner");
  if (plannerSection) plannerSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
routeShareBtn?.addEventListener("click", () => shareRoute(currentPlanSnapshot));

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href") || "";
    if (href !== "#mapa") exitRouteFocusMode();
    handleSectionVisibilityByHash(href);
  });
});

backToCollabsBtn?.addEventListener("click", () => {
  window.location.hash = "#my-collabs";
});

window.addEventListener("hashchange", () => {
  if (mobileMenuPanel && mobileMenuBtn) {
    mobileMenuPanel.hidden = true;
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
  handleSectionVisibilityByHash(window.location.hash || "#home");
});

bindAccountMenu();
quickMapBtn?.addEventListener("click", openCollaborativeMap);
mapGoCollabsBtn?.addEventListener("click", () => {
  window.location.hash = "#my-collabs";
});
mapBackToCollabsBtn?.addEventListener("click", () => {
  const target = mapBackTargetHash || "#my-collabs";
  mapBackTargetHash = null;
  if (mapBackToCollabsBtn) mapBackToCollabsBtn.style.display = "none";
  window.location.hash = target;
});
bindMobileMenu();
updateRouteFocusHeader(null);
handleSectionVisibilityByHash(window.location.hash || "#home");
refreshSavedRoutes();
drawPoiMarkers();
setupCommunityUi();

function renderDaysHtml(days = [], style = "fast", limitMode = "km") {
  return days
    .map((day) => {
      const borderHtml = day.borderCrossing
        ? `<div class="tiny" style="margin-top:6px;color:#b42318;font-weight:700">Fronteira/aduana neste dia: ${day.borderText}</div>`
        : "";
      return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} → ${day.to}</b><div class="tiny">${day.km} km • ${day.hours} h</div><div class="tiny">${sleepByStyle(style, day.to)}</div><div class="tiny">Parada próxima da meta diária (${limitMode === "hours" ? "±45min" : "±50km"}).</div>${borderHtml}</article>`;
    })
    .join("");
}
