# Proposta de Redesign Premium — CRM Galego do Tráfego

## Contexto

O CRM atual (WACRM v0.8.0) já possui uma base sólida: sistema de design "Liquid Glass" comokens oklch, dual-axis theming (mode × accent), responsividade completa, internacionalização, e componentes bem estruturados. O objetivo é elevar a experiência visual para um patamar **premium** sem quebrar funcionalidade existente.

---

## Análise do Estado Atual

### O que já existe e funciona bem
- **Sistema Liquid Glass** com 5 camadas (Canvas → Content → Surface → Overlay → Floating)
- **Dual-axis theming**: mode (light/dark) × accent (violet/emerald/cobalt/amber/rose)
- **Tokens oklch** com transparências calibradas
- **Sidebar responsiva** com drawer mobile, nav items com badges, user dropdown
- **Dashboard** com 4 metric cards, charts SVG customizados, pipeline donut, activity feed
- **Component Library**: shadcn/ui completa (24 componentes)
- **i18n** completo via next-intl
- **Acessibilidade**: reduced-motion, reduced-transparency, aria labels

### O que pode ser elevado

| Área | Estado Atual | Oportunidade |
|------|-------------|--------------|
| **Tipografia** | `text-sm`, `text-base`, pesos genéricos | Hierarquia tipográfica com tamanhos e pesos mais expressivos |
| **Espaçamento** | Padding uniforme (`p-5`, `px-4`) | Ritmo espacial mais intencional (8pt grid refinado) |
| **Superfícies** | `surface-content`, `surface-surface` genéricas | Variações contextuais (hero surfaces, nested glass) |
| **Cores** | Neutro monocromático + 1 accent | Gradientes de accent, mais tons semânticos |
| **Animações** | `fade-in`, `slide-up` básicos | Micro-interações com spring physics, stagger |
| **Dashboard** | Grid 4-col linear | Layout com hierarquia visual (hero metric, featured chart) |
| **Sidebar** | Lista simples de links | Seções com labels, agrupamento lógico, hover states mais ricos |
| **Header** | Título + avatar | Command palette (⌘K), breadcrumbs, search |
| **Gráficos** | SVG hand-rolled, cores fixas | Gradientes de preenchimento, animação de entrada, tooltips refinados |
| **Cards** | Bordas + hover sutil | Glass mais expressivo, micro-gradients, inner glow |

---

## Proposta de Redesign

### 1. Tipografia Premium

**O que muda:**
- Títulos de página: `text-2xl` → `text-3xl` com `font-extrabold` e tracking mais apertado
- Subtítulos: `text-sm text-muted-foreground` → `text-base text-muted-foreground/80` com `font-normal`
- Labels de seção: manter `text-xs font-semibold uppercase tracking-wider` (funciona bem)
- Valor das metric cards: `text-[28px]` → `text-3xl` com `font-extrabold` para mais presença
- Nomes de conversa: `text-sm font-medium` → `text-[15px] font-semibold` para mais legibilidade

**Arquivos afetados:**
- `src/app/(dashboard)/dashboard/page.tsx` (título + subtítulo)
- `src/components/dashboard/metric-card.tsx` (valor)
- `src/components/dashboard/conversations-chart.tsx` (headers)
- `src/components/dashboard/pipeline-donut.tsx` (headers)
- `src/components/dashboard/activity-feed.tsx` (headers)
- `src/components/dashboard/response-time-chart.tsx` (headers)
- `src/components/layout/header.tsx` (page title)

### 2. Sidebar Premium — Seções + Visual Hierarchy

**O que muda:**
- Adicionar **labels de seção** na sidebar: "Principal" (Dashboard, Inbox, Notificações), "Gestão" (Contatos, Pipelines, Broadcasts), "Automação" (Automações, Flows, AI Agents)
- Logo row com **gradiente sutil** no background ao invés de flat
- Nav items ativos com **glow sutil** (o `lg-nav-active` já existe, refinamento)
- Sepador entre seções com **label**, não apenas `border-t`
- User section no footer com **card elevado** sutil

**Arquivo principal:** `src/components/layout/sidebar.tsx`

### 3. Dashboard — Layout com Hierarquia Visual

**O que muda:**
- **Hero Metric**: Primeira metric card (Conversas Ativas) ocupa 2 colunas com valor maior e sparkline inline
- **Quick Actions**: Cards com **gradiente de background** sutil no hover (não apenas border)
- **Charts row**: Conversations chart com **area fill gradiente** (não apenas polyline)
- **Pipeline Donut**: Centro com **glow do accent** ao invés de texto plano
- **Activity Feed**: Itens com **avatar/thumbnail** quando disponível, timestamps mais expressivos
- **Grid refinado**: `gap-4` → `gap-5` nos cards, `gap-5` → `gap-6` entre seções

**Arquivos afetados:**
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/components/dashboard/metric-card.tsx`
- `src/components/dashboard/conversations-chart.tsx`
- `src/components/dashboard/pipeline-donut.tsx`
- `src/components/dashboard/quick-actions.tsx`
- `src/components/dashboard/activity-feed.tsx`

### 4. Header — Command Palette + Search

**O que muda:**
- Adicionar **command palette trigger** (⌘K) no header ao lado do avatar
- Breadcrumb sutil abaixo do título da página (ex: "Dashboard > Métricas")
- Avatar com **ring de accent** no hover
- Botão de tema com **tooltip** explicativo

**Arquivo principal:** `src/components/layout/header.tsx`

### 5. Superfícies Glass Refinadas

**O que muda:**
- `surface-content`: Adicionar **inner glow** sutil (`inset 0 0 0 1px oklch(from var(--primary) l c h / 0.03)`)
- Cards de métricas: **gradiente angular** sutil no background (não apenas cor plana)
- Sidebar: **blur mais forte** (`blur(16px)` ao invés de `blur(10px)`)
- Headers de seção: **border-bottom com gradiente** ao invés de cor sólida
- Empty states: **illo/illustration** maior com animação gently bounce

**Arquivo principal:** `src/app/globals.css`

### 6. Gráficos com Visual Premium

**O que muda:**
- ConversationsChart: **area fill com gradiente** (linear de blue-500/20 → transparente)
- ConversationsChart: **curves suavizadas** (catmull-rom ou cubic bezier, não polyline)
- PipelineDonut: **animação de entrada** (stroke-dasharray reveal)
- PipelineDonut: **hover effect** nos segments (scale 1.05 + glow)
- ResponseTimeChart: **gradiente de barras** (bottom→top com accent)
- Tooltips: **glass overlay** com backdrop-blur mais forte

**Arquivos afetados:**
- `src/components/dashboard/conversations-chart.tsx`
- `src/components/dashboard/pipeline-donut.tsx`
- `src/components/dashboard/response-time-chart.tsx`

### 7. Micro-animações e Transições

**O que muda:**
- **Stagger animation** nos metric cards (0ms, 50ms, 100ms, 150ms delay)
- **Hover lift** nos quick action cards (`translateY(-1px)` + shadow-md)
- **Skeleton shimmer** mais elaborado (gradiente animado, não bloco plano)
- **Page transition** com slide-up + fade mais suave
- **Nav item** hover com background expand (scaleX do indicador lateral)

**Arquivos afetados:**
- `src/app/globals.css` (novas animações)
- `src/components/dashboard/metric-card.tsx`
- `src/components/dashboard/quick-actions.tsx`
- `src/components/dashboard/skeleton.tsx`
- `src/components/layout/sidebar.tsx`

### 8. Paleta de Cores Enriquecida

**O que muda:**
- Adicionar **semantic colors** para status:
  - `--success: oklch(0.65 0.18 145)` (verde para positivo)
  - `--warning: oklch(0.75 0.15 65)` (amber para pendente)
  - `--info: oklch(0.6 0.15 250)` (azul para informativo)
- Charts: usar palette expandida ao invés de cores fixas
- **Gradient tokens** para surfaces premium:
  - `--gradient-hero: linear-gradient(135deg, oklch(from var(--primary) l c h / 0.08), oklch(from var(--primary) l c h / 0.02))`

**Arquivo principal:** `src/app/globals.css`

---

## Estratégia de Implementação

### Fase 1: Fundação (tokens + tipografia)
1. Atualizar `globals.css` com novos tokens (semantic colors, gradients, surfaces refinadas)
2. Refinar tipografia em componentes existentes
3. Atualizar animações base

### Fase 2: Shell (sidebar + header)
4. Refinar sidebar com seções e visual hierarchy
5. Adicionar command palette trigger no header

### Fase 3: Dashboard
6. Refinar metric cards (hero layout, stagger, glass premium)
7. Elevar gráficos (area fills, curves, animações)
8. Melhorar quick actions e activity feed

### Fase 4: Polish
9. Micro-interações finais
10. Teste em light/dark mode
11. Teste de responsividade

---

## Verificação

1. **Visual**: Comparar screenshots antes/depois de cada fase
2. **Funcional**: Navegar por todas as rotas, confirmar que nada quebrou
3. **Responsivo**: Testar em mobile (375px), tablet (768px), desktop (1440px)
4. **Temas**: Testar todos os accents (violet, emerald, cobalt, amber, rose) em ambos os modes
5. **A11y**: Verificar contraste, reduced-motion, reduced-transparency
6. **Build**: `npm run build` sem erros
7. **Performance**: Verificar que backdrop-filter não causa lag em componentes com muitos itens
