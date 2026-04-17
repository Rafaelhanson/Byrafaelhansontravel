# your next trip by Car

Aplicação web em **Next.js + TypeScript + Tailwind + Leaflet** para planejamento de road trip na Patagônia.

## Funcionalidades incluídas

- Home premium com destaque visual.
- Planejador de rota com:
  - origem/destino
  - estilo de viagem
  - dias
  - limite de km/dia
  - divisão por trechos com sugestão de pernoite
- Mapa interativo com rota e marcadores.
- Filtros por categoria e distância da rota.
- Etapas da viagem (6 blocos visuais).
- Destinos com página individual.
- Hospedagem/campings.
- Abastecimento com alertas de trecho crítico.
- Links úteis oficiais.
- Modo guia/e-book com conteúdo técnico.
- Favoritar locais (localStorage).

## Estrutura

- `app/` telas principais
- `components/` UI, planner e mapa
- `data/` dados mockados em JSON tipado
- `lib/` tipos e lógica do planejador

## Como rodar

1. Instale Node.js (versão 20+ recomendada).
2. Instale dependências:

```bash
npm install
```

3. Rode em desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000)

## Próximos passos sugeridos

- Integrar API real de rotas (Mapbox, OpenRouteService ou OSRM dedicado).
- Integrar geocoding real para origem/destino livre.
- Integrar banco real (PostgreSQL/Supabase).
- Exportação de roteiro em PDF.
