# Quick v1.2 — Figma Design System Context

Cuando el usuario pida revisar, editar o crear componentes/variables en el Design System **⚡ Quick - v1.2**, usa estas referencias verificadas del archivo en Figma:

- **File Key:** `HwLUpu9i41HlBTF7erR5ad`
- **URL:** `https://www.figma.com/design/HwLUpu9i41HlBTF7erR5ad/%E2%9A%A1-Quick---v1.2?node-id=0-1`
- **Skills obligatorios antes de usar `use_figma`:** `figma-use` (y `figma-generate-library` para componentes/variables, o `figma-generate-design` para pantallas compuestas). Llama a `create_session` al iniciar una nueva conversación antes de leer o editar.

## Páginas principales
- `◈ Cover`: `1:4168`
- `❇️ Start Here`: `2057:14153`
- `⚡️ Components`: `0:1`
- `👁️ Theme Visualizer`: `626:6501`
- `📦 Styles & Foundations`: `2033:13277`
- ` 🖼️ Examples`: `557:6348`
- `🚫 Admin`: `605:18897`

## Colecciones de Variables
- **`Base`** (`VariableCollectionId:173:1192`, modo `Mode` `173:0`):
  - `FontFamily/Primary` (`VariableID:173:1193` = `"Heebo"`)
  - `FontFamily/Heading` (`VariableID:173:1199` = `"Zalando Sans"`)
  - `spacing/0-5` (`2px`), `spacing/1` (`4px`), `spacing/2` (`8px`), `spacing/3` (`12px`), `spacing/4` (`16px`), `spacing/5` (`20px`), `spacing/6` (`24px`), `spacing/8` (`32px`), etc.
  - `radius/none`..`radius/full` (`radius/lg` = `VariableID:2463:4`, `radius/xl` = `VariableID:2463:5`, `radius/2xl` = `VariableID:2463:6`, `radius/3xl` = `VariableID:2353:4`)
  - `breakpoint/sm`..`breakpoint/2xl`
- **`Mode`** (`VariableCollectionId:2154:4967`, modos `Light` `2154:3` / `Dark` `2154:4`):
  - `Surfaces/Background` (`VariableID:2154:4968`), `Surfaces/Muted` (`VariableID:2154:4969`), `Surfaces/Foreground` (`VariableID:2154:4970`), `Surfaces/Foreground-Muted` (`VariableID:2154:4971`), `Surfaces/Border` (`VariableID:2154:4972`), `Surfaces/Input` (`VariableID:2154:4973`), `Surfaces/Overlay` (`VariableID:2154:5687`)
  - `Primary/*`, `Feedback/*`, `Neutral/50..900`, `White`, `Black`

## Text Styles y Effect Styles
- **Text Styles (`Heebo` y `Zalando Sans`):** `Text/Body/{xs,sm,base,lg}/{normal,medium,bold}` y `Text/Heading/{xl,2xl,3xl,4xl,5xl,6xl}/{normal,medium,bold}`
- **Effect Styles:** `Shadow/SM` (`S:fdd505a2d68c734a8b5e5396deb449b389fd7428,`), `Shadow/MD` (`S:e1e4828e20e96310252ed3261711d8c70f2e8aaf,`), `Shadow/LG` (`S:e6bf15a52642fa19b6a1518a5470193182ed63ec,`), `Shadow/XL` (`S:af0a41a54993863ce31c6965bc2b62b4057111ad,`), `Shadow/Focus` (`S:7d9e7e8fef712fad3630cacfb70a6e5c423b2414,`)

## Componentes clave y trabajo reciente
- **Card Section (`2154:5661`, `1440×3852`)**: `Card` `COMPONENT_SET` (`2568:3189`, 24 variants `Use=Default|Media|Stat|Profile|Form|Settings|List|Pricing` × `Size=SM|MD|LG`), `Slot: Content` (`2366:6163`), `Ex.` (`2069:5141`, `1440×1054` con 7 instancias vivas `2579:3636`, `2579:3672`, `2579:3711`, `2579:3751`, `2579:3792`, `2579:3806`, `2579:3817`).
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
- **Lote C completado (`Sheet / Drawer`, `Sidebar Navigation`, `Topbar`, `Bottom Navigation`) + `Calendar` ampliado:**
  - `Sheet` (`2616:3862` en `2616:3584`, `800×1646`, 6 variants `Right (Web)|Bottom (Mobile)` × `Default|Form|Filter`), `Ex.` (`2616:3863`, `800×1140`).
  - `Calendar` (`2154:5660`, `800×2006`): `Calendar` `COMPONENT_SET` (`2617:3999`, 4 variants `Use=Default|Single|Range|Presets`, base `473:3594` movido dentro como `Use=Default`) y `_Calendar Days` (`472:9363`, 6 estados `Default|Anchor|Past Next Day|Disabled|Selected|Range`), `Ex.` (`2069:3782`, `800×998`).
  - `Date Picker` (`2154:5664`): `Date Picker` (`471:9314`, 6 variants `Use=Single|Range|DateTime` × `State=Default|Filled`).
  - `Time Pickers` (`2154:5684`): `Time Picker` (`471:9247`, 4 variants `Format=24h|12h` × `State=Default|Filled`) y `_TimePicker Elements` (`471:9039`, 4 estados `Default|Filled|Active|Error`).
  - `Sidebar Navigation` (`2618:4293`) + `_Sidebar Item` (`2618:4130`, 6 variants `Mode=Expanded|Collapsed` × `State=Default|Hover|Active`) en `2618:4093` (`800×1159`), `Ex.` (`2618:4294`, `800×836`).
  - `Topbar` (`2619:4440`, 3 variants `DesktopBreadcrumb|DesktopTabs|MobileAppBar`) + `_Bottom Nav Item` (`2624:4500`, 3 variants `Default|Hover|Active`) + `Bottom Navigation` (`2619:4479`, 2 variants `4 Tabs|5 Tabs (CTA)` con instancias expuestas de `_Bottom Nav Item`) en `Navigation Bars` (`2619:4309`, `1440×764`), `Ex.` (`2619:4480`, `1440×552`).
- **Badge (`203:979`)**: `Label` text nodes configurados con `WIDTH_AND_HEIGHT` + `HUG` para evitar recortes en instancias anidadas.
- **Helper Tag en `⚡️ Components`:** `.local / tag` (`478:5709`, instancia de ejemplo `2456:4500`, propiedad `"CompContent#2456:0"`).
- **Otros sets clave:** `Button` (`67:19`), `Badge` (`203:979`), `Avatar` (`79:1653`), `Input Text` (`84:3866`), `Input Select` (`88:355`), `Input Area` (`194:1034`), `Notification` (`545:5052`), `Data Table` (`2154:5663`).
- Consulta `README.md` y `design-system-state.json` en la raíz del proyecto para ver el inventario completo y el plan de adaptación Web/Mobile.

