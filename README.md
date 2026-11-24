# ⚡ Quick - v1.2 — Design System

Especificación oficial y librería publicada de **⚡ Quick - v1.2** para Web (`1440px`) y Mobile (`390px`), preparada tanto para **crear pantallas directamente dentro de Figma** usando cualquier agente de IA (Claude Code, Claude Desktop, Cursor, Antigravity, Codex, Windsurf vía **Figma MCP**) como para construir interfaces en React + Tailwind CSS v4 (`src/components/ui/`).

- **Archivo maestro en Figma:** [⚡ Quick - v1.2](https://www.figma.com/design/HwLUpu9i41HlBTF7erR5ad/%E2%9A%A1-Quick---v1.2?node-id=0-1) (`fileKey`: `HwLUpu9i41HlBTF7erR5ad`, página `⚡️ Components` `0:1`)
- **Team Library oficial en Figma:** `⚡ Quick - v1.2` (`libraryKey`: `lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd`)
- **Manifiesto cross-file:** [`figma-library-manifest.json`](figma-library-manifest.json)

---

## Cómo crear pantallas en Figma con Claude, Cursor, Antigravity u otro agente

Para diseñar pantallas dentro de Figma usando los componentes reales de **⚡ Quick - v1.2** **no necesitas publicar ni instalar ningún paquete `npm`**. El repositorio funciona como cerebro de reglas/contratos y **Figma MCP** le da al agente la capacidad de leer tu librería y crear frames/instancias directamente en tu archivo de Figma.

### Requisitos para cualquier usuario
1. **Acceso a la librería publicada en Figma:** tu cuenta de Figma debe tener acceso a la Team Library **`⚡ Quick - v1.2`** (`HwLUpu9i41HlBTF7erR5ad`) y permisos de edición en el archivo de Figma donde se crearán las pantallas.
2. **Servidor Figma MCP conectado en tu cliente de IA:** activa el MCP oficial de Figma en Claude Code, Claude Desktop, Cursor, Antigravity o Windsurf e inicia sesión con tu cuenta de Figma.
3. **Este repositorio como contexto:** clona el repo en local (o conéctalo en tu Project / workspace).

> **Importante:** En Figma existen librerías homónimas. Usa siempre la Team Library oficial `⚡ Quick - v1.2` (`lk-42ecd438...`) definida en [`figma-library-manifest.json`](figma-library-manifest.json) y **evita** la plantilla antigua de Community `Quick ⚡ - v1.2` (`lk-c590e7be...`).

### Uso en 3 pasos
1. Clona o abre este repositorio en tu editor o cliente de agente:
   ```bash
   git clone https://github.com/shortcut-is/Quick.git
   ```
   - **Claude Code / Projects** lee [`CLAUDE.md`](CLAUDE.md) automáticamente.
   - **Antigravity / Codex / Cursor / Copilot** leen [`AGENTS.md`](AGENTS.md), [`.agents/skills/quick-figma-screens/SKILL.md`](.agents/skills/quick-figma-screens/SKILL.md) y [`.agents/rules/quick-figma-context.md`](.agents/rules/quick-figma-context.md).
2. Comparte con el agente el enlace o `fileKey` de tu archivo destino de Figma (o pídele crear uno nuevo).
3. Envíale un prompt indicando plataforma (**Web 1440px** o **Mobile 390px**), tema (**Light** o **Dark**) y el flujo requerido.

### Prompts de ejemplo listos para copiar

**Para diseñar una pantalla Web (`1440px`):**
> Lee `CLAUDE.md`, `DESIGN.md`, `.agents/skills/quick-figma-screens/SKILL.md` y `figma-library-manifest.json`. En el archivo de Figma `<URL_O_FILEKEY>`, crea una pantalla Web desktop (`1440×900`) en modo Light para gestión de pagos usando únicamente instancias importadas por key de la librería oficial `⚡ Quick - v1.2` (`lk-42ecd438...`): `Sidebar Navigation` (`Expanded`), `Topbar` (`DesktopTabs`), `Search & Filter Bar`, 3 `Card` (`Stat`), `Data Table` y un `Dialog` modal de confirmación con `1 Outline + 1 Primary`. Valida el resultado con screenshot.

**Para diseñar una pantalla Mobile (`390px` en Dark Mode):**
> Siguiendo `.agents/skills/quick-figma-screens/SKILL.md` y `figma-library-manifest.json`, diseña en `<URL_O_FILEKEY>` un flujo móvil de verificación y home (`390×844`) en modo Dark usando `Topbar` (`MobileAppBar`), `Input OTP` (6 dígitos), `Carousel` (`MobilePeek`), `List Item`, `Sheet` (`Bottom (Mobile)`) para filtros y `Bottom Navigation` con 4 tabs. No uses colores hexadecimales crudos ni componentes de Community; verifica visualmente con screenshot.

---

## Arquitectura del Sistema de Componentes

Todos los componentes publicados en `⚡️ Components` (`0:1`) mantienen paridad 1:1 entre Figma y la librería React (`src/components/ui/`):

### 1. Anatomía, Auto Layout y Composición
- **Auto Layout estructural:** Todos los contenedores usan Auto Layout (`HORIZONTAL` o `VERTICAL`) con políticas explícitas (`HUG` o `FILL`), sin `Groups` innecesarios.
- **Nomenclatura semántica:** Capas internas en `PascalCase` o `camelCase` orientadas al DOM (`CardHeader`, `TitleRow`, `CloseButton`, `SheetBody`, `NavTabHome`).
- **Slots y composición modular:**
  - `Slot: Content` actúa como área de contenido libre (`children` en React) dentro de `Card`, `Dialog`, `Collapsible` y `Sheet`.
  - Los componentes compuestos reutilizan primitivas nativas (`Button`, `Badge`, `Avatar`, `Input Text`, `Input Select`, `Switch Standalone`, `Calendar`, `Time Picker`, `Breadcrumb`, `Tab`, `Kbd`, `SEPARATOR`, `OVERLAY`) y `18` subcomponentes internos `_` (`_Calendar Days`, `_TimePicker Elements`, `_Sidebar Item`, `_Bottom Nav Item`, `_OTP Slot`, `_Carousel Dot`, `_Tab Item`, `menu item`, etc.).

### 2. Convención de Propiedades (1:1 Figma ↔ Código)

| Tipo en Figma | Prefijo / Convención | Uso en Figma y Código |
| :--- | :--- | :--- |
| **`VARIANT`** | `Variant`, `Use`, `Size`, `State`, `Position`, `Mode`, `Items`, `Layout` | Ejes estructurales, jerarquía visual, tamaño y estado interactivo. |
| **`BOOLEAN`** | `👁️ ...` | Visibilidad condicional (`hasIcon`, `hasFooter`, `hasDescription`, `hasCloseButton`, `hasActions`, `hasBadge`). |
| **`TEXT`** | `✏️ ...` | Cadenas editables vinculadas al texto (`title`, `description`, `label`, `caption`, `hint`). |
| **`INSTANCE_SWAP`** | `↪️ ...` / `Swap Icon` | Reemplazo tipado de iconos del catálogo en `📦 Styles & Foundations`. |

### 3. Tokens Semánticos, Variables y Estilos
- **Colección `Base`** (`4f381c5feb556a1eef8e6db6e63ddd267aa245c4`):
  - Tipografía (`FontFamily/Primary` = `Heebo`, `FontFamily/Heading` = `Zalando Sans`), `spacing/0-5` .. `spacing/96`, `radius/none` .. `radius/full`, y `breakpoint/sm` .. `breakpoint/2xl`.
- **Colección `Mode`** (`71053f273fa4a58bd3a8436c9ce413b3ce91ed97`, modos **`Light`** y **`Dark`**):
  - Superficies (`Surfaces/Background`, `Surfaces/Muted`, `Surfaces/Foreground`, `Surfaces/Foreground-Muted`, `Surfaces/Border`, `Surfaces/Input`, `Surfaces/Overlay`, `Surfaces/Ring`, `Surfaces/Transparent`, `Surfaces/Invert-*`), `Primary/*` y `Feedback/*` (`Success`, `Warning`, `Danger`, `Info` en normal, `-Bold` y `-Subtle`).
- **Estilos publicados:** **22 Text Styles** (`Text/Body/*`, `Text/Heading/*`) y **5 Effect Styles** (`Shadow/SM`, `Shadow/MD`, `Shadow/LG`, `Shadow/XL`, `Shadow/Focus`).
- **Tokens y código:** [`src/design-tokens/tokens.json`](src/design-tokens/tokens.json) y [`src/design-tokens/theme.css`](src/design-tokens/theme.css) (`95` variables con `Code Syntax (WEB)` alineado para Tailwind CSS v4).

---

## Contratos de Componentes (`src/design-tokens/contracts/`)

El repositorio incluye **71 contratos individuales** (`[componente].contract.json`) junto con [`src/design-tokens/contracts/index.json`](src/design-tokens/contracts/index.json), cubriendo **83 nodos** en **47 secciones** (con los `nodeId`s e identificadores de Figma desacoplados en [`design-system-state.json`](design-system-state.json) y [`figma-library-manifest.json`](figma-library-manifest.json)):

- **Acciones y Formularios:** `button`, `button-group`, `toggle`, `toggle-group`, `input-text`, `input-group` (`Prefix`, `Suffix`, `Password`, `Action`), `input-otp` (`4` / `6` dígitos + `otp-slot`), `input-select`, `input-area`, `combobox` (`Single` / `Multi`), `checkbox`, `checkbox-standalone`, `checkbox-group`, `radio-button`, `radio`, `radio-group`, `switch`, `switch-standalone`, `slider`, `date-picker`, `time-picker`, `calendar`, `file-upload`.
- **Superficies y Overlays:** `card`, `slot-content`, `dialog`, `overlay`, `sheet`, `dropdown-menu` (+ `dropdown-menu-item`, `dropdown-menu-title`), `tooltip`, `command-palette` (`Default`, `Grouped`, `Empty`).
- **Feedback y Contención:** `alert`, `toast`, `notification`, `progress-bar`, `spinner`, `skeleton`, `empty-state`, `accordion`, `collapsible`.
- **Datos y Visualización:** `avatar`, `avatar-group`, `badge`, `tag`, `tag-group`, `kbd`, `list-item`, `separator`, `carousel` (`MobilePeek`, `WebCards`, `HeroBanner` + `carousel-dot`), `data-table` (+ `data-table-header`, `data-table-row`, `data-table-footer`, `data-table-cell`).
- **Navegación y Búsqueda:** `breadcrumb`, `breadcrumb-item`, `pagination`, `segment-control`, `stepper`, `tab`, `tab-item`, `search-filter-bar`, `sidebar-navigation`, `sidebar-item`, `topbar`, `bottom-navigation`, `bottom-nav-item`.

---

## Guía para Desarrollo React (`src/components/ui/`)

Además del uso en Figma, el repositorio implementa **51 componentes `.tsx` reutilizables y libres de primitivas externas** en [`src/components/ui/index.ts`](src/components/ui/index.ts) con un catálogo interactivo Light/Dark y vista previa móvil de `390px` en [`src/App.tsx`](src/App.tsx):

```bash
npm install
npm run dev      # Catálogo interactivo en desarrollo
npm run build    # Verificación TypeScript + bundle Vite en dist/
```

---

## Mapa de Archivos para Agentes

| Archivo / Ruta | Propósito |
| :--- | :--- |
| [`CLAUDE.md`](CLAUDE.md) | Punto de entrada automático para Claude Code / Claude Projects. |
| [`AGENTS.md`](AGENTS.md) | Instrucciones universales (Antigravity, Codex, Cursor, Copilot) para Figma y código. |
| [`DESIGN.md`](DESIGN.md) | Reglas no negociables, jerarquía de botones y árboles de decisión de componentes. |
| [`figma-library-manifest.json`](figma-library-manifest.json) | Keys cross-file publicadas de componentes, subcomponentes, iconos, colecciones, variables y estilos. |
| [`.agents/skills/quick-figma-screens/SKILL.md`](.agents/skills/quick-figma-screens/SKILL.md) | Playbook paso a paso para diseñar pantallas Web y Mobile directamente en Figma con Quick. |
| [`.agents/skills/figma-mcp-ready-audit/SKILL.md`](.agents/skills/figma-mcp-ready-audit/SKILL.md) | Skill para auditar componentes de Figma (`0–100` MCP readiness). |
| [`.agents/rules/quick-figma-context.md`](.agents/rules/quick-figma-context.md) | Contexto de páginas y node IDs internos del archivo maestro `HwLUpu9i41HlBTF7erR5ad`. |
| [`design-system-state.json`](design-system-state.json) | Estado e inventario de IDs del archivo maestro y vínculo al manifiesto. |
| [`src/design-tokens/icons.json`](src/design-tokens/icons.json) | Catálogo de los **107 iconos** verificados (`24×24`). |
