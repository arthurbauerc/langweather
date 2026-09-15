# LangWeather

Protótipo de visualização de áreas de risco de alagamento na zona rural de
Araranguá e Criciúma (SC) — lavouras de arroz irrigado, encostas e vales
rurais historicamente sujeitos a cheias. Mapa interativo (React Leaflet +
OpenStreetMap), filtros de chuva/vento/valetas com risco que escala em tempo
real conforme a intensidade simulada, e sugestões de drenagem — tudo com
dados hipotéticos, 100% offline.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Não há variáveis de ambiente necessárias (`.env.local` vazio) e nenhum serviço
externo é chamado — os dados vêm de `data/mock-regions.json`.

## Build de produção

```bash
npm run build
npm run start
```

## Como o risco funciona

Cada região tem uma leitura base de chuva/vento e um limiar de alagamento
(`flood_threshold_mm` / `wind_threshold_kmh`) definido pelo tipo de terreno.
Os sliders do painel somam uma intensidade simulada a essa leitura base — ao
aumentar a chuva, mais regiões cruzam o limiar e passam a aparecer no mapa
com risco crescente (verde → amarelo → laranja → vermelho); o mesmo vale para
o vento, que revela áreas de vulnerabilidade em uma cor separada.

## Estrutura

- `app/page.tsx` — layout principal (filtros à esquerda, mapa à direita)
- `components/MapView.tsx` — mapa Leaflet, camadas e cálculo de risco derivado
- `components/FilterPanel.tsx` — checkboxes customizados e sliders de intensidade
- `components/WeatherOverlay.tsx` — ícones animados de chuva/vento e círculos de vulnerabilidade
- `components/FloodingHeatmap.tsx` — polígonos irregulares coloridos por nível de risco
- `components/DrainageSuggestions.tsx` — linhas de sugestão de valeta/drenagem
- `components/InfoCard.tsx` — cartão HUD com dados da região sob o cursor
- `components/Checkbox.tsx` / `components/ThemeToggle.tsx` — controles de UI
- `lib/risk.ts` — regras de risco dinâmico (chuva) e vulnerabilidade (vento)
- `data/mock-regions.json` — dados hipotéticos da zona rural de Araranguá/Criciúma
- `types/index.ts` — interfaces TypeScript (`Region`, `FilterState`, `WeatherData`)
