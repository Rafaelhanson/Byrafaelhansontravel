function repairMojibake(value) {
  if (typeof value !== "string" || !/[ÃÂâ€]/.test(value)) return value;

  try {
    const bytes = Uint8Array.from(Array.from(value).map((char) => char.charCodeAt(0) & 255));
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (_error) {
    return value
      .replace(/â†’/g, "→")
      .replace(/â†”/g, "↔")
      .replace(/â€¢/g, "•")
      .replace(/â€“|â€”/g, "-")
      .replace(/â€¦/g, "...")
      .replace(/â€œ|â€�|â€|â€/g, "\"")
      .replace(/â€˜|â€™/g, "'")
      .replace(/Ã‡/g, "Ç")
      .replace(/Ã§/g, "ç")
      .replace(/Ã£/g, "ã")
      .replace(/Ãµ/g, "õ")
      .replace(/Ã¡/g, "á")
      .replace(/Ã /g, "à")
      .replace(/Ã¢/g, "â")
      .replace(/Ã©/g, "é")
      .replace(/Ãª/g, "ê")
      .replace(/Ã­/g, "í")
      .replace(/Ã³/g, "ó")
      .replace(/Ã´/g, "ô")
      .replace(/Ãº/g, "ú")
      .replace(/Ã¼/g, "ü")
      .replace(/Ã�/g, "Í")
      .replace(/Ã“/g, "Ó")
      .replace(/Ã‰/g, "É")
      .replace(/Â±/g, "±")
      .replace(/Âº/g, "º")
      .replace(/Âª/g, "ª")
      .replace(/Â /g, " ");
  }
}

function repairVisibleText(root = document.body) {
  if (!root) return;

  const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);

  textNodes.forEach((node) => {
    const repaired = repairMojibake(node.nodeValue);
    if (node.nodeValue !== repaired) node.nodeValue = repaired;
  });

  root.querySelectorAll?.("*").forEach((element) => {
    ["title", "placeholder", "aria-label"].forEach((attr) => {
      const current = element.getAttribute(attr);
      if (!current) return;
      const repaired = repairMojibake(current);
      if (current !== repaired) element.setAttribute(attr, repaired);
    });
  });
}

function normalizeUiText(value) {
  if (value === null || value === undefined) return "";
  return repairMojibake(String(value))
    .replace(/â†’/g, "→")
    .replace(/â†-/g, "→")
    .replace(/â†/g, "→")
    .replace(/â€¢/g, "•")
    .replace(/Ã\s*s/g, "às")
    .replace(/\s*->\s*/g, " → ")
    .replace(/\s+/g, " ")
    .trim();
}

function promptNormalized(message, defaultValue = "") {
  return window.prompt(normalizeUiText(message), normalizeUiText(defaultValue));
}

function confirmNormalized(message) {
  return window.confirm(normalizeUiText(message));
}

function startTextRepairObserver() {
  if (!document.body || window.__textRepairObserverStarted) return;
  window.__textRepairObserverStarted = true;
  repairVisibleText(document.body);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData" && mutation.target?.parentNode) {
        repairVisibleText(mutation.target.parentNode);
        return;
      }

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
          repairVisibleText(node.parentNode);
          return;
        }
        if (node.nodeType === Node.ELEMENT_NODE) repairVisibleText(node);
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
const POIS = [
  { id: "puerto-madryn", name: "Puerto Madryn", city: "Puerto Madryn", country: "Argentina", category: "city", lat: -42.7692, lng: -65.0385, distFromRoute: 12, description: "Base para natureza e fauna marinha na PatagÃ´nia atlÃ¢ntica.", maps: "https://maps.google.com/?q=Puerto+Madryn", image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60d?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "buenos-aires", name: "Buenos Aires", city: "Buenos Aires", country: "Argentina", category: "city", lat: -34.6037, lng: -58.3816, distFromRoute: 0, description: "Capital argentina com cultura, gastronomia e Ã³tima estrutura.", maps: "https://maps.google.com/?q=Buenos+Aires", image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "ushuaia", name: "Ushuaia", city: "Ushuaia", country: "Argentina", category: "city", lat: -54.8019, lng: -68.303, distFromRoute: 0, description: "Cidade mais austral da jornada.", maps: "https://maps.google.com/?q=Ushuaia", image: "https://images.unsplash.com/photo-1612298484490-72f0605e9055?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "torres", name: "Parque Nacional Torres del Paine", city: "Puerto Natales", country: "Chile", category: "national_park", lat: -50.9423, lng: -73.4068, distFromRoute: 20, description: "Parque nacional icÃ´nico com lagos e torres de granito.", maps: "https://maps.google.com/?q=Torres+del+Paine", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "calafate", name: "El Calafate", city: "El Calafate", country: "Argentina", category: "city", lat: -50.3379, lng: -72.2648, distFromRoute: 0, description: "Base principal para visitar glaciares.", maps: "https://maps.google.com/?q=El+Calafate", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "perito-moreno", name: "Glaciar Perito Moreno", city: "El Calafate", country: "Argentina", category: "attraction", lat: -50.4966, lng: -73.1371, distFromRoute: 45, description: "Um dos glaciares mais impressionantes do planeta.", maps: "https://maps.google.com/?q=Glaciar+Perito+Moreno", image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "chalten", name: "El ChaltÃ©n", city: "El ChaltÃ©n", country: "Argentina", category: "city", lat: -49.3315, lng: -72.8863, distFromRoute: 0, description: "Capital do trekking na PatagÃ´nia argentina.", maps: "https://maps.google.com/?q=El+Chalten", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "fitz-roy", name: "Fitz Roy", city: "El ChaltÃ©n", country: "Argentina", category: "viewpoint", lat: -49.2713, lng: -73.0434, distFromRoute: 12, description: "Montanha sÃ­mbolo da regiÃ£o com visual Ã©pico.", maps: "https://maps.google.com/?q=Fitz+Roy", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "bariloche", name: "Bariloche", city: "Bariloche", country: "Argentina", category: "city", lat: -41.1335, lng: -71.3103, distFromRoute: 0, description: "Cidade alpina com montanhas, lagos e esportes.", maps: "https://maps.google.com/?q=Bariloche", image: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico"] },
  { id: "cerro-catedral", name: "Cerro Catedral", city: "Bariloche", country: "Argentina", category: "attraction", lat: -41.1715, lng: -71.4393, distFromRoute: 9, description: "Centro de esqui e trekking clÃ¡ssico de Bariloche.", maps: "https://maps.google.com/?q=Cerro+Catedral+Bariloche", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "circuito-chico", name: "Circuito Chico", city: "Bariloche", country: "Argentina", category: "viewpoint", lat: -41.0898, lng: -71.5319, distFromRoute: 6, description: "Roteiro panorÃ¢mico com mirantes e lagos.", maps: "https://maps.google.com/?q=Circuito+Chico+Bariloche", image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico", "gratuito"] },
  { id: "nahuel-huapi", name: "Lago Nahuel Huapi", city: "Bariloche", country: "Argentina", category: "viewpoint", lat: -41.0956, lng: -71.423, distFromRoute: 4, description: "Lago icÃ´nico da regiÃ£o dos lagos andinos.", maps: "https://maps.google.com/?q=Lago+Nahuel+Huapi", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico", "gratuito"] },
  { id: "cerro-otto", name: "Cerro Otto", city: "Bariloche", country: "Argentina", category: "attraction", lat: -41.127, lng: -71.3711, distFromRoute: 5, description: "Mirante com telefÃ©rico e visual da cidade.", maps: "https://maps.google.com/?q=Cerro+Otto+Bariloche", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "piedras-blancas", name: "Piedras Blancas", city: "Bariloche", country: "Argentina", category: "attraction", lat: -41.133, lng: -71.3309, distFromRoute: 6, description: "Complexo recreativo de neve e aventura.", maps: "https://maps.google.com/?q=Piedras+Blancas+Bariloche", image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "isla-victoria", name: "Isla Victoria e Bosque de Arrayanes", city: "Bariloche", country: "Argentina", category: "attraction", lat: -40.7872, lng: -71.6467, distFromRoute: 18, description: "Passeio nÃ¡utico clÃ¡ssico com bosque Ãºnico.", maps: "https://maps.google.com/?q=Isla+Victoria+Bosque+de+Arrayanes", image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "cerro-tronador", name: "Cerro Tronador", city: "Bariloche", country: "Argentina", category: "viewpoint", lat: -41.1633, lng: -71.8857, distFromRoute: 42, description: "Montanha e glaciar impressionantes no parque.", maps: "https://maps.google.com/?q=Cerro+Tronador", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80", tags: ["turistico"] },
  { id: "ruta-7-lagos", name: "Ruta de los 7 Lagos", city: "NeuquÃ©n", country: "Argentina", category: "viewpoint", lat: -40.7627, lng: -71.6463, distFromRoute: 14, description: "Rota cÃªnica imperdÃ­vel entre lagos andinos.", maps: "https://maps.google.com/?q=Ruta+de+los+7+Lagos", image: "https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "turistico", "gratuito"] },
  { id: "valle", name: "Valle Encantado", city: "NeuquÃ©n", country: "Argentina", category: "attraction", lat: -40.8235, lng: -69.8352, distFromRoute: 9, description: "Parada cÃªnica com formaÃ§Ãµes rochosas.", maps: "https://maps.google.com/?q=Valle+Encantado+Neuquen", image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80", tags: ["carro", "gratuito", "turistico"] }
];

const STAGES = [
  { id: "s1", title: "Etapa 1: Brasil atÃ© Ushuaia", sum: "LogÃ­stica e fronteiras.", km: 4300, time: "6-9 dias", must: ["Canal Beagle", "Tierra del Fuego"], sleep: ["RÃ­o Gallegos", "RÃ­o Grande", "Ushuaia"], tips: ["AbasteÃ§a acima de meio tanque"] },
  { id: "s2", title: "Etapa 2: Ushuaia atÃ© Torres del Paine", sum: "Trecho com vento e fronteira.", km: 820, time: "2-3 dias", must: ["Miradores"], sleep: ["RÃ­o Gallegos", "Puerto Natales"], tips: ["Checar horÃ¡rios de fronteira"] },
  { id: "s3", title: "Etapa 3: Torres del Paine atÃ© El ChaltÃ©n / El Calafate", sum: "Parques e glaciares.", km: 620, time: "3-4 dias", must: ["Perito Moreno", "Fitz Roy"], sleep: ["El Calafate", "El ChaltÃ©n"], tips: ["Reserve ingressos"] },
  { id: "s4", title: "Etapa 4: El ChaltÃ©n atÃ© Bariloche", sum: "Subida cÃªnica.", km: 1450, time: "3-5 dias", must: ["Valle Encantado"], sleep: ["NeuquÃ©n", "Bariloche"], tips: ["Planeje alimentaÃ§Ã£o de estrada"] },
  { id: "s5", title: "Etapa 5: Bariloche atÃ© Buenos Aires", sum: "Natureza para cidade.", km: 1600, time: "3-4 dias", must: ["Laguna de GÃ³mez"], sleep: ["JunÃ­n", "Buenos Aires"], tips: ["RevisÃ£o leve do carro"] },
  { id: "s6", title: "Etapa 6: Buenos Aires atÃ© Brasil", sum: "Retorno organizado.", km: 1250, time: "2-3 dias", must: ["LihuÃ© Calel"], sleep: ["Paso de los Libres"], tips: ["Planeje cÃ¢mbio final"] }
];

const TOPICS = [
  ["Documentos", ["RG/passaporte", "CNH e documento do veÃ­culo", "Carta Verde", "SOAPEX para Chile"]],
  ["Fronteiras", ["Uruguaiana â†” Paso de los Libres", "Valide horÃ¡rios oficiais"]],
  ["CombustÃ­vel", ["Trechos longos sem posto", "Regra: tanque acima de meio"]],
  ["Dinheiro/Internet", ["CartÃ£o + espÃ©cie", "Mapas offline", "Chip internacional"]],
  ["Melhor Ã©poca", ["Novembro-marÃ§o", "Outubro/abril tambÃ©m sÃ£o Ã³timos"]],
  ["Links Ãºteis", ["Receita Federal", "Parques nacionais ARG/CHI", "Google Maps"]]
];

const CITY_REFERENCE = [
  ["SÃ£o Paulo", -23.5505, -46.6333], ["Rio de Janeiro", -22.9068, -43.1729], ["Curitiba", -25.4284, -49.2733], ["Porto Alegre", -30.0346, -51.2177],
  ["FlorianÃ³polis", -27.5949, -48.5482], ["BrasÃ­lia", -15.7939, -47.8828], ["Belo Horizonte", -19.9167, -43.9345], ["Salvador", -12.9777, -38.5016],
  ["Erechim", -27.6344, -52.2739], ["ChapecÃ³", -27.1004, -52.6152], ["Passo Fundo", -28.2628, -52.4069], ["Santa Maria", -29.6842, -53.8069],
  ["Uruguaiana", -29.7618, -57.0858], ["Pelotas", -31.7654, -52.3376], ["Caxias do Sul", -29.1634, -51.1797],
  ["Buenos Aires", -34.6037, -58.3816], ["RosÃ¡rio", -32.9442, -60.6505], ["CÃ³rdoba", -31.4201, -64.1888], ["Mendoza", -32.8895, -68.8458],
  ["NeuquÃ©n", -38.9516, -68.0591], ["Bariloche", -41.1335, -71.3103], ["El Calafate", -50.3379, -72.2648], ["El ChaltÃ©n", -49.3315, -72.8863],
  ["Ushuaia", -54.8019, -68.303], ["Punta Arenas", -53.1638, -70.9171], ["Puerto Natales", -51.7308, -72.506], ["Montevideo", -34.9011, -56.1645]
].map(([name, lat, lng]) => ({ name, lat, lng }));

const COUNTRY_NAMES = {
  BR: "Brasil",
  AR: "Argentina",
  CL: "Chile",
  UY: "Uruguai",
  PY: "Paraguai",
  BO: "BolÃ­via",
  PE: "Peru"
};

const CITY_COUNTRY_BY_NAME = {
  "SÃ£o Paulo": "BR",
  "Rio de Janeiro": "BR",
  Curitiba: "BR",
  "Porto Alegre": "BR",
  "FlorianÃ³polis": "BR",
  "BrasÃ­lia": "BR",
  "Belo Horizonte": "BR",
  Salvador: "BR",
  Erechim: "BR",
  "ChapecÃ³": "BR",
  "Passo Fundo": "BR",
  "Santa Maria": "BR",
  Uruguaiana: "BR",
  Pelotas: "BR",
  "Caxias do Sul": "BR",
  "Buenos Aires": "AR",
  "RosÃ¡rio": "AR",
  "CÃ³rdoba": "AR",
  Mendoza: "AR",
  "NeuquÃ©n": "AR",
  Bariloche: "AR",
  "El Calafate": "AR",
  "El ChaltÃ©n": "AR",
  Ushuaia: "AR",
  "Punta Arenas": "CL",
  "Puerto Natales": "CL",
  Montevideo: "UY"
};

const EXTRA_CITY_REFERENCE = [
  ["Mercedes", -29.1840, -58.0795],
  ["Curuzu Cuatia", -29.7918, -58.0580],
  ["Goya", -29.1449, -59.2645],
  ["Monte Caseros", -30.2596, -57.6381],
  ["Corrientes", -27.4692, -58.8306],
  ["Resistencia", -27.4514, -58.9867],
  ["Chajari", -30.7505, -57.9797],
  ["Federal", -30.9546, -58.7833],
  ["Villaguay", -31.8653, -59.0269],
  ["Parana", -31.7413, -60.5115],
  ["Victoria", -32.6184, -60.1548],
  ["Colon", -32.2237, -58.1434],
  ["Ceibas", -33.4979, -58.7683],
  ["Zarate", -34.0950, -59.0248],
  ["Campana", -34.1639, -58.9592],
  ["San Antonio de Areco", -34.2491, -59.4714],
  ["San Andres de Giles", -34.4470, -59.4445],
  ["Lujan", -34.5703, -59.1050],
  ["General Rodriguez", -34.6081, -58.9525],
  ["Mercedes", -34.6515, -59.4307],
  ["Gowland", -34.6529, -59.3619],
  ["Olivera", -34.6265, -59.2522],
  ["Jose Manuel Garcia", -34.7135, -59.4854],
  ["Cuartel V", -34.6243, -58.8356],
  ["Canuelas", -35.0518, -58.7606],
  ["Lobos", -35.1855, -59.0946],
  ["Suipacha", -34.7700, -59.6896],
  ["Chivilcoy", -34.8957, -60.0167],
  ["Nueve de Julio", -35.4444, -60.8831],
  ["Trenque Lauquen", -35.9701, -62.7346],
  ["Pehuajo", -35.8108, -61.8968],
  ["Carhue", -37.1779, -62.7590],
  ["General Acha", -37.3767, -64.6043],
  ["Puelches", -38.1446, -65.9148],
  ["Catriel", -37.8791, -67.7956],
  ["Choele Choel", -39.2896, -65.6604],
  ["Rio Colorado", -38.9931, -64.0951],
  ["Sierra Grande", -41.6072, -65.3558],
  ["Puerto Madryn", -42.7692, -65.0385],
  ["Dolavon", -43.3072, -65.7067],
  ["Las Plumas", -43.7202, -67.2849],
  ["Los Altares", -43.8584, -68.4432],
  ["Paso de Indios", -43.8624, -69.0452],
  ["Tecka", -43.4924, -70.8110],
  ["Gobernador Costa", -44.0493, -70.5970],
  ["Sarmiento", -45.5882, -69.0690],
  ["Rada Tilly", -45.9248, -67.5543],
  ["Pico Truncado", -46.7947, -67.9574],
  ["Las Heras", -46.5414, -68.9356],
  ["Perito Moreno", -46.5899, -70.9297],
  ["Bajo Caracoles", -47.4427, -70.9293],
  ["Gobernador Gregores", -48.7504, -70.2474],
  ["Tres Lagos", -49.5994, -71.4454],
  ["Esperanza", -51.0264, -70.7568],
  ["El Turbio", -51.5357, -72.3362],
  ["Rio Turbio", -51.5331, -72.3360],
  ["28 de Noviembre", -51.5835, -72.2137],
  ["Tolhuin", -54.5107, -67.1955],
  ["Rio Grande", -53.7861, -67.7010],
  ["Rio Gallegos", -51.6230, -69.2168],
  ["Comodoro Rivadavia", -45.8641, -67.4966],
  ["Caleta Olivia", -46.4393, -67.5286],
  ["Puerto San Julian", -49.3068, -67.7290],
  ["Trelew", -43.2489, -65.3051],
  ["Rawson", -43.3002, -65.1023],
  ["Bahia Blanca", -38.7196, -62.2724],
  ["Viedma", -40.8083, -63.0000],
  ["San Antonio Oeste", -40.7319, -64.9470],
  ["General Roca", -39.0334, -67.5830],
  ["Cipolletti", -38.9339, -67.9903],
  ["Santa Rosa", -36.6200, -64.2900],
  ["Azul", -36.7760, -59.8585],
  ["Mar del Plata", -38.0055, -57.5426],
  ["La Plata", -34.9205, -57.9536],
  ["Junin", -34.5889, -60.9496],
  ["Pergamino", -33.8892, -60.5736],
  ["Venado Tuerto", -33.7456, -61.9688],
  ["Concordia", -31.3929, -58.0174],
  ["Gualeguaychu", -33.0106, -58.5172],
  ["Paso de los Libres", -29.7125, -57.0864],
  ["Santo Tome", -28.5494, -56.0378],
  ["Itaqui", -29.1250, -56.5531],
  ["Sao Borja", -28.6587, -56.0044],
  ["Vacaria", -28.5078, -50.9426],
  ["Lages", -27.8156, -50.3259],
  ["Joinville", -26.3044, -48.8487],
  ["Sao Jose dos Pinhais", -25.5317, -49.2036],
  ["Campinas", -22.9056, -47.0608],
  ["Sao Jose do Rio Preto", -20.8113, -49.3758],
  ["San Sebastian", -53.3295, -68.4283],
  ["Cerro Sombrero", -52.7776, -69.2588],
  ["Punta Delgada", -52.4871, -69.4740],
  ["Villa Tehuelches", -52.3188, -71.5102],
  ["Puerto Sara", -52.9920, -71.0230],
  ["Puerto Natales", -51.7308, -72.5060],
  ["Cerro Castillo", -51.2572, -72.3524],
  ["Villa Cerro Castillo", -46.1207, -72.1501],
  ["El Bolson", -41.9605, -71.5333],
  ["Esquel", -42.9115, -71.3195],
  ["Leleque", -42.4072, -71.1814],
  ["Villa La Angostura", -40.7622, -71.6463],
  ["Piedra del Aguila", -40.0484, -70.0745],
  ["Zapala", -38.8992, -70.0544],
  ["Porvenir", -53.3000, -70.3667],
  ["Primera Angostura", -52.4848, -69.4327]
].map(([name, lat, lng]) => ({ name, lat, lng }));

CITY_REFERENCE.push(...EXTRA_CITY_REFERENCE);

Object.assign(CITY_COUNTRY_BY_NAME, {
  "Rio Grande": "AR",
  "Rio Gallegos": "AR",
  "Comodoro Rivadavia": "AR",
  "Caleta Olivia": "AR",
  "Puerto San Julian": "AR",
  Trelew: "AR",
  Rawson: "AR",
  "Bahia Blanca": "AR",
  Viedma: "AR",
  "San Antonio Oeste": "AR",
  "General Roca": "AR",
  Cipolletti: "AR",
  "Santa Rosa": "AR",
  Azul: "AR",
  "Mar del Plata": "AR",
  "La Plata": "AR",
  Junin: "AR",
  Pergamino: "AR",
  "Venado Tuerto": "AR",
  Concordia: "AR",
  Gualeguaychu: "AR",
  "Paso de los Libres": "AR",
  "Santo Tome": "AR",
  Itaqui: "BR",
  "Sao Borja": "BR",
  Vacaria: "BR",
  Lages: "BR",
  Joinville: "BR",
  "Sao Jose dos Pinhais": "BR",
  Campinas: "BR",
  "Sao Jose do Rio Preto": "BR",
  Mercedes: "AR",
  "Curuzu Cuatia": "AR",
  Goya: "AR",
  "Monte Caseros": "AR",
  Corrientes: "AR",
  Resistencia: "AR",
  Chajari: "AR",
  Federal: "AR",
  Villaguay: "AR",
  Parana: "AR",
  Victoria: "AR",
  Colon: "AR",
  Ceibas: "AR",
  Zarate: "AR",
  Campana: "AR",
  "San Antonio de Areco": "AR",
  "San Andres de Giles": "AR",
  Lujan: "AR",
  "General Rodriguez": "AR",
  Gowland: "AR",
  Olivera: "AR",
  "Jose Manuel Garcia": "AR",
  "Cuartel V": "AR",
  Canuelas: "AR",
  Lobos: "AR",
  Suipacha: "AR",
  Chivilcoy: "AR",
  "Nueve de Julio": "AR",
  "Trenque Lauquen": "AR",
  Pehuajo: "AR",
  Carhue: "AR",
  "General Acha": "AR",
  Puelches: "AR",
  Catriel: "AR",
  "Choele Choel": "AR",
  "Rio Colorado": "AR",
  "Sierra Grande": "AR",
  "Puerto Madryn": "AR",
  Dolavon: "AR",
  "Las Plumas": "AR",
  "Los Altares": "AR",
  "Paso de Indios": "AR",
  Tecka: "AR",
  "Gobernador Costa": "AR",
  Sarmiento: "AR",
  "Rada Tilly": "AR",
  "Pico Truncado": "AR",
  "Las Heras": "AR",
  "Perito Moreno": "AR",
  "Bajo Caracoles": "AR",
  "Gobernador Gregores": "AR",
  "Tres Lagos": "AR",
  Esperanza: "AR",
  "El Turbio": "AR",
  "Rio Turbio": "AR",
  "28 de Noviembre": "AR",
  Tolhuin: "AR",
  "San Sebastian": "AR",
  "Cerro Sombrero": "CL",
  "Punta Delgada": "CL",
  "Villa Tehuelches": "CL",
  "Puerto Sara": "CL",
  "Puerto Natales": "CL",
  "Cerro Castillo": "CL",
  "Villa Cerro Castillo": "CL",
  "El Bolson": "AR",
  Esquel: "AR",
  Leleque: "AR",
  "Villa La Angostura": "AR",
  "Piedra del Aguila": "AR",
  Zapala: "AR",
  Porvenir: "CL",
  "Primera Angostura": "CL"
});

const KNOWN_BORDER_CROSSINGS = [
  { name: "Uruguaiana / Paso de los Libres", lat: -29.7603, lon: -57.0862, from: "BR", to: "AR" },
  { name: "SÃ£o Borja / Santo TomÃ©", lat: -28.6582, lon: -56.0046, from: "BR", to: "AR" },
  { name: "Foz do IguaÃ§u / Puerto IguazÃº", lat: -25.5975, lon: -54.5763, from: "BR", to: "AR" },
  { name: "Paso San SebastiÃ¡n", lat: -53.3382, lon: -68.4031, from: "AR", to: "CL" },
  { name: "Monte Aymond / IntegraciÃ³n Austral", lat: -52.022, lon: -69.5825, from: "AR", to: "CL" },
  { name: "Dorotea / Puerto Natales", lat: -51.5721, lon: -72.2533, from: "AR", to: "CL" },
  { name: "Cardenal SamorÃ©", lat: -40.7178, lon: -71.7338, from: "AR", to: "CL" },
  { name: "Pino Hachado", lat: -38.6584, lon: -70.9573, from: "AR", to: "CL" },
  { name: "Los Libertadores", lat: -32.8449, lon: -70.1028, from: "AR", to: "CL" }
];

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
const campingSearchCityEl = document.getElementById("campingSearchCity");
const campingSearchRadiusEl = document.getElementById("campingSearchRadius");
const campingSearchModeEls = document.querySelectorAll("input[name='campingSearchMode']");
const campingCityPanelEl = document.getElementById("campingCityPanel");
const campingSearchBtn = document.getElementById("campingSearchBtn");
const campingGpsBtn = document.getElementById("campingGpsBtn");
const campingSearchStatusEl = document.getElementById("campingSearchStatus");
const campingSearchResultsEl = document.getElementById("campingSearchResults");
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
const confirmCommunityPointBtn = document.getElementById("confirmCommunityPointBtn");
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
const communityUseCenterBtn = document.getElementById("communityUseCenterBtn");
const communitySaveBtn = document.getElementById("communitySaveBtn");
const tripFormEl = document.getElementById("tripForm");
const tripNameEl = document.getElementById("tripName");
const tripStartDateEl = document.getElementById("tripStartDate");
const tripDurationEl = document.getElementById("tripDuration");
const tripDescriptionEl = document.getElementById("tripDescription");
const expenseFormEl = document.getElementById("expenseForm");
const expenseEntryPanelEl = document.getElementById("expenseEntryPanel");
const expenseActiveTripNameEl = document.getElementById("expenseActiveTripName");
const expenseNoTripHintEl = document.getElementById("expenseNoTripHint");
const expenseCategoryEl = document.getElementById("expenseCategory");
const expensePaymentEl = document.getElementById("expensePayment");
const expenseAmountEl = document.getElementById("expenseAmount");
const expenseCurrencyEl = document.getElementById("expenseCurrency");
const expenseRateEl = document.getElementById("expenseRate");
const expenseDateEl = document.getElementById("expenseDate");
const expenseDescriptionEl = document.getElementById("expenseDescription");
const expenseSelectedTripTitleEl = document.getElementById("expenseSelectedTripTitle");
const expenseTotalBrlEl = document.getElementById("expenseTotalBrl");
const expensePieEl = document.getElementById("expensePie");
const expenseLegendEl = document.getElementById("expenseLegend");
const tripsListEl = document.getElementById("tripsList");
const tripsEmptyEl = document.getElementById("tripsEmpty");
const expensesListEl = document.getElementById("expensesList");
const expensesEmptyEl = document.getElementById("expensesEmpty");
const clearExpenseSelectionBtn = document.getElementById("clearExpenseSelectionBtn");
const expenseTripTitleEl = document.getElementById("expenseTripTitle");
const expenseTripMetaEl = document.getElementById("expenseTripMeta");
const expenseTripBackBtn = document.getElementById("expenseTripBackBtn");

let selectedOrigin = null;
const selectedDestinations = [null, null, null, null, null];
let routeCoords = [];
let routeLayer = null;
let routeMarkers = [];
let cityAnchorsLayer = null;
let poisLayer = null;
let dayStopsLayer = null;
let borderCrossingsLayer = null;
let dynamicRoutePois = [];
let selectedCats = new Set(["fuel_station", "hotel", "camping"]);
let maxPoiDistance = 999;
let currentPlanSnapshot = null;
let routesStorageKeyCache = null;
let expensesStorageKeyCache = null;
let routesStorageKeyCacheEmail = null;
let expensesStorageKeyCacheEmail = null;
let travelExpenseTrips = [];
let selectedExpenseTripId = null;
let currentUserCache = null;
let cloudDataCache = null;
let cloudDataLoadedForUser = null;
let lastCloudSyncError = "";
const volatileStorageFallback = new Map();
let communityLayer = null;
let communityPoints = [];
let showCommunityPoints = true;
let isAddingCommunityPoint = false;
let pendingCommunityCoords = null;
let supabaseClient = null;
let editingCommunityId = null;
let editingCommunityPhotoUrl = null;
let communityDraftMarker = null;
let syncDraftWithMapCenter = false;
let myCollaborationsCache = [];
let routeOpenContext = "planner";
let pendingOpenRouteContext = null;
let mapBackTargetHash = null;

const ROUTE_CITY_MARKER_NAMES = new Set([
  "Erechim", "Passo Fundo", "Santa Maria", "Uruguaiana", "Paso de los Libres", "Itaqui", "Sao Borja",
  "Mercedes", "Curuzu Cuatia", "Goya", "Monte Caseros", "Chajari", "Federal", "Villaguay", "Parana",
  "Victoria", "Colon", "Concordia", "Gualeguaychu", "Ceibas", "Zarate", "Campana", "Lujan",
  "Buenos Aires", "Bahia Blanca", "Viedma", "San Antonio Oeste", "Sierra Grande", "Puerto Madryn",
  "Trelew", "Rawson", "Dolavon", "Las Plumas", "Los Altares", "Paso de Indios", "Tecka",
  "Gobernador Costa", "Comodoro Rivadavia", "Rada Tilly", "Caleta Olivia", "Puerto San Julian",
  "Rio Gallegos", "Rio Grande", "Tolhuin", "Ushuaia", "San Sebastian", "Cerro Sombrero",
  "Punta Delgada", "Puerto Natales", "Cerro Castillo", "El Calafate", "El Chalten", "Tres Lagos",
  "Gobernador Gregores", "Bajo Caracoles", "Perito Moreno", "Sarmiento", "Esquel", "El Bolson",
  "Bariloche", "Villa La Angostura", "Piedra del Aguila", "Zapala", "Neuquen", "General Roca",
  "Cipolletti", "Santa Rosa", "General Acha"
].map(normalizeName));

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

const EXPENSE_CATEGORY_LABELS = {
  fuel: "CombustÃ­vel",
  food: "AlimentaÃ§Ã£o",
  lodging: "Hospedagem",
  tickets: "Passeios/ingressos",
  maintenance: "ManutenÃ§Ã£o",
  extras: "Gastos extras"
};

const EXPENSE_CATEGORY_COLORS = {
  fuel: "#f97316",
  food: "#86d1a5",
  lodging: "#38bdf8",
  tickets: "#facc15",
  maintenance: "#fb7185",
  extras: "#c084fc"
};

const EXPENSE_PAYMENT_LABELS = {
  credit: "CartÃ£o de crÃ©dito",
  debit: "CartÃ£o de dÃ©bito",
  cash: "Dinheiro",
  pix: "Pix/transferÃªncia"
};

const CURRENCY_DEFAULT_RATES = {
  BRL: 1,
  ARS: 0.006,
  CLP: 0.006,
  USD: 5.2,
  UYU: 0.13
};

function initSupabaseClient() {
  const cfg = window.APP_AUTH_CONFIG || {};
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase?.createClient) return null;
  if (supabaseClient) return supabaseClient;
  supabaseClient = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  return supabaseClient;
}

function safeSetStorage(key, value) {
  const text = String(value);
  try {
    localStorage.setItem(key, text);
    return "local";
  } catch (_error) {}
  try {
    sessionStorage.setItem(key, text);
    return "session";
  } catch (_error) {}
  volatileStorageFallback.set(key, text);
  return "memory";
}

function safeGetStorage(key) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch (_error) {}
  try {
    const value = sessionStorage.getItem(key);
    if (value !== null) return value;
  } catch (_error) {}
  return volatileStorageFallback.has(key) ? volatileStorageFallback.get(key) : null;
}

function safeRemoveStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (_error) {}
  try {
    sessionStorage.removeItem(key);
  } catch (_error) {}
  volatileStorageFallback.delete(key);
}

async function getSupabaseSession() {
  const sb = initSupabaseClient();
  if (!sb || !sb.auth || typeof sb.auth.getSession !== "function") return null;
  try {
    const { data } = await sb.auth.getSession();
    return data?.session || null;
  } catch (_error) {
    return null;
  }
}

async function getCurrentSessionUser() {
  if (currentUserCache) return currentUserCache;
  try {
    if (window.AppAuth && typeof window.AppAuth.getSession === "function") {
      const session = await window.AppAuth.getSession();
      const user = session?.user || null;
      currentUserCache = user;
      return user;
    }
  } catch (_error) {}
  const sbSession = await getSupabaseSession();
  if (sbSession?.user) {
    currentUserCache = sbSession.user;
    return sbSession.user;
  }
  return null;
}

async function getCurrentUserEmail() {
  const cachedUser = await getCurrentSessionUser();
  if (cachedUser?.email) return cachedUser.email.trim().toLowerCase();
  const sbSession = await getSupabaseSession();
  if (sbSession?.user?.email) return sbSession.user.email.trim().toLowerCase();
  return "usuario@sem-email";
}

async function getCurrentUserId() {
  const cachedUser = await getCurrentSessionUser();
  if (cachedUser?.id) return cachedUser.id;
  const sbSession = await getSupabaseSession();
  if (sbSession?.user?.id) return sbSession.user.id;
  return null;
}

function getPendingSyncStorageKey(email = "guest") {
  return `pendingCloudSync:${String(email || "guest").trim().toLowerCase()}`;
}

async function queuePendingCloudField(field, value) {
  const email = await getCurrentUserEmail();
  const key = getPendingSyncStorageKey(email);
  let payload = {};
  try {
    payload = JSON.parse(safeGetStorage(key) || "{}") || {};
  } catch (_error) {
    payload = {};
  }
  payload[field] = normalizeArrayData(value);
  payload.updatedAt = new Date().toISOString();
  safeSetStorage(key, JSON.stringify(payload));
}

async function flushPendingCloudSync() {
  const email = await getCurrentUserEmail();
  const key = getPendingSyncStorageKey(email);
  let payload = {};
  try {
    payload = JSON.parse(safeGetStorage(key) || "{}") || {};
  } catch (_error) {
    payload = {};
  }

  const fields = ["routes", "trips"].filter((field) => Array.isArray(payload[field]));
  if (!fields.length) return true;

  for (const field of fields) {
    const ok = await writeCloudUserDataField(field, payload[field]);
    if (!ok) return false;
  }

  safeRemoveStorage(key);
  return true;
}

function getUserDataTableName() {
  const cfg = window.APP_AUTH_CONFIG || {};
  return cfg.userDataTable || "app_user_data";
}

function normalizeArrayData(value) {
  return Array.isArray(value) ? value : [];
}

function arraysEqualByJson(a, b) {
  try {
    return JSON.stringify(normalizeArrayData(a)) === JSON.stringify(normalizeArrayData(b));
  } catch (_error) {
    return false;
  }
}

function mergeByIdKeepNewest(primary = [], secondary = []) {
  const byId = new Map();
  [...normalizeArrayData(secondary), ...normalizeArrayData(primary)].forEach((item) => {
    if (!item || typeof item !== "object") return;
    const id = item.id ? String(item.id) : "";
    if (!id) return;
    const current = byId.get(id);
    if (!current) {
      byId.set(id, item);
      return;
    }
    const currentCreatedAt = Number(current.createdAt || 0);
    const incomingCreatedAt = Number(item.createdAt || 0);
    if (incomingCreatedAt >= currentCreatedAt) byId.set(id, item);
  });
  return [...byId.values()].sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
}

async function readCloudUserData() {
  const sb = initSupabaseClient();
  const userId = await getCurrentUserId();
  if (!sb || !userId) return null;

  if (cloudDataLoadedForUser === userId && cloudDataCache) return cloudDataCache;

  try {
    const table = getUserDataTableName();
    const { data, error } = await sb
      .from(table)
      .select("user_id, routes, trips, updated_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) return null;

    cloudDataCache = {
      user_id: userId,
      routes: normalizeArrayData(data?.routes),
      trips: normalizeArrayData(data?.trips)
    };
    cloudDataLoadedForUser = userId;
    return cloudDataCache;
  } catch (_error) {
    return null;
  }
}

async function writeCloudUserDataField(field, value) {
  const sb = initSupabaseClient();
  const userId = await getCurrentUserId();
  if (!sb || !userId) {
    lastCloudSyncError = "Sem sessão autenticada no Supabase.";
    return false;
  }

  const current = (await readCloudUserData()) || {
    user_id: userId,
    routes: [],
    trips: []
  };

  const payload = {
    user_id: userId,
    routes: normalizeArrayData(field === "routes" ? value : current.routes),
    trips: normalizeArrayData(field === "trips" ? value : current.trips),
    updated_at: new Date().toISOString()
  };

  try {
    const table = getUserDataTableName();
    const { error } = await sb.from(table).upsert(payload, { onConflict: "user_id" });
    if (error) {
      lastCloudSyncError = error.message || "Falha ao salvar no Supabase.";
      return false;
    }
    cloudDataCache = payload;
    cloudDataLoadedForUser = userId;
    lastCloudSyncError = "";
    return true;
  } catch (_error) {
    lastCloudSyncError = "Erro de conexão ao salvar no Supabase.";
    return false;
  }
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
    expenses: document.getElementById("expenses"),
    "expense-trip": document.getElementById("expense-trip"),
    "camping-search": document.getElementById("camping-search"),
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
    const isExpensesContext = normalized === "#expenses" || normalized.startsWith("#expense-trip");
    if (href === "#expenses") {
      link.classList.toggle("active", isExpensesContext);
      return;
    }
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
    collabDetailBodyEl.innerHTML = `<p class="tiny">ColaboraÃ§Ã£o nÃ£o encontrada.</p>`;
    return;
  }
  const createdAt = item.created_at ? new Date(item.created_at).toLocaleString("pt-BR") : "-";
  const category = COMMUNITY_CATEGORY_LABELS[item.category] || item.category || "Ponto";
  const photoHtml = item.photo_url ? `<img src="${item.photo_url}" alt="foto colaboraÃ§Ã£o" class="collab-detail-photo">` : "";
  const mapsUrl = `https://www.google.com/maps?q=${item.lat},${item.lon}`;
  collabDetailBodyEl.innerHTML = `
    <article class="collab-detail-card">
      <div class="collab-detail-head">
        <div>
          <h3 class="collab-detail-title">${item.name || "Ponto colaborativo"}</h3>
          <div class="collab-detail-meta">${category} â€¢ ${Number(item.lat).toFixed(5)}, ${Number(item.lon).toFixed(5)}</div>
          <div class="collab-detail-meta">Criado em: ${createdAt}</div>
          <p class="collab-detail-meta" style="margin-top:8px">${item.description || "Sem descricao."}</p>
          <p class="collab-detail-meta"><a href="${mapsUrl}" target="_blank" rel="noreferrer">Abrir no Google Maps</a></p>
        </div>
        <div class="saved-route-actions" style="margin-top:0">
          <button type="button" data-action="detail-edit">Editar</button>
          <button type="button" data-action="detail-delete" class="danger" title="Excluir colaboraÃ§Ã£o">&#128465;</button>
        </div>
      </div>
      ${photoHtml}
    </article>
  `;
  const editBtn = collabDetailBodyEl.querySelector("[data-action='detail-edit']");
  const delBtn = collabDetailBodyEl.querySelector("[data-action='detail-delete']");
  editBtn?.addEventListener("click", () => {
    openCommunityModal(Number(item.lat), Number(item.lon), item);
    setCommunityStatus("Edite os campos e salve as alteraÃ§Ãµes.");
  });
  delBtn?.addEventListener("click", async () => {
    const confirmDelete = confirmNormalized("Deseja excluir esta colaboração?");
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
  setCommunityStatus("Use os botÃµes para adicionar ponto colaborativo.");
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
    showPlannerRouteLayersOnMap();
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
  if (normalized.startsWith("#expense-trip")) {
    exitRouteFocusMode();
    let tripId = "";
    if (normalized.startsWith("#expense-trip/")) {
      tripId = decodeURIComponent(normalized.replace("#expense-trip/", "").trim());
    }
    if (tripId) {
      selectedExpenseTripId = tripId;
    }
    if (!getSelectedExpenseTrip()) {
      selectedExpenseTripId = null;
      setSectionVisibility("expenses");
      setCollabDetailVisibility(false);
      updateActiveNav("#expenses");
      renderTravelExpenses();
      return;
    }
    setSectionVisibility("expense-trip");
    setCollabDetailVisibility(false);
    updateActiveNav("#expense-trip");
    renderTravelExpenses();
    return;
  }

  const target = normalized.replace("#", "");
  const allowedTargets = new Set(["home", "planner", "my-routes", "expenses", "expense-trip", "my-collabs", "mapa", "destinos", "route"]);
  const sectionId = allowedTargets.has(target) ? target : "home";
  if (sectionId === "mapa") revealMapSection();
  exitRouteFocusMode();
  setSectionVisibility(sectionId);
  setCollabDetailVisibility(false);
  updateActiveNav(`#${sectionId}`);

  if (sectionId === "mapa") {
    hidePlannerRouteLayersFromMap();
    requestAnimationFrame(() => {
      map.invalidateSize();
    });
  }
}

function hidePlannerRouteLayersFromMap() {
  if (routeLayer && map.hasLayer(routeLayer)) map.removeLayer(routeLayer);
  routeMarkers.forEach((marker) => {
    if (map.hasLayer(marker)) map.removeLayer(marker);
  });
  if (cityAnchorsLayer && map.hasLayer(cityAnchorsLayer)) map.removeLayer(cityAnchorsLayer);
  if (dayStopsLayer && map.hasLayer(dayStopsLayer)) map.removeLayer(dayStopsLayer);
  if (borderCrossingsLayer && map.hasLayer(borderCrossingsLayer)) map.removeLayer(borderCrossingsLayer);
}

function showPlannerRouteLayersOnMap() {
  if (routeLayer && !map.hasLayer(routeLayer)) routeLayer.addTo(map);
  routeMarkers.forEach((marker) => {
    if (!map.hasLayer(marker)) marker.addTo(map);
  });
  if (cityAnchorsLayer && !map.hasLayer(cityAnchorsLayer)) cityAnchorsLayer.addTo(map);
  if (dayStopsLayer && !map.hasLayer(dayStopsLayer)) dayStopsLayer.addTo(map);
  if (borderCrossingsLayer && !map.hasLayer(borderCrossingsLayer)) borderCrossingsLayer.addTo(map);
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
  if (cityAnchorsLayer) {
    map.removeLayer(cityAnchorsLayer);
    cityAnchorsLayer = null;
  }
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
  const destinationText = normalizeUiText((route.destinations || []).join(" - "));
  const createdAtDate = new Date(route.createdAt || Date.now());
  const createdDate = createdAtDate.toLocaleDateString("pt-BR");
  const createdTime = createdAtDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  routeFocusTitleEl.textContent = normalizeUiText(`${route.origin || "-"} → ${destinationText || "-"}`);
  routeFocusMetaEl.textContent = normalizeUiText(`${route.totalKm || 0} km - ${route.totalHours || 0} h - ${route.totalDays || 0} dias • criada em ${createdDate} às ${createdTime}`);
  routeFocusHeaderEl.style.display = "block";
}

async function shareRoute(route) {
  if (!route) {
    warnEl.textContent = "Gere ou abra uma rota antes de compartilhar.";
    return;
  }
  const shareText = `${route.name || "Rota"}\n${route.origin || "-"} -> ${(route.destinations || []).join(" - ") || "-"}\n${route.totalKm || 0} km â€¢ ${route.totalHours || 0} h â€¢ ${route.totalDays || 0} dias`;
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
      warnEl.textContent = "Resumo da rota copiado para a Ã¡rea de transferÃªncia.";
      return;
    }
  } catch (_error) {}
  warnEl.textContent = "NÃ£o foi possÃ­vel compartilhar agora.";
}

async function getRoutesStorageKey() {
  const email = await getCurrentUserEmail();
  if (routesStorageKeyCache && routesStorageKeyCacheEmail === email) return routesStorageKeyCache;
  routesStorageKeyCacheEmail = email;
  routesStorageKeyCache = `myRoutes:${email}`;
  return routesStorageKeyCache;
}

async function readSavedRoutes() {
  const key = await getRoutesStorageKey();
  let localRoutes = [];
  try {
    const raw = safeGetStorage(key);
    if (!raw) localRoutes = [];
    const parsed = JSON.parse(raw);
    localRoutes = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    localRoutes = [];
  }

  const cloudData = await readCloudUserData();
  if (!cloudData) return localRoutes;

  const cloudRoutes = normalizeArrayData(cloudData.routes);
  const merged = mergeByIdKeepNewest(cloudRoutes, localRoutes);

  if (!arraysEqualByJson(cloudRoutes, merged)) {
    await writeCloudUserDataField("routes", merged);
  }
  if (!arraysEqualByJson(localRoutes, merged)) {
    safeSetStorage(key, JSON.stringify(merged));
  }

  return merged;
}

async function writeSavedRoutes(routes) {
  const key = await getRoutesStorageKey();
  const safeRoutes = normalizeArrayData(routes);
  safeSetStorage(key, JSON.stringify(safeRoutes));
  const synced = await writeCloudUserDataField("routes", safeRoutes);
  if (!synced) await queuePendingCloudField("routes", safeRoutes);
  return synced;
}

async function getExpensesStorageKey() {
  const email = await getCurrentUserEmail();
  if (expensesStorageKeyCache && expensesStorageKeyCacheEmail === email) return expensesStorageKeyCache;
  expensesStorageKeyCacheEmail = email;
  expensesStorageKeyCache = `travelExpenses:${email}`;
  return expensesStorageKeyCache;
}

async function readTravelExpenses() {
  const key = await getExpensesStorageKey();
  let localTrips = [];
  try {
    const raw = safeGetStorage(key);
    if (!raw) localTrips = [];
    const parsed = JSON.parse(raw);
    localTrips = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    localTrips = [];
  }

  const cloudData = await readCloudUserData();
  if (!cloudData) return localTrips;

  const cloudTrips = normalizeArrayData(cloudData.trips);
  const merged = mergeByIdKeepNewest(cloudTrips, localTrips);

  if (!arraysEqualByJson(cloudTrips, merged)) {
    await writeCloudUserDataField("trips", merged);
  }
  if (!arraysEqualByJson(localTrips, merged)) {
    safeSetStorage(key, JSON.stringify(merged));
  }

  return merged;
}

async function writeTravelExpenses(trips) {
  const key = await getExpensesStorageKey();
  const safeTrips = normalizeArrayData(trips);
  safeSetStorage(key, JSON.stringify(safeTrips));
  const synced = await writeCloudUserDataField("trips", safeTrips);
  if (!synced) await queuePendingCloudField("trips", safeTrips);
  return synced;
}

function formatBrl(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0));
}

function formatTravelDate(value) {
  if (!value) return "Data nÃ£o informada";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

function calculateTripExpenseTotal(trip) {
  return (trip?.expenses || []).reduce((sum, expense) => sum + Number(expense.brl || 0), 0);
}

function getSelectedExpenseTrip() {
  if (!selectedExpenseTripId) return null;
  return travelExpenseTrips.find((trip) => trip.id === selectedExpenseTripId) || null;
}

function categoryTotalsForTrip(trip) {
  const totals = {};
  (trip?.expenses || []).forEach((expense) => {
    const category = expense.category || "extras";
    totals[category] = (totals[category] || 0) + Number(expense.brl || 0);
  });
  return totals;
}

function setExpenseFormEnabled(enabled, selectedTrip) {
  if (!expenseFormEl) return;
  if (expenseEntryPanelEl) {
    expenseEntryPanelEl.hidden = !enabled;
  }
  const controls = expenseFormEl.querySelectorAll("input, select, button");
  controls.forEach((control) => {
    if (!control) return;
    if (control === expenseActiveTripNameEl) {
      control.disabled = true;
      return;
    }
    control.disabled = !enabled;
  });
  if (expenseActiveTripNameEl) {
    expenseActiveTripNameEl.value = selectedTrip?.name || "Nenhuma viagem selecionada";
  }
  if (expenseNoTripHintEl) {
    expenseNoTripHintEl.textContent = enabled
      ? `LanÃ§ando gastos em: ${selectedTrip.name}`
      : "Selecione uma viagem em \"Viagens cadastradas\" para comeÃ§ar a lanÃ§ar gastos.";
  }
}

function renderExpensePie(totals) {
  if (!expensePieEl || !expenseLegendEl) return;
  const entries = Object.entries(totals).filter(([, value]) => value > 0);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  if (!total) {
    expensePieEl.style.background = "#17362f";
    expenseLegendEl.innerHTML = `<div class="tiny">Adicione gastos para gerar o grÃ¡fico.</div>`;
    return;
  }

  let cursor = 0;
  const slices = entries.map(([category, value]) => {
    const start = cursor;
    const angle = (value / total) * 360;
    cursor += angle;
    return `${EXPENSE_CATEGORY_COLORS[category] || "#86d1a5"} ${start}deg ${cursor}deg`;
  });
  expensePieEl.style.background = `conic-gradient(${slices.join(", ")})`;
  expenseLegendEl.innerHTML = entries
    .map(([category, value]) => {
      const percent = Math.round((value / total) * 100);
      const color = EXPENSE_CATEGORY_COLORS[category] || "#86d1a5";
      return `<div class="expense-legend-item"><span class="expense-legend-label"><span class="expense-dot" style="background:${color}"></span>${EXPENSE_CATEGORY_LABELS[category] || category}</span><span>${formatBrl(value)} â€¢ ${percent}%</span></div>`;
    })
    .join("");
}

function renderTravelExpenses() {
  if (!tripsListEl || !tripsEmptyEl) return;
  const selectedTrip = getSelectedExpenseTrip();
  selectedExpenseTripId = selectedTrip?.id || null;

  if (expenseTripTitleEl) {
    expenseTripTitleEl.textContent = selectedTrip ? selectedTrip.name : "Detalhes da viagem";
  }
  if (expenseTripMetaEl) {
    const start = formatTravelDate(selectedTrip?.startDate || "");
    const duration = selectedTrip?.durationDays ? `${selectedTrip.durationDays} dias` : "DuraÃ§Ã£o nÃ£o informada";
    expenseTripMetaEl.textContent = selectedTrip
      ? `${start} â€¢ ${duration} â€¢ ${selectedTrip.description || "Sem descricao."}`
      : "Abra uma viagem em â€œGastos de viagemâ€ para comeÃ§ar a lanÃ§ar despesas.";
  }

  tripsEmptyEl.hidden = travelExpenseTrips.length > 0;
  tripsListEl.innerHTML = travelExpenseTrips
    .map((trip) => {
      const total = calculateTripExpenseTotal(trip);
      const activeClass = trip.id === selectedExpenseTripId ? " active" : "";
      return `
        <article class="saved-route-item${activeClass}" data-trip-id="${trip.id}">
          <h3 class="saved-route-title">${trip.name}</h3>
          <div class="saved-route-meta">${formatTravelDate(trip.startDate)} â€¢ ${trip.durationDays || "-"} dias</div>
          <div class="saved-route-meta">${trip.description || "Sem descricao."}</div>
          <div class="expense-money">${formatBrl(total)}</div>
          <div class="saved-route-actions">
            <button type="button" data-action="select-trip">Abrir viagem</button>
            <button type="button" data-action="delete-trip" class="danger" title="Excluir viagem">&#128465;</button>
          </div>
        </article>
      `;
    })
    .join("");

  setExpenseFormEnabled(Boolean(selectedTrip), selectedTrip);

  if (expenseSelectedTripTitleEl) expenseSelectedTripTitleEl.textContent = selectedTrip ? selectedTrip.name : "Nenhuma viagem selecionada";
  if (expenseTotalBrlEl) expenseTotalBrlEl.textContent = formatBrl(calculateTripExpenseTotal(selectedTrip));
  renderExpensePie(categoryTotalsForTrip(selectedTrip));

  if (!expensesListEl || !expensesEmptyEl) return;
  const expenses = selectedTrip?.expenses || [];
  expensesEmptyEl.hidden = expenses.length > 0;
  expensesListEl.innerHTML = expenses
    .map((expense) => `
      <article class="saved-route-item" data-trip-id="${selectedTrip.id}" data-expense-id="${expense.id}">
        <h3 class="saved-route-title">${expense.description || EXPENSE_CATEGORY_LABELS[expense.category] || "Gasto"}</h3>
        <div class="saved-route-meta">
          <span class="expense-chip">${EXPENSE_CATEGORY_LABELS[expense.category] || expense.category}</span>
          <span class="expense-chip">${EXPENSE_PAYMENT_LABELS[expense.payment] || expense.payment}</span>
        </div>
        <div class="saved-route-meta">${formatTravelDate(expense.date)} â€¢ ${Number(expense.amount || 0).toFixed(2)} ${expense.currency} â€¢ cotaÃ§Ã£o ${Number(expense.rate || 1).toFixed(4)}</div>
        <div class="expense-money">${formatBrl(expense.brl)}</div>
        <div class="saved-route-actions">
          <button type="button" data-action="delete-expense" class="danger" title="Excluir gasto">&#128465;</button>
        </div>
      </article>
    `)
    .join("");
}

async function refreshTravelExpenses() {
  travelExpenseTrips = await readTravelExpenses();
  if (selectedExpenseTripId && !travelExpenseTrips.some((trip) => trip.id === selectedExpenseTripId)) {
    selectedExpenseTripId = null;
  }
  renderTravelExpenses();
}

async function saveTravelExpenseTrips() {
  const synced = await writeTravelExpenses(travelExpenseTrips);
  renderTravelExpenses();
  if (!synced && warnEl) {
    warnEl.textContent = "Dados salvos neste dispositivo. A sincronização com a nuvem será tentada novamente automaticamente.";
  }
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
      const destinationText = Array.isArray(route.destinations) && route.destinations.length ? route.destinations.join(" â€¢ ") : "-";
      return `<article class="saved-route-item" data-route-id="${route.id}">
        <h4 class="saved-route-title">${route.name || "Rota salva"}</h4>
        <div class="saved-route-meta">${route.origin || "-"} â†’ ${destinationText}</div>
        <div class="saved-route-meta">${route.totalKm || 0} km â€¢ ${route.totalHours || 0} h â€¢ ${route.totalDays || 0} dias â€¢ salvo em ${createdAt}</div>
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
    dayLimitLabelEl.textContent = "Horas mÃ¡ximas por dia";
    dayLimitHelpEl.textContent = "Exemplo: 8 horas por dia.";
    dayLimitValueEl.placeholder = "Ex.: 8";
    dayLimitValueEl.min = "1";
    dayLimitValueEl.max = "16";
    dayLimitValueEl.step = "0.5";
  } else {
    dayLimitLabelEl.textContent = "Quilometragem mÃ¡xima por dia";
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

function normalizeAutocompleteEntry(entry) {
  if (!entry) return null;
  const name = (entry.name || entry.label || entry.display_name?.split(",")?.[0] || "").trim();
  const lat = Number(entry.lat);
  const lon = Number(entry.lon ?? entry.lng);
  if (!name || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {
    lat: String(lat),
    lon: String(lon),
    address: {
      city: name,
      town: name,
      municipality: name,
      village: name,
      country: entry.country || ""
    },
    display_name: `${name}${entry.country ? `, ${entry.country}` : ""}`
  };
}

const RECENT_SEARCHES_LIMIT = 6;
const RECENT_SEARCHES_GLOBAL_KEY = "recentSearches:global";

async function getRecentSearchesKey(kind) {
  const email = await getCurrentUserEmail();
  return `recentSearches:${kind}:${email}`;
}

async function getRecentSearchStorageKeys(kind) {
  const userKey = await getRecentSearchesKey(kind);
  return [userKey, RECENT_SEARCHES_GLOBAL_KEY].filter(Boolean);
}

function mergeRecentSearches(items = []) {
  const seen = new Set();
  const merged = [];
  for (const item of items) {
    const normalized = normalizeAutocompleteEntry(item);
    if (!normalized) continue;
    const key = `${normalized.address.city}::${normalized.lat}::${normalized.lon}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(normalized);
    if (merged.length >= RECENT_SEARCHES_LIMIT) break;
  }
  return merged;
}

async function readRecentSearches(kind) {
  try {
    const keys = await getRecentSearchStorageKeys(kind);
    const collected = [];
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) collected.push(...parsed);
    }
    return mergeRecentSearches(collected);
  } catch (_error) {
    return [];
  }
}

async function rememberRecentSearch(kind, picked) {
  const normalized = normalizeAutocompleteEntry(picked);
  if (!normalized) return;
  try {
    const keys = await getRecentSearchStorageKeys(kind);
    const current = await readRecentSearches(kind);
    const next = mergeRecentSearches([normalized, ...current]);
    for (const key of keys) {
      localStorage.setItem(key, JSON.stringify(next));
    }
  } catch (_error) {}
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
      lon: Number(row.dataset.lon),
      country: row.dataset.country || ""
    };
    onPick(picked);
    listEl.hidden = true;
  };
}

async function showAutocompleteSuggestions(inputEl, listEl, kind, assignFn, onSelected) {
  const query = inputEl.value.trim();
  if (!query || query.length < 2) {
    const recent = await readRecentSearches(kind);
    renderAutocomplete(listEl, recent, async (picked) => {
      inputEl.value = picked.name;
      assignFn(picked);
      await rememberRecentSearch(kind, picked);
      if (typeof onSelected === "function") onSelected(picked);
    });
    return;
  }
  const items = await searchCities(query);
  renderAutocomplete(listEl, items, async (picked) => {
    inputEl.value = picked.name;
    assignFn(picked);
    await rememberRecentSearch(kind, picked);
    if (typeof onSelected === "function") onSelected(picked);
  });
}

function bindAutocomplete(inputEl, listEl, kind, assignFn) {
  let hasTyped = false;
  const runSearch = debounce(async () => {
    await showAutocompleteSuggestions(inputEl, listEl, kind, assignFn, () => {
      hasTyped = false;
    });
  }, 300);

  inputEl.addEventListener("input", () => {
    hasTyped = true;
    assignFn(null);
    runSearch();
  });
  inputEl.addEventListener("focus", async () => {
    if (!hasTyped) {
      await showAutocompleteSuggestions(inputEl, listEl, kind, assignFn, () => {
        hasTyped = false;
      });
      return;
    }
    runSearch();
  });
  inputEl.addEventListener("blur", () => setTimeout(() => (listEl.hidden = true), 150));
}

bindAutocomplete(originInput, originList, "origin", (value) => (selectedOrigin = value));
[
  [dest1Input, dest1List, 0],
  [dest2Input, dest2List, 1],
  [dest3Input, dest3List, 2],
  [dest4Input, dest4List, 3],
  [dest5Input, dest5List, 4]
].forEach(([inputEl, listEl, idx]) => {
  bindAutocomplete(inputEl, listEl, "destination", (value) => (selectedDestinations[idx] = value));
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

async function rememberWaypointSearches(points = []) {
  for (const point of points) {
    if (point?.name) {
      await rememberRecentSearch("destination", point);
    }
  }
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
  await rememberRecentSearch("origin", selectedOrigin);
  await rememberWaypointSearches(selectedDestinations.filter(Boolean));

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
      return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} â†’ ${day.to}</b><div class="tiny">${day.km} km â€¢ ${day.hours} h</div><div class="tiny">${sleepByStyle(style, day.to)}</div><div class="tiny">Parada prÃ³xima da meta diÃ¡ria (${limitMode === "hours" ? "Â±45min" : "Â±50km"}).</div>${borderHtml}</article>`;
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
  daysOutEl.innerHTML = renderDaysHtmlEnhanced(route.days, route.style || styleEl?.value || "fast", route.dayLimitMode || dayLimitModeEl?.value || "km");

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
      return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} â†’ ${day.to}</b><div class="tiny">${day.km} km â€¢ ${day.hours} h</div><div class="tiny">${sleepByStyle(style, day.to)}</div><div class="tiny">Parada prÃ³xima da meta diÃ¡ria (${limitMode === "hours" ? "Â±45min" : "Â±50km"}).</div>${borderHtml}</article>`;
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

function nearestCityByCoord(lat, lon) {
  let min = Number.POSITIVE_INFINITY;
  let nearest = null;
  for (const city of CITY_REFERENCE) {
    const d = haversineKm([lat, lon], [city.lat, city.lng]);
    if (d < min) {
      min = d;
      nearest = city;
    }
  }
  return nearest ? { ...nearest, distanceKm: min } : null;
}

const NEAR_CITY_LABEL_MAX_KM = 35;

function metaFromCoordFast(lat, lon) {
  const nearest = nearestCityByCoord(lat, lon);
  if (!nearest) return { label: "Parada intermediÃ¡ria", country: "", countryCode: "" };
  const countryCode = CITY_COUNTRY_BY_NAME[nearest.name] || "";
  return {
    label: nearest.name,
    nearestKm: Number(nearest.distanceKm || 0),
    countryCode,
    country: COUNTRY_NAMES[countryCode] || ""
  };
}

async function resolveStopMeta(lat, lon) {
  const quickMeta = metaFromCoordFast(lat, lon);
  if (Number(quickMeta.nearestKm || 0) <= NEAR_CITY_LABEL_MAX_KM) {
    return quickMeta;
  }
  const remoteMeta = await withTimeout(() => reverseGeocodeMeta(lat, lon), 1200);
  return remoteMeta?.label ? remoteMeta : quickMeta;
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

function buildRouteCityAnchors(coords, cumulative, maxDistanceKm = 45) {
  if (!Array.isArray(coords) || !coords.length) return [];
  const anchors = [];
  for (const city of CITY_REFERENCE) {
    let bestIdx = 0;
    let minDist = Number.POSITIVE_INFINITY;
    for (let idx = 0; idx < coords.length; idx += 1) {
      const dist = haversineKm(coords[idx], [city.lat, city.lng]);
      if (dist < minDist) {
        minDist = dist;
        bestIdx = idx;
      }
    }
    if (minDist <= maxDistanceKm) {
      anchors.push({
        name: city.name,
        lat: city.lat,
        lon: city.lng,
        index: bestIdx,
        metric: cumulative[bestIdx] || 0,
        distToRouteKm: minDist
      });
    }
  }
  anchors.sort((a, b) => a.metric - b.metric || a.distToRouteKm - b.distToRouteKm);
  return anchors;
}

function isMetricForced(metric, forcedMetrics = [], epsilon = 0.001) {
  return forcedMetrics.some((value) => Math.abs(value - metric) < epsilon);
}

function pickCityAnchorBeforeTarget(anchors, prevMetric, targetMetric, minAdvance, maxBacktrack) {
  const minAllowedMetric = Math.max(prevMetric + minAdvance, targetMetric - Math.max(0, maxBacktrack || 0));
  let best = null;
  for (const anchor of anchors) {
    if (anchor.metric < minAllowedMetric) continue;
    if (anchor.metric > targetMetric) continue;
    if (!best || anchor.metric > best.metric || (Math.abs(anchor.metric - best.metric) < 0.001 && anchor.distToRouteKm < best.distToRouteKm)) {
      best = anchor;
    }
  }
  return best;
}

function findWaypointSegmentForIndex(index, segmentRanges = []) {
  if (!segmentRanges.length) return null;
  for (const range of segmentRanges) {
    if (index >= range.startIndex && index <= range.endIndex) return range;
  }
  return segmentRanges[segmentRanges.length - 1] || null;
}

function normalizeRoadCandidate(step = {}) {
  const raw = [step.ref, step.name, step.destinations]
    .filter((value) => typeof value === "string" && value.trim())
    .map((value) => value.trim())[0];
  if (!raw) return "";
  const lowered = raw.toLowerCase();
  if (
    lowered === "road" ||
    lowered === "unnamed road" ||
    lowered === "sem nome" ||
    lowered.includes("trecho") ||
    lowered.includes("->") ||
    lowered.includes("parada")
  ) {
    return "";
  }
  return raw;
}

function pickDominantRoadName(route = {}) {
  const weights = new Map();
  for (const leg of route.legs || []) {
    for (const step of leg.steps || []) {
      const name = normalizeRoadCandidate(step);
      if (!name) continue;
      const weight = Number(step.distance) > 0 ? Number(step.distance) : 1;
      weights.set(name, (weights.get(name) || 0) + weight);
    }
  }
  if (!weights.size) return "";
  return [...weights.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function buildStopLabel(meta, forcedLabel, segment, fallbackLabel) {
  if (forcedLabel) return forcedLabel;
  const cityLabel = (meta?.label || fallbackLabel || "").trim();
  const roadLabel = (segment?.roadName || "").trim();
  const hasRealRoadLabel = roadLabel && !/trecho|->/i.test(roadLabel);

  // Preferimos: cidade + ruta real (quando existir).
  if (cityLabel && hasRealRoadLabel) return `${cityLabel} â€¢ ${roadLabel}`;
  return cityLabel || fallbackLabel;
}

function buildSegmentGoogleMapsUrl(startCoord, endCoord) {
  if (
    Array.isArray(startCoord) &&
    startCoord.length === 2 &&
    Array.isArray(endCoord) &&
    endCoord.length === 2
  ) {
    const origin = `${startCoord[0]},${startCoord[1]}`;
    const destination = `${endCoord[0]},${endCoord[1]}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  }
  return "";
}

function renderDaysHtmlEnhanced(days = [], style = "fast", limitMode = "km") {
  return days
    .map((day) => {
      const borderHtml = day.borderCrossing
        ? `<div class="tiny" style="margin-top:6px;color:#b42318;font-weight:700">Fronteira/aduana neste dia: ${normalizeUiText(day.borderText)}</div>`
        : "";
      const mapsLinkHtml = day.googleMapsUrl
        ? `<div class="tiny" style="margin-top:4px"><a href="${day.googleMapsUrl}" target="_blank" rel="noreferrer" style="color:#ffffff;text-decoration:underline">Ver rota no Google Maps</a></div>`
        : "";
      return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${normalizeUiText(day.from)} → ${normalizeUiText(day.to)}</b><div class="tiny">${day.km} km • ${day.hours} h</div><div class="tiny">${normalizeUiText(sleepByStyle(style, day.to))}</div><div class="tiny">Parada próxima da meta diária (${limitMode === "hours" ? "±45min" : "±50km"}).</div>${mapsLinkHtml}${borderHtml}</article>`;
    })
    .join("");
}

function detectCountryTransitionOnSegment(coords, startIdx, endIdx, fromCode, toCode) {
  const safeStart = Math.max(0, Math.min(startIdx, endIdx));
  const safeEnd = Math.max(0, Math.max(startIdx, endIdx));
  const span = safeEnd - safeStart;
  if (span < 2) return null;

  const candidates = KNOWN_BORDER_CROSSINGS.filter((item) =>
    (item.from === fromCode && item.to === toCode) || (item.from === toCode && item.to === fromCode)
  );
  if (!candidates.length) return null;

  let best = null;
  for (const crossing of candidates) {
    const step = Math.max(1, Math.floor(span / 180));
    let bestIdx = safeStart;
    let minDist = Number.POSITIVE_INFINITY;
    for (let idx = safeStart; idx <= safeEnd; idx += step) {
      const coord = coords[idx];
      if (!coord) continue;
      const d = haversineKm(coord, [crossing.lat, crossing.lon]);
      if (d < minDist) {
        minDist = d;
        bestIdx = idx;
      }
    }
    if (minDist <= 18 && (!best || minDist < best.distKm)) {
      best = { crossing, idx: bestIdx, distKm: minDist };
    }
  }

  if (!best) return null;
  return {
    index: best.idx,
    coord: coords[best.idx] || [best.crossing.lat, best.crossing.lon],
    fromCode,
    toCode,
    fromCountry: COUNTRY_NAMES[fromCode] || fromCode,
    toCountry: COUNTRY_NAMES[toCode] || toCode,
    name: best.crossing.name
  };
}

async function withTimeout(promiseFactory, timeoutMs = 1800) {
  return await Promise.race([
    Promise.resolve().then(promiseFactory),
    new Promise((resolve) => setTimeout(() => resolve(null), timeoutMs))
  ]);
}

const reverseGeocodeCache = new Map();
async function reverseGeocodeMeta(lat, lon) {
  const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  if (reverseGeocodeCache.has(key)) return reverseGeocodeCache.get(key);
  const quickMeta = metaFromCoordFast(lat, lon);
  if (Number(quickMeta.nearestKm || 0) <= 20) {
    reverseGeocodeCache.set(key, quickMeta);
    return quickMeta;
  }
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const response = await withTimeout(
      () => fetch(url, { headers: { "Accept-Language": "pt-BR" } }),
      900
    );
    if (!response) throw new Error("reverse timeout");
    if (!response.ok) throw new Error("reverse failed");
    const data = await response.json();
    const label =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      data.address?.county ||
      data.display_name?.split(",")?.[0] ||
      "Parada intermediÃ¡ria";
    const meta = {
      label,
      country: data.address?.country || "",
      countryCode: data.address?.country_code?.toUpperCase() || "",
      nearestKm: 0
    };
    reverseGeocodeCache.set(key, meta);
    return meta;
  } catch (error) {
    let min = Number.POSITIVE_INFINITY;
    let nearest = "Parada intermediÃ¡ria";
    for (const city of CITY_REFERENCE) {
      const d = haversineKm([lat, lon], [city.lat, city.lng]);
      if (d < min) {
        min = d;
        nearest = city.name;
      }
    }
    const fallback = { label: nearest, country: "", countryCode: "", nearestKm: Number(min || 0) };
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
  if (tourism === "camp_site" || tourism === "caravan_site") category = "camping";
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

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function getCampingSearchMode() {
  return document.querySelector("input[name='campingSearchMode']:checked")?.value || "city";
}

function updateCampingSearchModeUi() {
  const mode = getCampingSearchMode();
  if (campingCityPanelEl) campingCityPanelEl.style.display = mode === "city" ? "" : "none";
  if (campingSearchBtn) campingSearchBtn.textContent = mode === "gps" ? "Usar GPS e buscar" : "Buscar campings";
  if (campingSearchStatusEl) {
    campingSearchStatusEl.textContent = mode === "gps"
      ? "GPS selecionado. A localização só será usada quando você clicar em buscar."
      : "Busca por cidade selecionada. O GPS não será usado.";
  }
}

function setCampingSearchStatus(message) {
  if (campingSearchStatusEl) campingSearchStatusEl.textContent = message;
}

function getCampingSearchRadiusKm() {
  const radius = Number(campingSearchRadiusEl?.value || 20);
  return Number.isFinite(radius) && radius > 0 ? radius : 20;
}

function getCurrentGpsPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("GPS não disponível neste navegador."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: "Minha localização atual"
      }),
      () => reject(new Error("Não foi possível acessar o GPS. Confira a permissão do navegador.")),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
    );
  });
}

function dedupeCampingResults(items) {
  const seen = new Set();
  return items.filter((item) => {
    const lat = Number(item.lat);
    const lng = Number(item.lng);
    const key = `${normalizeName(item.name)}:${lat.toFixed(4)}:${lng.toFixed(4)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getGoogleMapsApiKey() {
  return (window.APP_AUTH_CONFIG?.googleMapsApiKey || window.APP_CONFIG?.googleMapsApiKey || "").trim();
}

function loadGoogleMapsPlacesLibrary() {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) return Promise.resolve(null);
  if (window.google?.maps?.importLibrary) {
    return window.google.maps.importLibrary("places");
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("googleMapsPlacesScript");
    const finish = () => {
      if (window.google?.maps?.importLibrary) {
        window.google.maps.importLibrary("places").then(resolve).catch(reject);
      } else {
        reject(new Error("Google Places não carregou corretamente."));
      }
    };

    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", () => reject(new Error("Falha ao carregar Google Places.")), { once: true });
      return;
    }

    window.__byRafaelGooglePlacesReady = finish;
    const script = document.createElement("script");
    script.id = "googleMapsPlacesScript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&loading=async&callback=__byRafaelGooglePlacesReady`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Falha ao carregar Google Places."));
    document.head.appendChild(script);
  });
}

function getGooglePlaceName(place) {
  if (!place) return "Camping";
  if (typeof place.displayName === "string") return place.displayName;
  if (place.displayName?.text) return place.displayName.text;
  return place.name || "Camping";
}

function getGooglePlaceLocation(place) {
  const location = place?.location || place?.geometry?.location;
  if (!location) return null;
  const lat = typeof location.lat === "function" ? location.lat() : Number(location.lat);
  const lng = typeof location.lng === "function" ? location.lng() : Number(location.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

async function fetchGooglePlacesCampingsNear(lat, lon, radiusKm) {
  if (!getGoogleMapsApiKey()) return [];
  const placesLibrary = await loadGoogleMapsPlacesLibrary();
  const radiusM = Math.min(Math.max(1, Number(radiusKm) || 20) * 1000, 50000);

  if (placesLibrary?.Place?.searchNearby) {
    const { Place, SearchNearbyRankPreference } = placesLibrary;
    const { places = [] } = await Place.searchNearby({
      fields: ["id", "displayName", "formattedAddress", "googleMapsURI", "location", "types"],
      locationRestriction: {
        center: { lat, lng: lon },
        radius: radiusM
      },
      includedPrimaryTypes: ["campground", "rv_park"],
      maxResultCount: 20,
      rankPreference: SearchNearbyRankPreference?.DISTANCE
    });

    return places.map((place) => {
      const location = getGooglePlaceLocation(place);
      if (!location) return null;
      const name = getGooglePlaceName(place);
      const maps = place.googleMapsURI || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${location.lat},${location.lng}`)}${place.id ? `&query_place_id=${encodeURIComponent(place.id)}` : ""}`;
      return {
        id: `google-${place.id || `${location.lat}-${location.lng}`}`,
        name,
        city: place.formattedAddress || "Resultado do Google Places",
        category: "camping",
        lat: location.lat,
        lng: location.lng,
        description: "Camping encontrado pelo Google Places.",
        maps,
        source: "Google Places"
      };
    }).filter(Boolean);
  }

  return new Promise((resolve) => {
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    service.nearbySearch({
      location: new google.maps.LatLng(lat, lon),
      radius: radiusM,
      type: "campground",
      keyword: "camping"
    }, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !Array.isArray(results)) {
        resolve([]);
        return;
      }
      resolve(results.map((place) => {
        const location = getGooglePlaceLocation(place);
        if (!location) return null;
        const name = getGooglePlaceName(place);
        return {
          id: `google-${place.place_id || `${location.lat}-${location.lng}`}`,
          name,
          city: place.vicinity || "Resultado do Google Places",
          category: "camping",
          lat: location.lat,
          lng: location.lng,
          description: "Camping encontrado pelo Google Places.",
          maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${location.lat},${location.lng}`)}${place.place_id ? `&query_place_id=${encodeURIComponent(place.place_id)}` : ""}`,
          source: "Google Places"
        };
      }).filter(Boolean));
    });
  });
}

async function fetchCampingsNear(lat, lon, radiusKm) {
  try {
    const googleCampings = await fetchGooglePlacesCampingsNear(lat, lon, radiusKm);
    if (googleCampings.length) return googleCampings;
  } catch (error) {
    console.warn("Google Places indisponível; usando busca gratuita.", error);
  }

  const radiusM = Math.max(1, Number(radiusKm) || 20) * 1000;
  const query = `
    [out:json][timeout:45];
    (
      nwr(around:${radiusM},${lat},${lon})["tourism"="camp_site"];
      nwr(around:${radiusM},${lat},${lon})["tourism"="caravan_site"];
    );
    out center tags;
  `;
  const elements = await runOverpassQuery(query);
  return elements.map(mapAmenityElement).filter(Boolean).filter((item) => item.category === "camping");
}

function getCommunityCampingsNear(lat, lon, radiusKm) {
  const center = [lat, lon];
  return communityPoints
    .filter((point) => point.category === "camping")
    .map((point) => {
      const pointLat = Number(point.lat);
      const pointLon = Number(point.lon);
      if (!Number.isFinite(pointLat) || !Number.isFinite(pointLon)) return null;
      return {
        id: `community-${point.id}`,
        name: point.name || "Camping colaborativo",
        city: "Colaboração da comunidade",
        category: "camping",
        lat: pointLat,
        lng: pointLon,
        description: point.description || "Ponto colaborativo enviado por viajante.",
        maps: `https://maps.google.com/?q=${pointLat},${pointLon}`,
        source: "Comunidade",
        distanceKm: haversineKm(center, [pointLat, pointLon])
      };
    })
    .filter(Boolean)
    .filter((point) => point.distanceKm <= radiusKm);
}

function renderCampingSearchResults(results, center, label, radiusKm) {
  if (!campingSearchResultsEl) return;
  const sorted = dedupeCampingResults(results)
    .map((item) => {
      const distanceKm = Number.isFinite(item.distanceKm)
        ? item.distanceKm
        : haversineKm([center.lat, center.lon], [Number(item.lat), Number(item.lng)]);
      return { ...item, distanceKm };
    })
    .filter((item) => Number.isFinite(item.distanceKm))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  if (!sorted.length) {
    campingSearchResultsEl.innerHTML = "";
    setCampingSearchStatus(`Nenhum camping encontrado em até ${radiusKm} km de ${label}. Tente aumentar o raio.`);
    return;
  }

  setCampingSearchStatus(`${sorted.length} camping(s) encontrado(s) em até ${radiusKm} km de ${label}, em ordem de proximidade.`);
  campingSearchResultsEl.innerHTML = sorted.map((item) => `
    <article class="saved-route-item camping-result-card">
      <div class="saved-route-title">${escapeHtml(item.name || "Camping")}</div>
      <div class="camping-result-distance">${item.distanceKm.toFixed(1)} km de distância</div>
      <div class="saved-route-meta">${escapeHtml(item.city || "Região pesquisada")}${item.source ? ` • ${escapeHtml(item.source)}` : ""}</div>
      <p class="tiny">${escapeHtml(item.description || "Camping encontrado próximo ao ponto pesquisado.")}</p>
      <div class="saved-route-actions">
        <a class="maps-link" href="${item.maps}" target="_blank" rel="noreferrer">Abrir no Google Maps</a>
      </div>
    </article>
  `).join("");
}

async function runCampingSearchFromPoint(center, label) {
  const radiusKm = getCampingSearchRadiusKm();
  setCampingSearchStatus(`Buscando campings em até ${radiusKm} km de ${label}...`);
  if (campingSearchResultsEl) campingSearchResultsEl.innerHTML = "";
  const externalCampings = await fetchCampingsNear(center.lat, center.lon, radiusKm);
  const communityCampings = getCommunityCampingsNear(center.lat, center.lon, radiusKm);
  renderCampingSearchResults([...externalCampings, ...communityCampings], center, label, radiusKm);
}

async function runCampingSearch() {
  const mode = getCampingSearchMode();
  try {
    if (mode === "gps") {
      setCampingSearchStatus("Pedindo permissão para usar o GPS...");
      const gps = await getCurrentGpsPosition();
      await runCampingSearchFromPoint(gps, gps.name);
      return;
    }

    const city = campingSearchCityEl?.value?.trim() || "";
    if (!city) {
      setCampingSearchStatus("Digite uma cidade ou região, ou marque a opção de usar GPS.");
      campingSearchCityEl?.focus();
      return;
    }
    setCampingSearchStatus(`Localizando ${city}...`);
    const resolved = await geocodeIfNeeded(city);
    if (!resolved) {
      setCampingSearchStatus("Não encontrei essa cidade/região. Tente escrever de outra forma.");
      return;
    }
    rememberRecentSearch(campingSearchCityEl, resolved.name || city);
    await runCampingSearchFromPoint({
      lat: Number(resolved.lat),
      lon: Number(resolved.lon),
      name: resolved.name || city
    }, resolved.name || city);
  } catch (error) {
    setCampingSearchStatus(error.message || "Não foi possível buscar campings agora. Tente novamente.");
  }
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
  if (style === "camping") return `Parada recomendada: camping na regiÃ£o de ${cityLabel}.`;
  if (style === "hotel") return `Parada recomendada: hotel/pousada com estacionamento em ${cityLabel}.`;
  if (style === "panoramic") return `Parada recomendada: parada cÃªnica em ${cityLabel}.`;
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
  drawNearbyCityMarkers();
  map.fitBounds(routeLayer.getBounds(), { padding: [24, 24] });
}

function drawNearbyCityMarkers() {
  if (cityAnchorsLayer) map.removeLayer(cityAnchorsLayer);
  cityAnchorsLayer = L.layerGroup();
  if (!routeCoords.length) {
    cityAnchorsLayer.addTo(map);
    return;
  }

  const cumulative = buildCumulativeDistances(routeCoords);
  const anchors = buildRouteCityAnchors(routeCoords, cumulative, 32)
    .filter((anchor) => ROUTE_CITY_MARKER_NAMES.has(normalizeName(anchor.name)))
    .sort((a, b) => a.metric - b.metric || a.distToRouteKm - b.distToRouteKm);
  const selectedAnchors = [];
  const minSpacingKm = 80;
  for (const anchor of anchors) {
    const tooClose = selectedAnchors.some((selected) => Math.abs(selected.metric - anchor.metric) < minSpacingKm);
    if (!tooClose) selectedAnchors.push(anchor);
    if (selectedAnchors.length >= 36) break;
  }

  selectedAnchors.forEach((city) => {
    const marker = L.circleMarker([city.lat, city.lon], {
      radius: 5,
      color: "#f8fafc",
      weight: 1.5,
      fillColor: "#0b0f0d",
      fillOpacity: 0.95
    }).bindPopup(
      `<b>${city.name}</b><br><small>Cidade de referÃªncia prÃ³xima da rota</small><br><small>${city.distToRouteKm.toFixed(1)} km do traÃ§ado</small>`
    );
    marker.addTo(cityAnchorsLayer);
  });

  cityAnchorsLayer.addTo(map);
}

async function fetchDrivingRoute(from, to) {
  const routeServers = [
    "https://router.project-osrm.org",
    "https://routing.openstreetmap.de/routed-car"
  ];
  let lastError = null;
  const queryVariants = [
    "overview=full&geometries=geojson&steps=false",
    "overview=full&geometries=geojson&steps=true&annotations=distance,duration",
    "overview=simplified&geometries=geojson&steps=false"
  ];
  for (const base of routeServers) {
    for (const query of queryVariants) {
      const osrmUrl = `${base}/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?${query}`;
      let timer = null;
      try {
        const controller = new AbortController();
        timer = setTimeout(() => controller.abort(), 35000);
        const response = await fetch(osrmUrl, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!data.routes?.length) throw new Error("Sem rota");
        return data.routes[0];
      } catch (error) {
        lastError = error;
      } finally {
        if (timer) clearTimeout(timer);
      }
    }
  }
  throw lastError || new Error("Rota indisponÃ­vel");
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
      `<b>Dia ${dayNumber}</b><br>${day.from} â†’ ${day.to}<br>${day.km} km â€¢ ${day.hours} h${day.borderCrossing ? `<br><span style="color:#b42318;font-weight:700">Fronteira/aduana neste trecho</span>` : ""}`
    );
    marker.setZIndexOffset(1800);
    marker.addTo(dayStopsLayer);

    if (day.borderCrossing && Array.isArray(day.borderCoord)) {
      const borderCoord = day.borderCoord;
      const borderIcon = L.divIcon({
        className: "border-stop-icon",
        html: `<div style="min-width:36px;height:24px;border-radius:999px;background:#b42318;color:#fff;display:flex;align-items:center;justify-content:center;font:700 11px/1 Inter;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.28);padding:0 8px">FR</div>`,
        iconSize: [36, 24],
        iconAnchor: [18, 12]
      });
      const borderMarker = L.marker(borderCoord, { icon: borderIcon })
        .bindPopup(`<b>Fronteira/aduana</b><br>${day.borderText || "MudanÃ§a de paÃ­s neste dia."}`)
        .addTo(borderCrossingsLayer);
      borderMarker.setZIndexOffset(1900);
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
      `<b>${poi.name}</b><br><small>${categoryLabel} â€¢ ${poi.city}</small><p>${poi.description}</p><a href="${poi.maps}" target="_blank" rel="noreferrer">Google Maps</a>`
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
        `<b>${point.name}</b><br><small>${label}</small>${photoHtml}<p style="margin:6px 0 8px">${point.description || "Sem descricao."}</p><a href="${mapsUrl}" target="_blank" rel="noreferrer">Abrir no Google Maps</a>`
      )
      .addTo(communityLayer);
  });

  communityLayer.addTo(map);
}

function setCommunityStatus(text) {
  if (communityStatusEl) communityStatusEl.textContent = text;
}

function setCommunityConfirmState(enabled) {
  if (!confirmCommunityPointBtn) return;
  confirmCommunityPointBtn.disabled = !enabled;
  confirmCommunityPointBtn.style.opacity = enabled ? "1" : ".55";
}

function setCommunityPickerMode(active) {
  isAddingCommunityPoint = Boolean(active);
  if (!confirmCommunityPointBtn) return;
  confirmCommunityPointBtn.style.display = active ? "inline-flex" : "none";
  setCommunityConfirmState(Boolean(active && pendingCommunityCoords));
}

function getCommunityDraftMarkerIcon() {
  return L.divIcon({
    className: "community-draft-pin",
    html: "",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
}

function setDraftMarker(lat, lon, options = {}) {
  const { draggable = true } = options;
  if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return;
  const coords = [Number(lat), Number(lon)];
  if (!communityDraftMarker) {
    communityDraftMarker = L.marker(coords, {
      draggable: true,
      icon: getCommunityDraftMarkerIcon()
    }).addTo(map);
    communityDraftMarker.bindPopup("Ponto em ediÃ§Ã£o");
    communityDraftMarker.on("dragend", () => {
      const p = communityDraftMarker.getLatLng();
      const latValue = Number(p.lat);
      const lonValue = Number(p.lng);
      if (communityLatEl) communityLatEl.value = latValue.toFixed(6);
      if (communityLonEl) communityLonEl.value = lonValue.toFixed(6);
      pendingCommunityCoords = { lat: latValue, lon: lonValue };
      if (isAddingCommunityPoint) {
        setCommunityConfirmState(true);
        setCommunityStatus("Alfinete ajustado. Clique em \"Escolher este ponto\" para continuar.");
      }
    });
  } else {
    communityDraftMarker.setLatLng(coords);
  }
  communityDraftMarker.dragging?.[draggable ? "enable" : "disable"]();
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
  if (communitySaveBtn) communitySaveBtn.textContent = editingCommunityId ? "Salvar alteraÃ§Ãµes" : "Salvar ponto";
  communityModalEl.hidden = false;
}

function closeCommunityModal() {
  if (!communityModalEl) return;
  communityModalEl.hidden = true;
  communityFormEl?.reset();
  pendingCommunityCoords = null;
  setCommunityPickerMode(false);
  editingCommunityId = null;
  editingCommunityPhotoUrl = null;
  clearDraftMarker();
  if (communitySaveBtn) communitySaveBtn.textContent = "Salvar ponto";
}

async function loadCommunityPoints() {
  const sb = initSupabaseClient();
  if (!sb) {
    setCommunityStatus("Supabase nÃ£o configurado para pontos colaborativos.");
    return;
  }
  const { data, error } = await sb
    .from("community_points")
    .select("id,name,category,description,lat,lon,photo_url,user_email,created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    setCommunityStatus("NÃ£o foi possÃ­vel carregar pontos colaborativos (verifique a tabela no Supabase).");
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
        ? `<img src="${item.photo_url}" alt="foto colaboraÃ§Ã£o" style="width:100%;max-width:220px;height:110px;object-fit:cover;border-radius:8px;border:1px solid #dce4ec;margin-top:8px">`
        : "";
      return `<article class="saved-route-item" data-collab-id="${item.id}">
        <h4 class="saved-route-title"><a class="collab-title-link" href="#collab/${item.id}">${item.name || "Ponto colaborativo"}</a></h4>
        <div class="saved-route-meta">${category} â€¢ ${Number(item.lat).toFixed(5)}, ${Number(item.lon).toFixed(5)}</div>
        <div class="saved-route-meta">${item.description || "Sem descricao."}</div>
        <div class="saved-route-meta">Criado em: ${createdAt}</div>
        ${photoTag}
        <div class="saved-route-actions">
          <button type="button" data-action="open-detail">Detalhes</button>
          <button type="button" data-action="open-map">Ver no mapa</button>
          <button type="button" data-action="edit-collab">Editar</button>
          <button type="button" data-action="delete-collab" class="danger" title="Excluir colaboraÃ§Ã£o">&#128465;</button>
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
    setCommunityStatus("NÃ£o foi possÃ­vel carregar suas colaboraÃ§Ãµes.");
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
    setCommunityStatus("ColaboraÃ§Ã£o removida.");
  } catch (error) {
    console.error(error);
    setCommunityStatus("NÃ£o foi possÃ­vel excluir. Verifique a policy de delete no Supabase.");
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
    setCommunityStatus("Supabase nÃ£o configurado para salvar pontos.");
    return;
  }
  const lat = Number(communityLatEl?.value);
  const lon = Number(communityLonEl?.value);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    setCommunityStatus("Defina latitude e longitude vÃ¡lidas.");
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
    setCommunityStatus(isEditing ? "ColaboraÃ§Ã£o atualizada com sucesso." : "Ponto colaborativo salvo com sucesso.");
  } catch (_error) {
    setCommunityStatus("NÃ£o foi possÃ­vel salvar o ponto. Confira a tabela, RLS e bucket no Supabase.");
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
    pendingCommunityCoords = null;
    closeCommunityModal();
    setCommunityPickerMode(true);
    revealMapSection();
    clearDraftMarker();
    setCommunityStatus('Clique no mapa para marcar o ponto. Depois ajuste o alfinete e clique em "Escolher este ponto".');
  });

  useGpsPointBtn?.addEventListener("click", () => {
    if (!navigator.geolocation) {
      setCommunityStatus("Seu navegador nÃ£o liberou GPS.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        map.setView([lat, lon], 12);
        pendingCommunityCoords = { lat: Number(lat), lon: Number(lon) };
        setDraftMarker(lat, lon);
        setCommunityPickerMode(true);
        setCommunityConfirmState(true);
        setCommunityStatus("Ponto marcado por GPS. Clique em 'Escolher este ponto' para continuar.");
      },
      () => setCommunityStatus("NÃ£o consegui ler seu GPS agora. Tente novamente ou clique no mapa."),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  });

  confirmCommunityPointBtn?.addEventListener("click", () => {
    if (!pendingCommunityCoords) {
      setCommunityStatus("Marque um ponto no mapa antes de continuar.");
      return;
    }
    setCommunityPickerMode(false);
    openCommunityModal(Number(pendingCommunityCoords.lat), Number(pendingCommunityCoords.lon));
    setCommunityStatus("Agora preencha os dados do ponto e clique em salvar.");
  });

  map.on("click", (event) => {
    const { lat, lng } = event.latlng;
    if (isAddingCommunityPoint) {
      setDraftMarker(lat, lng);
      pendingCommunityCoords = { lat: Number(lat), lon: Number(lng) };
      setCommunityConfirmState(true);
      setCommunityStatus("Ponto marcado. Se quiser, arraste o alfinete e clique em \"Escolher este ponto\".");
      return;
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
        setCommunityStatus("NÃ£o encontrei a colaboraÃ§Ã£o para editar.");
        return;
      }
      openCommunityModal(Number(item.lat), Number(item.lon), item);
      setCommunityStatus("Edite os campos e salve as alteraÃ§Ãµes.");
      return;
    }

    if (button.dataset.action === "delete-collab") {
      const confirmDelete = confirmNormalized("Deseja excluir esta colaboração?");
      if (!confirmDelete) return;
      await deleteMyCollaboration(collabId);
    }
  });
}

async function generatePlan() {
  warnEl.textContent = "";
  if (planActionsEl) planActionsEl.style.display = "none";
  if (!selectedOrigin) selectedOrigin = await geocodeIfNeeded(originInput.value);
  if (selectedOrigin) await rememberRecentSearch("origin", selectedOrigin);

  const destinationInputs = [dest1Input, dest2Input, dest3Input, dest4Input, dest5Input];
  const destinations = [];
  for (let i = 0; i < destinationInputs.length; i += 1) {
    if (!selectedDestinations[i] && destinationInputs[i].value.trim()) {
      selectedDestinations[i] = await geocodeIfNeeded(destinationInputs[i].value);
    }
    if (selectedDestinations[i]) destinations.push(selectedDestinations[i]);
  }
  await rememberWaypointSearches(destinations);

  if (!selectedOrigin || !destinations.length) {
    warnEl.textContent = "Informe origem e pelo menos um destino vÃ¡lido para calcular a rota.";
    return;
  }

  let stage = "inÃ­cio";
  try {
    const waypoints = [selectedOrigin, ...destinations];
    const finalDestination = waypoints[waypoints.length - 1];
    routeCoords = [];
    let fullDuration = 0;
    const segmentDistanceStepsKm = [];
    const segmentDurationStepsSec = [];
    const forcedBoundaryIndices = [0];
    const waypointNameByRouteIndex = new Map([[0, waypoints[0].name]]);
    const segmentRanges = [];

    for (let i = 0; i < waypoints.length - 1; i += 1) {
      stage = `rota entre ${waypoints[i].name} e ${waypoints[i + 1].name}`;
      const segment = await fetchDrivingRoute(waypoints[i], waypoints[i + 1]);
      const segmentCoords = segment.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
      const segmentRoadName = pickDominantRoadName(segment);
      const startIndex = routeCoords.length ? routeCoords.length - 1 : 0;
      if (!routeCoords.length) routeCoords = segmentCoords;
      else routeCoords = [...routeCoords, ...segmentCoords.slice(1)];
      const endIndex = routeCoords.length - 1;
      segmentRanges.push({
        startIndex,
        endIndex,
        fromName: waypoints[i].name,
        toName: waypoints[i + 1].name,
        roadName: segmentRoadName
      });
      forcedBoundaryIndices.push(routeCoords.length - 1);
      waypointNameByRouteIndex.set(routeCoords.length - 1, waypoints[i + 1].name);
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
    const forcedBoundaryMetrics = forcedBoundaryIndices
      .map((idx) => activeCumulative[Math.max(0, Math.min(idx, activeCumulative.length - 1))] || 0)
      .filter((value) => Number.isFinite(value));

    const minGap = limitMode === "hours" ? 0.08 : 2;
    const waypointBoundaries = [...forcedBoundaryMetrics, 0, totalMetric]
      .map((value) => Math.max(0, Math.min(totalMetric, value)))
      .filter((value) => Number.isFinite(value))
      .sort((a, b) => a - b)
      .reduce((list, value) => {
        if (!list.length || Math.abs(value - list[list.length - 1]) > minGap) list.push(value);
        return list;
      }, []);

    const boundaries = [];
    for (let i = 0; i < waypointBoundaries.length - 1; i += 1) {
      const intervalStart = waypointBoundaries[i];
      const intervalEnd = waypointBoundaries[i + 1];
      if (!boundaries.length || Math.abs(intervalStart - boundaries[boundaries.length - 1]) > minGap) {
        boundaries.push(intervalStart);
      }

      // Each user destination is a real stop/stay, so the next daily target restarts from there.
      let target = intervalStart + dayLimit;
      while (target < intervalEnd - tolerance && boundaries.length < 140) {
        if (target - intervalStart > minGap && intervalEnd - target > minGap) {
          boundaries.push(target);
        }
        target += dayLimit;
      }

      if (Math.abs(intervalEnd - boundaries[boundaries.length - 1]) > minGap) {
        boundaries.push(intervalEnd);
      }
    }
    boundaries.sort((a, b) => a - b);
    if (!boundaries.length || boundaries[0] > minGap) boundaries.unshift(0);
    if (Math.abs(boundaries[boundaries.length - 1] - totalMetric) > minGap) boundaries.push(totalMetric);

    stage = "pontos diÃ¡rios";
    const boundaryPoints = boundaries.map((targetValue) => pointInfoAtTarget(routeCoords, activeCumulative, targetValue));
    stage = "processamento dos pontos";
    const dayMetas = await Promise.all(boundaryPoints.map(async (point, index) => {
      const meta = await resolveStopMeta(point.coord[0], point.coord[1]);
      const forcedLabel = waypointNameByRouteIndex.get(point.index);
      if (forcedLabel) return { ...meta, label: forcedLabel };
      if (index === 0) return { ...meta, label: selectedOrigin.name };
      if (index === boundaryPoints.length - 1) return { ...meta, label: finalDestination.name };
      return meta;
    }));

    stage = "montagem dos dias";
    const days = [];
    for (let i = 1; i < boundaries.length; i += 1) {
      const prevIdx = boundaryPoints[i - 1].index;
      const currIdx = boundaryPoints[i].index;
      const startCoord = boundaryPoints[i - 1].coord;
      const endCoord = boundaryPoints[i].coord;
      const dist = (cumulativeKm[currIdx] || 0) - (cumulativeKm[prevIdx] || 0);
      const duration = (cumulativeHours[currIdx] || 0) - (cumulativeHours[prevIdx] || 0);
      const fromMeta = dayMetas[i - 1];
      const toMeta = dayMetas[i];
      const fromForcedLabel = waypointNameByRouteIndex.get(prevIdx);
      const toForcedLabel = waypointNameByRouteIndex.get(currIdx);
      const fromSeg = findWaypointSegmentForIndex(prevIdx, segmentRanges);
      const toSeg = findWaypointSegmentForIndex(currIdx, segmentRanges);
      const fromLabel = buildStopLabel(fromMeta, fromForcedLabel, fromSeg, "Origem");
      const toLabel = buildStopLabel(toMeta, toForcedLabel, toSeg, "Parada");
      const countryChangedOnEnds = Boolean(
        fromMeta?.countryCode &&
        toMeta?.countryCode &&
        fromMeta.countryCode !== toMeta.countryCode
      );
      let borderCrossing = countryChangedOnEnds;
      let borderText = countryChangedOnEnds
        ? `SaÃ­da de ${COUNTRY_NAMES[fromMeta.countryCode] || fromMeta.countryCode} e entrada em ${COUNTRY_NAMES[toMeta.countryCode] || toMeta.countryCode}.`
        : "";
      let borderCoord = null;
      if (countryChangedOnEnds) {
        const crossing = await withTimeout(
          () => detectCountryTransitionOnSegment(routeCoords, prevIdx, currIdx, fromMeta.countryCode, toMeta.countryCode),
          1200
        );
        if (crossing) {
          borderCoord = crossing.coord;
          borderText = crossing.name
            ? `${crossing.name}: saÃ­da de ${crossing.fromCountry} e entrada em ${crossing.toCountry}.`
            : `SaÃ­da de ${crossing.fromCountry} e entrada em ${crossing.toCountry}.`;
        }
      }
      days.push({
        day: i,
        from: fromLabel,
        to: toLabel,
        km: Math.round(dist),
        hours: duration.toFixed(1),
        startCoord,
        endCoord,
        googleMapsUrl: buildSegmentGoogleMapsUrl(startCoord, endCoord),
        borderCrossing,
        borderText,
        borderCoord
      });
    }

    sumDaysEl.textContent = String(days.length);
    if (daysInputEl && (!hasRequestedDays || Number(daysInputEl.value) !== days.length)) {
      daysInputEl.value = String(days.length);
    }
    daysOutEl.innerHTML = days
      .map(
        (day) => `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} â†’ ${day.to}</b><div class="tiny">${day.km} km â€¢ ${day.hours} h</div><div class="tiny">${sleepByStyle(styleEl.value, day.to)}</div><div class="tiny">Parada prÃ³xima da meta diÃ¡ria (${limitMode === "hours" ? "Â±45min" : "Â±50km"}).</div></article>`
      )
      .join("");
    daysOutEl.innerHTML = days
      .map((day) => {
        const borderHtml = day.borderCrossing
          ? `<div class="tiny" style="margin-top:6px;color:#b42318;font-weight:700">Fronteira/aduana neste dia: ${day.borderText}</div>`
          : "";
        return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} â†’ ${day.to}</b><div class="tiny">${day.km} km â€¢ ${day.hours} h</div><div class="tiny">${sleepByStyle(styleEl.value, day.to)}</div><div class="tiny">Parada prÃ³xima da meta diÃ¡ria (${limitMode === "hours" ? "Â±45min" : "Â±50km"}).</div>${borderHtml}</article>`;
      })
      .join("");

    daysOutEl.innerHTML = renderDaysHtmlEnhanced(days, styleEl.value, limitMode);
    currentPlanSnapshot = {
      id: String(Date.now()),
      createdAt: Date.now(),
      name: normalizeUiText(`${waypoints[0].name} → ${waypoints[waypoints.length - 1].name}`),
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
    currentPlanSnapshot.name = normalizeUiText(`${currentPlanSnapshot.origin} → ${currentPlanSnapshot.destinations[currentPlanSnapshot.destinations.length - 1] || "-"}`);
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
      warnEl.textContent = "Rota gerada. NÃ£o encontrei postos/hotÃ©is/campings prÃ³ximos neste momento.";
    }
  } catch (error) {
    console.error("Erro ao gerar rota:", error);
    if (planActionsEl) planActionsEl.style.display = "none";
    exitRouteFocusMode();
    const detail = error?.message ? ` (${error.message})` : "";
    warnEl.textContent = `NÃ£o foi possÃ­vel calcular a rota agora (etapa: ${stage})${detail}. Tente novamente em alguns segundos.`;
  }
}

genBtn.addEventListener("click", generatePlan);

async function saveCurrentRoute() {
  if (!currentPlanSnapshot) {
    warnEl.textContent = "Gere um roteiro antes de salvar.";
    return;
  }
  const rawSuggestedName = currentPlanSnapshot.name || "Minha rota";
  const suggestedName = repairMojibake(String(rawSuggestedName))
    .replace(/â†’/g, "→")
    .replace(/\s*->\s*/g, " → ")
    .trim();
  const routeName = promptNormalized("Nome para salvar esta rota:", suggestedName);
  if (routeName === null) return;

  const routes = await readSavedRoutes();
  const entry = {
    ...currentPlanSnapshot,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: repairMojibake((routeName || "").trim() || suggestedName)
      .replace(/â†’/g, "→")
      .replace(/\s*->\s*/g, " → ")
      .trim(),
    createdAt: Date.now()
  };
  routes.unshift(entry);
  const synced = await writeSavedRoutes(routes.slice(0, 40));
  await refreshSavedRoutes();
  warnEl.textContent = synced
    ? "Rota salva e sincronizada em Minhas rotas."
    : "Rota salva neste dispositivo. A sincronização com a nuvem será tentada novamente automaticamente.";
  window.location.hash = "#my-routes";
}

saveRouteBtn?.addEventListener("click", saveCurrentRoute);
routeSaveBtn?.addEventListener("click", saveCurrentRoute);
viewRouteBtn?.addEventListener("click", () => {
  if (!currentPlanSnapshot) {
    warnEl.textContent = "Gere uma rota antes de abrir a visualizaÃ§Ã£o.";
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
  hotel: "HotÃ©is",
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
  collabButton.textContent = "ColaboraÃ§Ãµes";
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
  stageBtns.innerHTML = STAGES.map((stage) => `<button class="stbtn ${stage.id === activeStage ? "active" : ""}" data-stage="${stage.id}">${stage.title}<br><small>${stage.km} km â€¢ ${stage.time}</small></button>`).join("");
  const stage = STAGES.find((item) => item.id === activeStage);
  stTitle.textContent = stage.title;
  stSum.textContent = stage.sum;
  stMeta.textContent = `${stage.km} km â€¢ ${stage.time}`;
  stMust.textContent = stage.must.join(" â€¢ ");
  stSleep.textContent = stage.sleep.join(" â€¢ ");
  stTips.textContent = stage.tips.join(" â€¢ ");
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
  "puerto-madryn": "Base para PenÃ­nsula ValdÃ©s, vida selvagem e parada estratÃ©gica antes de seguir ao sul.",
  ushuaia: "Fim do mundo com atraÃ§Ãµes clÃ¡ssicas, trilhas, canal e Ã³tima base para explorar a Terra do Fogo.",
  torres: "Parque incrÃ­vel com paisagens Ãºnicas; fronteiras e clima exigem atenÃ§Ã£o extra no planejamento.",
  calafate: "Base do Perito Moreno, com mini trekking disputado e opÃ§Ãµes de passeio, hospedagem ou wild camping.",
  chalten: "Destino ideal para trekking e mirantes do Fitz Roy, com trilhas clÃ¡ssicas e perfil mais aventureiro.",
  bariloche: "RegiÃ£o de lagos e montanhas com roteiros cÃªnicos, boa estrutura e muitas atividades ao ar livre.",
  "buenos-aires": "Grande etapa urbana da viagem, Ã³tima para descanso, organizaÃ§Ã£o e experiÃªncias culturais."
};

const EBOOK_CHAPTERS = {
  "puerto-madryn": {
    chapter: "CapÃ­tulo Puerto Madryn",
    bestSeason: "Setembro a dezembro",
    highlights: ["PenÃ­nsula ValdÃ©s", "avistagem de fauna marinha", "costeira patagÃ´nica"],
    logistics: ["Boa estrutura urbana para abastecimento", "base para passeios de dia inteiro", "ideal para pausa longa na rota"],
    tips: ["Reserve passeios de fauna com antecedÃªncia", "leve corta-vento para atividades costeiras", "prefira sair cedo para bate-voltas"]
  },
  ushuaia: {
    chapter: "CapÃ­tulo Ushuaia",
    bestSeason: "Novembro a marÃ§o",
    highlights: ["Canal Beagle", "Parque Nacional Tierra del Fuego", "Fim do Mundo"],
    logistics: ["Cidade base com boa rede hoteleira", "ponto final clÃ¡ssico da ida", "Ã³tima para revisÃ£o do carro"],
    tips: ["Verifique previsÃ£o de vento e frio", "reserve navegaÃ§Ã£o no Beagle", "deixe dias extras para clima variÃ¡vel"]
  },
  torres: {
    chapter: "CapÃ­tulo Torres del Paine",
    bestSeason: "Outubro a abril",
    highlights: ["Mirantes das torres", "lagos e trilhas cÃªnicas", "paisagem Ã­cone da PatagÃ´nia chilena"],
    logistics: ["Base comum em Puerto Natales", "controle de documentos de fronteira", "parque com infraestrutura organizada"],
    tips: ["Compre ingressos oficiais antecipadamente", "leve roupa por camadas", "evite dirigir longos trechos noturnos na regiÃ£o"]
  },
  calafate: {
    chapter: "CapÃ­tulo El Calafate",
    bestSeason: "Outubro a marÃ§o",
    highlights: ["Glaciar Perito Moreno", "Lago Argentino", "passeios de glaciar"],
    logistics: ["Hub de hospedagem e serviÃ§os", "base logÃ­stica para glaciares", "boa oferta de mercados e combustÃ­vel"],
    tips: ["Compre ingresso do parque antecipado", "considere passeio de barco no glaciar", "planeje pelo menos 2 noites"]
  },
  chalten: {
    chapter: "CapÃ­tulo El ChaltÃ©n",
    bestSeason: "Novembro a marÃ§o",
    highlights: ["Fitz Roy", "trilhas e mirantes", "vibe de vila de montanha"],
    logistics: ["Base principal para trekking", "acesso por estrada cÃªnica", "estrutura menor que Calafate"],
    tips: ["Saia cedo para trilhas longas", "acompanhe vento e chuva", "leve Ã¡gua e alimentaÃ§Ã£o para os percursos"]
  },
  bariloche: {
    chapter: "CapÃ­tulo Bariloche",
    bestSeason: "Ano todo (neve no inverno, lagos no verÃ£o)",
    highlights: ["Circuito Chico", "Cerro Catedral", "lagos andinos"],
    logistics: ["Cidade com excelente estrutura", "boa etapa de descanso", "ponto forte para atividades ao ar livre"],
    tips: ["Distribua passeios por zonas", "evite horÃ¡rios de pico nas saÃ­das", "reserve com antecedÃªncia em alta temporada"]
  },
  "buenos-aires": {
    chapter: "CapÃ­tulo Buenos Aires",
    bestSeason: "MarÃ§o a maio e setembro a novembro",
    highlights: ["cultura e gastronomia", "bairros clÃ¡ssicos", "etapa urbana da viagem"],
    logistics: ["Entrada e saÃ­da estratÃ©gica no roteiro", "ampla oferta de serviÃ§os", "bom ponto para reorganizar a jornada"],
    tips: ["Planeje estacionamento com antecedÃªncia", "considere hospedagem com garagem", "aproveite para manutenÃ§Ã£o leve e compras"]
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
            <p class="tiny">${poi.city} â€¢ <a href="${poi.maps}" target="_blank" rel="noreferrer">Google Maps</a></p>
            <div class="place-actions">
              <a class="link-btn" href="./local.html?place=${poi.id}">Abrir pÃ¡gina</a>
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
          <span class="badge">capÃ­tulo do e-book</span>
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
          <p class="tiny"><a href="${poi.maps}" target="_blank" rel="noreferrer">Abrir localizaÃ§Ã£o no Google Maps</a></p>
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

tripFormEl?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = tripNameEl?.value.trim();
  if (!name) return;
  const trip = {
    id: String(Date.now()),
    name,
    startDate: tripStartDateEl?.value || "",
    durationDays: Number(tripDurationEl?.value) || "",
    description: tripDescriptionEl?.value.trim() || "",
    createdAt: Date.now(),
    expenses: []
  };
  travelExpenseTrips.unshift(trip);
  selectedExpenseTripId = trip.id;
  await saveTravelExpenseTrips();
  tripFormEl.reset();
});

expenseCurrencyEl?.addEventListener("change", () => {
  const currency = expenseCurrencyEl.value || "BRL";
  if (expenseRateEl) expenseRateEl.value = String(CURRENCY_DEFAULT_RATES[currency] || 1);
});

expenseFormEl?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const trip = travelExpenseTrips.find((item) => item.id === selectedExpenseTripId);
  if (!trip) return;
  const amount = Number(expenseAmountEl?.value);
  const rate = Number(expenseRateEl?.value) || 1;
  if (!Number.isFinite(amount) || amount <= 0) return;
  const expense = {
    id: String(Date.now()),
    category: expenseCategoryEl?.value || "extras",
    payment: expensePaymentEl?.value || "credit",
    amount,
    currency: expenseCurrencyEl?.value || "BRL",
    rate,
    brl: amount * rate,
    date: expenseDateEl?.value || "",
    description: expenseDescriptionEl?.value.trim() || "",
    createdAt: Date.now()
  };
  trip.expenses = [expense, ...(trip.expenses || [])];
  selectedExpenseTripId = trip.id;
  await saveTravelExpenseTrips();
  expenseFormEl.reset();
  if (expenseCurrencyEl) expenseCurrencyEl.value = "BRL";
  if (expenseRateEl) expenseRateEl.value = "1";
  setExpenseFormEnabled(true, trip);
});

tripsListEl?.addEventListener("click", async (event) => {
  const item = event.target.closest("[data-trip-id]");
  if (!item) return;
  const tripId = item.dataset.tripId;
  const button = event.target.closest("button[data-action]");
  if (!button || button.dataset.action === "select-trip") {
    window.location.hash = `#expense-trip/${encodeURIComponent(tripId)}`;
    return;
  }
  if (button.dataset.action === "delete-trip") {
    const confirmDelete = confirmNormalized("Deseja excluir esta viagem e todos os gastos dela?");
    if (!confirmDelete) return;
    travelExpenseTrips = travelExpenseTrips.filter((trip) => trip.id !== tripId);
    if (selectedExpenseTripId === tripId) selectedExpenseTripId = null;
    await saveTravelExpenseTrips();
  }
});

expensesListEl?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action='delete-expense']");
  if (!button) return;
  const item = event.target.closest("[data-trip-id][data-expense-id]");
  if (!item) return;
  const trip = travelExpenseTrips.find((entry) => entry.id === item.dataset.tripId);
  if (!trip) return;
  trip.expenses = (trip.expenses || []).filter((expense) => expense.id !== item.dataset.expenseId);
  await saveTravelExpenseTrips();
});

clearExpenseSelectionBtn?.addEventListener("click", () => {
  selectedExpenseTripId = null;
  renderTravelExpenses();
  if ((window.location.hash || "").startsWith("#expense-trip")) {
    window.location.hash = "#expenses";
  }
});

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
expenseTripBackBtn?.addEventListener("click", () => {
  window.location.hash = "#expenses";
});
campingSearchModeEls.forEach((radio) => {
  radio.addEventListener("change", updateCampingSearchModeUi);
});
campingSearchBtn?.addEventListener("click", runCampingSearch);
campingGpsBtn?.addEventListener("click", () => {
  const gpsRadio = document.querySelector("input[name='campingSearchMode'][value='gps']");
  if (gpsRadio) gpsRadio.checked = true;
  updateCampingSearchModeUi();
  runCampingSearch();
});
campingSearchCityEl?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const cityRadio = document.querySelector("input[name='campingSearchMode'][value='city']");
    if (cityRadio) cityRadio.checked = true;
    updateCampingSearchModeUi();
    runCampingSearch();
  }
});
bindMobileMenu();
updateCampingSearchModeUi();
startTextRepairObserver();
updateRouteFocusHeader(null);
handleSectionVisibilityByHash(window.location.hash || "#home");
flushPendingCloudSync();
setInterval(() => {
  flushPendingCloudSync();
}, 20000);
window.addEventListener("online", () => {
  flushPendingCloudSync();
});
refreshSavedRoutes();
refreshTravelExpenses();
drawPoiMarkers();
setupCommunityUi();

function renderDaysHtml(days = [], style = "fast", limitMode = "km") {
  return days
    .map((day) => {
      const borderHtml = day.borderCrossing
        ? `<div class="tiny" style="margin-top:6px;color:#b42318;font-weight:700">Fronteira/aduana neste dia: ${day.borderText}</div>`
        : "";
      return `<article class="day"><div class="tiny">Dia ${day.day}</div><b>${day.from} â†’ ${day.to}</b><div class="tiny">${day.km} km â€¢ ${day.hours} h</div><div class="tiny">${sleepByStyle(style, day.to)}</div><div class="tiny">Parada prÃ³xima da meta diÃ¡ria (${limitMode === "hours" ? "Â±45min" : "Â±50km"}).</div>${borderHtml}</article>`;
    })
    .join("");
}



