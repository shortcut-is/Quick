# Quick v1.2 — Figma Design System Context

Cuando el usuario pida revisar, editar o crear componentes/variables en el archivo maestro **⚡ Quick - v1.2**, o crear pantallas de producto en un **archivo nuevo/externo de Figma**, usa estas referencias verificadas:

- **Archivo maestro (`File Key`):** `HwLUpu9i41HlBTF7erR5ad`
- **URL:** `https://www.figma.com/design/HwLUpu9i41HlBTF7erR5ad/%E2%9A%A1-Quick---v1.2?node-id=0-1`
- **Librería publicada oficial (`source: "team"`):**
  - `libraryName`: `⚡ Quick - v1.2`
  - `libraryKey`: `lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd`
  - **Librería PROHIBIDA:** `Quick ⚡ - v1.2` (`lk-c590e7be0b43e4c47aa285910835678469595e363682bac303924c50807844de9528ccb4a5b66d21fb75761433b1af7ed340c0fc63ecbd44495f30e596ba5c1f`, `source: "community"`, plantilla vieja sin Lote 1/2 ni correcciones de contraste).
- **Manifiesto cross-file (`importComponentSetByKeyAsync` / `importVariableByKeyAsync`):** `figma-library-manifest.json` (`62` componentes públicos, `18` subcomponentes `_`, `94` ítems de iconos/foundations, `95` variables, `22` Text Styles, `5` Effect Styles).
- **Skills obligatorios antes de usar `use_figma`:**
  - Para **crear pantallas en Figma**: `.agents/skills/quick-figma-screens/SKILL.md` + `figma-use` + `figma-generate-design`.
  - Para **editar/crear librería**: `figma-use` + `figma-generate-library`.
  - Llama a `create_session` al iniciar una nueva conversación antes de leer o editar.

## Páginas principales
- `◈ Cover`: `1:4168`
- `❇️ Start Here`: `2057:14153`
- `⚡️ Components`: `0:1`
- `👁️ Theme Visualizer`: `626:6501`
- `📦 Styles & Foundations`: `2033:13277`
- ` 🖼️ Examples`: `557:6348`
- `🚫 Admin`: `605:18897`

## Colecciones de Variables
- **`Base`** (`VariableCollectionId:173:1192`, `key`: `4f381c5feb556a1eef8e6db6e63ddd267aa245c4`, modo `Mode` `173:0`):
  - `FontFamily/Primary` (`VariableID:173:1193` = `"Heebo"`)
  - `FontFamily/Heading` (`VariableID:173:1199` = `"Zalando Sans"`)
  - `spacing/0-5` (`2px`), `spacing/1` (`4px`), `spacing/2` (`8px`), `spacing/3` (`12px`), `spacing/4` (`16px`), `spacing/5` (`20px`), `spacing/6` (`24px`), `spacing/8` (`32px`), etc.
  - `radius/none`..`radius/full` (`radius/lg` = `VariableID:2463:4`, `radius/xl` = `VariableID:2463:5`, `radius/2xl` = `VariableID:2463:6`, `radius/3xl` = `VariableID:2353:4`)
  - `breakpoint/sm`..`breakpoint/2xl`
- **`Mode`** (`VariableCollectionId:2154:4967`, `key`: `71053f273fa4a58bd3a8436c9ce413b3ce91ed97`, modos `Light` `2154:3` / `Dark` `2154:4`):
  - `Surfaces/Background` (`VariableID:2154:4968`), `Surfaces/Muted` (`VariableID:2154:4969`), `Surfaces/Foreground` (`VariableID:2154:4970`), `Surfaces/Foreground-Muted` (`VariableID:2154:4971`), `Surfaces/Border` (`VariableID:2154:4972`), `Surfaces/Input` (`VariableID:2154:4973`), `Surfaces/Overlay` (`VariableID:2154:5687`), `Surfaces/Ring` (`VariableID:2705:2`)
  - `Primary/*`, `Feedback/*`, `Neutral/50..900` (solo primitivos), `White`, `Black`

## Text Styles y Effect Styles
- **Text Styles (`Heebo` y `Zalando Sans`):** `Text/Body/{xs,sm,base,lg}/{normal,medium,bold}` y `Text/Heading/{xl,2xl,3xl,4xl,5xl,6xl}/{normal,medium,bold}`
- **Effect Styles:** `Shadow/SM` (`S:fdd505a2d68c734a8b5e5396deb449b389fd7428,`), `Shadow/MD` (`S:e1e4828e20e96310252ed3261711d8c70f2e8aaf,`), `Shadow/LG` (`S:e6bf15a52642fa19b6a1518a5470193182ed63ec,`), `Shadow/XL` (`S:af0a41a54993863ce31c6965bc2b62b4057111ad,`), `Shadow/Focus` (`S:7d9e7e8fef712fad3630cacfb70a6e5c423b2414,`)

## Componentes clave y trabajo reciente
- **Card Section (`2154:5661`, `1440×4154`)**: `Card` `COMPONENT_SET` (`2568:3189`, 27 variants `Use=Default|Media|Stat|Profile|Form|Settings|List|Pricing|Promo` × `Size=SM|MD|LG` + `✏️ Meta`, `👁️ Meta`, `Badge` arriba del título en `Size=SM`, truncado `ENDING` + `maxLines` y `WRAP` en footers/filas KPI), `Slot: Content` (`2366:6163`), `Ex.` (`2069:5141`, `1440×1294` con 10 instancias vivas `2579:3636`, `2579:3672`, `2579:3711`, `2579:3751`, `2579:3792`, `2579:3806`, `2579:3817`, `2739:4502`, `2739:4519`, `2739:4535`).
- **Endurecimiento Responsive (Figma & React):** Todos los componentes clave (`Card`, `List Item`, `Radio Card/Button`, `Alert`, `Toast`, `Notification`, `Empty State`, `Dialog`, `Sheet`, `Topbar`, `Search & Filter Bar`, `Collapsible`, `Accordion`, `Breadcrumb`, `Input Text/Select`, `Combobox`) aplican `FILL` + `ENDING` (`maxLines`), `min-w-0` / `line-clamp` y `WRAP` en filas/footers para adaptarse desde `272px–320px` hasta desktop.
- **Progress Bar Section (`2154:5674`, `800×1220`)**: `Progress Bar` `COMPONENT_SET` (`2583:3503`, 24 variants `Use=Default|Success|Warning|Danger` × `Progress=25%|75%|100%` × `Size=SM|LG`, base `551:5905` preservado), `Ex.` (`2069:6453`, `800×446` en `y=1903`).
- **Lote A completado (`Alert`, `Toast`, `Dialog`, `Dropdown Menu`):**
  - `Alert` `COMPONENT_SET` (`2594:3473`, 4 variants `Neutral|Success|Warning|Danger`, base `550:5204`), `Ex.` (`2069:2818`).
  - `Toast` `COMPONENT_SET` (`2594:3668`, 4 variants `Neutral|Success|Warning|Danger`, base `549:4958`), `Ex.` (`2072:7179`).
  - `Dialog` `COMPONENT_SET` (`2595:3688`, 6 variants `Default|Destructive|Form` × `SM|MD`), `OVERLAY` (`351:2136`), `Ex.` (`351:2137`).
  - `Dropdown Menu` `COMPONENT_SET` (`2596:3739`, 3 variants `Actions|Grouped|Context`), `menu item` (`415:3743`, 5 estados `Default|Hover|Active|Disabled|Destructive`), `menu title` (`417:3912`), `Ex.` (`449:2874`).
- **Lote B completado (`Spinner`, `Skeleton`, `Kbd`, `Avatar Group`, `Empty State`):**
  - `Skeleton & Spinner` (`2604:3401`): `Spinner` (`2604:3430`, 6 variants `SM|MD|LG` × `Default|Muted`), `Skeleton` (`2604:3455`, 5 variants `Text|Heading|Avatar|ListRow|Card`), `Ex.` (`2604:3466`).
  - `Kbd` (`2605:3459` en `2605:3437`, 6 variants `Subtle|Outline|Solid` × `SM|MD`), `Ex.` (`2605:3470`).
  - `Avatar Group` (`2606:3514` en `2606:3456`, 6 variants `SM|MD|LG` × `Stacked|Spaced`) y migración de `Avatar` (`79:1653`) a `Heebo SemiBold`, `Ex.` (`2606:3553`).
  - `Empty State` (`2607:3630` en `2607:3488`, 6 variants `Default|Search|Error` × `SM|MD`), `Ex.` (`2607:3637`).
- **Lote C completado (`Sheet / Drawer`, `Sidebar Navigation`, `Topbar`, `Bottom Navigation`) + `Calendar` limpio:**
  - `Sheet` (`2616:3862` en `2616:3584`, `800×1646`, 6 variants `Right (Web)|Bottom (Mobile)` × `Default|Form|Filter`), `Ex.` (`2616:3863`, `800×1140`).
  - `Calendar` (`2154:5660`, `800×1089`): `Calendar` `COMPONENT_SET` (`2617:3999`, variante única `Use=Default` `473:3594`) y `_Calendar Days` (`472:9363`, 6 estados `Default|Anchor|Past Next Day|Disabled|Selected|Range`).
  - `Date Picker` (`2154:5664`): `Date Picker` (`471:9314`, 6 variants `Use=Single|Range|DateTime` × `State=Default|Filled`).
  - `Time Pickers` (`2154:5684`): `Time Picker` (`471:9247`, 4 variants `Format=24h|12h` × `State=Default|Filled`) y `_TimePicker Elements` (`471:9039`, 4 estados `Default|Filled|Active|Error`).
  - **Tokens, `codeSyntax`, Iconos & Guías de Agentes:** Las 94 variables de Figma tienen `codeSyntax.WEB` (`var(--...)`) y scopes semánticos; el repo incluye `DESIGN.md`, `AGENTS.md`, `src/design-tokens/tokens.json`, `src/design-tokens/theme.css` (Light/Dark + Tailwind v4 `@theme`) y `src/design-tokens/icons.json` (107 iconos).
  - `Sidebar Navigation` (`2618:4293`) + `_Sidebar Item` (`2618:4130`, 6 variants `Mode=Expanded|Collapsed` × `State=Default|Hover|Active`) en `2618:4093` (`800×1159`), `Ex.` (`2618:4294`, `800×836`).
  - `Topbar` (`2619:4440`, 3 variants `DesktopBreadcrumb|DesktopTabs|MobileAppBar`) + `_Bottom Nav Item` (`2624:4500`, 3 variants `Default|Hover|Active`) + `Bottom Navigation` (`2619:4479`, 2 variants `4 Tabs|5 Tabs (CTA)` con instancias expuestas de `_Bottom Nav Item`) en `Navigation Bars` (`2619:4309`, `1440×764`), `Ex.` (`2619:4480`, `1440×552`).
- **Badge (`203:979`)**: `Label` text nodes configurados con `WIDTH_AND_HEIGHT` + `HUG` para evitar recortes en instancias anidadas.
- **Helper Tag en `⚡️ Components`:** `.local / tag` (`478:5709`, instancia de ejemplo `2456:4500`, propiedad `"CompContent#2456:0"`).
- **Lote 1 — Inputs Avanzados & Auth (`2687:*` – `2691:*`):**
  - `Input OTP` (`2687:4140`) + `_OTP Slot` (`2687:4023`) en `2687:4011`, `Ex.` (`2687:4141`).
  - `Input Group` (`2689:4380`) en `2689:4244`, `Ex.` (`2689:4381`).
  - `Combobox` (`2690:4268`) en `2690:4170`, `Ex.` (`2690:4269`).
  - `Command Palette` (`2691:4361`) en `2691:4242`, `Ex.` (`2691:4362`).
- **Lote 2 — Patrones Web & Mobile (`2693:*` – `2694:*`):**
  - `Toggle` (`2693:4362`), `Toggle Group` (`2693:4395`), `Button Group` (`2693:4432`) en `2693:4334`, `Ex.` (`2693:4433`).
  - `Carousel` (`2693:4542`) + `_Carousel Dot` (`2693:4473`) en `2693:4467`, `Ex.` (`2693:4543`).
  - `Collapsible` (`2693:4620`) en `2693:4578`, `Ex.` (`2693:4621`).
  - `Search & Filter Bar` (`2694:4592`) en `2694:4476`, `Ex.` (`2694:4593`).
- **Radio Button & List Item (`2154:5675`, `2154:5671`):**
  - `Radio` (`69:92`, 10 variants `Default|Hover|Focus|Error|Disabled × Off|On`), `Radio Button` (`291:1327`, 20 variants + `✏️ Label` / `✏️ Description`), `Radio Group` (`292:1344` con `👁️ Label`, `✏️ Label`, `👁️ Item 3..5`), `Radio Card` (`2728:4470`, 8 variants `Default|Hover|Focus|Disabled × Off|On` + `👁️ Icon`, `👁️ Description`, `👁️ Meta`), `Ex.` (`2069:6525`).
  - `List Item` (`2731:4584`, 16 variants `Leading=Avatar|Radio|Icon|None × State=Default|Hover|Selected|Disabled` + `👁️ Meta`, `👁️ Trailing Radio`, `👁️ Chevron`, `↪️ Icon`), `Ex.` (`2069:6306`).
- **Otros sets clave:** `Button` (`67:19`), `Badge` (`203:979`), `Avatar` (`79:1653`), `Input Text` (`84:3866`), `Input Select` (`88:355`), `Input Area` (`194:1034`), `Notification` (`545:5052`), `Data Table` (`2154:5663`).
- Consulta `README.md`, `figma-library-manifest.json` y `design-system-state.json` en la raíz del proyecto para ver el inventario completo y las llaves cross-file.

