# ⚡ Quick - v1.2 — Design System

Documentación técnica del Design System **⚡ Quick - v1.2** para Web y Mobile, diseñada tanto para equipos de diseño/desarrollo como para su consumo directo por agentes de IA a través de **Figma MCP** (Google Antigravity, Cursor u otros clientes compatibles).

- **Archivo Figma:** [⚡ Quick - v1.2](https://www.figma.com/design/HwLUpu9i41HlBTF7erR5ad/%E2%9A%A1-Quick---v1.2?node-id=0-1)
- **File Key:** `HwLUpu9i41HlBTF7erR5ad`
- **Página principal de componentes:** `⚡️ Components` (`0:1`)

---

## Arquitectura del Sistema de Componentes

Todos los componentes publicados en `⚡️ Components` (`0:1`) siguen una estructura estándar pensada para mantener paridad 1:1 entre Figma y código (`@/components/ui/...`):

### 1. Anatomía, Auto Layout y Composición
- **Auto Layout estructural:** Todos los contenedores usan Auto Layout (`HORIZONTAL` o `VERTICAL`) con políticas explícitas de dimensionamiento (`HUG` o `FILL`), evitando grupos arbitrarios o posicionamiento absoluto injustificado.
- **Nomenclatura semántica:** Las capas internas están nombradas en `PascalCase` o `camelCase` orientadas al DOM (`CardHeader`, `TitleRow`, `CloseButton`, `SheetBody`, `NavTabHome`).
- **Slots y composición modular:**
  - `Slot: Content` (`2366:6163`) funciona como área de contenido libre (`children` en React) dentro de `Card`, `Dialog` y `Sheet`.
  - Los componentes compuestos reutilizan primitivas nativas del sistema (`Button`, `Badge`, `Avatar`, `Input Text`, `Input Select`, `Switch Standalone`, `Calendar`, `Time Picker`, `Breadcrumb`, `Tab`, `Kbd`, `SEPARATOR`, `OVERLAY`) y subcomponentes internos (`_Calendar Days`, `_TimePicker Elements`, `_Sidebar Item`, `_Bottom Nav Item`, `_Tab Item`, `menu item`, etc.).
  - En componentes contenedores con ítems configurables (como `Bottom Navigation`), las instancias internas están expuestas (`isExposedInstance`) para controlar de forma independiente el estado (`Default`, `Hover`, `Active`), icono y etiqueta de cada pestaña.

### 2. Convención de Propiedades (1:1 Figma ↔ Código)
Las *Component Properties* en Figma mapean directamente a props tipadas en React/TypeScript:

| Tipo en Figma | Prefijo / Convención | Uso en Figma y Código |
| :--- | :--- | :--- |
| **`VARIANT`** | `Variant`, `Use`, `Size`, `State`, `Position`, `Mode`, `Items` | Ejes estructurales, jerarquía visual, tamaño y estado interactivo (`"Default" \| "Hover" \| "Focus" \| "Disabled"`). |
| **`BOOLEAN`** | `👁️ ...` | Visibilidad condicional de subelementos (`hasIcon`, `hasFooter`, `hasDescription`, `hasCloseButton`, `hasActions`, `hasBadge`). |
| **`TEXT`** | `✏️ ...` | Cadenas editables vinculadas al texto de capas específicas (`title`, `description`, `label`, `caption`, `hint`). |
| **`INSTANCE_SWAP`** | `↪️ ...` / `Swap Icon` | Reemplazo tipado de iconos (`Icon/Line/*` en `📦 Styles & Foundations` `2033:13277`). |

### 3. Tokens Semánticos y Temas
Ningún componente nuevo depende de colores hexadecimales crudos ni espaciados sueltos:

- **Colección `Base`** (`VariableCollectionId:173:1192`):
  - **Tipografía:** `FontFamily/Primary` (`Heebo`) y `FontFamily/Heading` (`Zalando Sans`).
  - **Espaciado y Radios:** escalas `spacing/0-5` .. `spacing/8` y `radius/none` .. `radius/full`.
  - **Breakpoints:** tokens `breakpoint/sm` .. `breakpoint/2xl`.
- **Colección `Mode`** (`VariableCollectionId:2154:4967`, modos **`Light`** y **`Dark`**):
  - **Superficies:** `Surfaces/Background`, `Surfaces/Muted`, `Surfaces/Foreground`, `Surfaces/Foreground-Muted`, `Surfaces/Border`, `Surfaces/Input`, `Surfaces/Overlay`, `Surfaces/Invert-Background`, `Surfaces/Invert-Foreground`.
  - **Marca y Estados:** `Primary/Top`, `Primary/Bottom`, `Primary/Foreground` y `Feedback/*` (`Success`, `Warning`, `Danger`, `Info` en variantes normal, `-Bold` y `-Subtle`).
- **Text Styles & Effect Styles:** `Text/Body/*`, `Text/Heading/*`, `Shadow/SM`, `Shadow/MD`, `Shadow/LG`, `Shadow/XL` y `Shadow/Focus`.

### 4. Comportamiento Web y Mobile
- **Superficies emergentes:** `Dialog` para confirmaciones, advertencias destructivas o formularios modales centrados (y para controles flotantes que requieran confirmación); `Sheet` (`Position=Right (Web)`) para paneles laterales de escritorio y `Sheet` (`Position=Bottom (Mobile)`) con *drag handle* superior y acciones a ancho completo en dispositivos táctiles; **`Date & Time Picker`** (`SingleCalendar`, `DateRange`, `PresetCalendar`, `DateAndTime`, `TimePicker12h`, `TimePicker24h`) para paneles anclados de calendario, rangos y selección horaria.
- **Navegación adaptativa:** `Sidebar Navigation` (`Expanded` `248px` / `Collapsed` `72px`) + `Topbar` (`DesktopBreadcrumb` / `DesktopTabs`) en escritorio, y `Topbar` (`MobileAppBar` `390px`) + `Bottom Navigation` (`390×68px`) en móviles.

---

## Contratos de Componentes (`src/design-tokens/contracts/`)

El repositorio incluye **60 contratos individuales** (`[componente].contract.json`) junto con el manifiesto maestro [`src/design-tokens/contracts/index.json`](src/design-tokens/contracts/index.json), cubriendo los **72 nodos publicados** en las **40 secciones** de `⚡️ Components` (`0:1`).

Cada archivo `.contract.json` funciona como especificación fuente para generación de código, pruebas o validación:
- **`name` / `figmaName` / `section` / `category`:** Identidad del componente en código y su sección dentro del sistema (los IDs de nodo de Figma se mantienen desacoplados en `design-system-state.json` y `.agents/rules/quick-figma-context.md`).
- **`importPath`:** Ruta estándar en código (`@/components/ui/...`).
- **`anatomy`:** Nodo raíz, lista de `slots` e instancias internas, y árbol real de capas (`layers`).
- **`variants` & `properties`:** Ejes de variantes y tabla 1:1 entre `propertyName` (nombre limpio en Figma), `codePropName` (`camelCase`), `type`, `tsType`, `defaultValue` y `boundLayers`.
- **`tokens`:** Variables semánticas directas (`directVariables`), heredadas de subcomponentes (`inheritedFromSubcomponents`), `textStyles` y `effectStyles`.
- **`subcomponents`, `usageGuidelines` y `behaviorRules`:** Subcomponentes internos relacionados, criterios explícitos de cuándo usar y cuándo no usar cada componente (`whenToUse` / `whenNotToUse` con alternativas dentro del sistema) y reglas de accesibilidad (ARIA, gestión de foco, teclado), estados y comportamiento responsivo.

Categorías disponibles en [`index.json`](src/design-tokens/contracts/index.json):
- **Acciones y Formularios:** `button`, `input-text`, `input-select`, `input-area`, `checkbox`, `checkbox-standalone`, `checkbox-group`, `radio-button`, `radio`, `radio-group`, `switch`, `switch-standalone`, `slider`, `date-picker` (6 variantes `Single`/`Range`/`DateTime` × `Default`/`Filled`), `time-picker` (4 variantes `24h`/`12h` × `Default`/`Filled` + `_TimePicker Elements`), `calendar` (`Calendar` + 6 estados de `_Calendar Days` incluyendo `Range`), `date-time-picker` (`SingleCalendar`, `DateRange`, `PresetCalendar`, `DateAndTime`, `TimePicker12h`, `TimePicker24h`), `file-upload`.
- **Superficies y Overlays:** `card`, `slot-content`, `dialog`, `overlay`, `sheet`, `dropdown-menu`, `dropdown-menu-item`, `dropdown-menu-title`, `tooltip`.
- **Feedback:** `alert`, `toast`, `notification`, `progress-bar`, `spinner`, `skeleton`, `empty-state`.
- **Datos y Layout:** `accordion`, `avatar`, `avatar-group`, `badge`, `tag`, `tag-group`, `kbd`, `list-item`, `separator`, `data-table` (+ `data-table-header`, `data-table-row`, `data-table-footer`, `data-table-cell`).
- **Navegación:** `breadcrumb`, `breadcrumb-item`, `pagination`, `segment-control`, `stepper`, `tab`, `tab-item`, `sidebar-navigation`, `sidebar-item`, `topbar`, `bottom-navigation`, `bottom-nav-item`.

---

## Skills y Contexto para Agentes de IA (`.agents/`)

Este repositorio está configurado para que **cualquier agente de IA** capaz de leer archivos locales y conectarse a Figma vía MCP opere con contexto completo, nomenclatura consistente y sin inventar tokens o componentes fuera del sistema:

### 1. Skill de Auditoría MCP-Ready
- **Archivo:** [`.agents/skills/figma-mcp-ready-audit/SKILL.md`](.agents/skills/figma-mcp-ready-audit/SKILL.md)
- **Nombre:** `figma-mcp-ready-audit`
- **Propósito:** Auditar componentes, árboles JSON de Figma MCP o sistemas completos para asegurar que cualquier LLM pueda generar código limpio y fiel al diseño. Evalúa **4 pilares** (25 puntos c/u, puntaje `0–100`):
  1. **Higiene del Árbol de Capas y Auto Layout:** 100% contenedores con Auto Layout, cero `Groups` innecesarios, nombres `PascalCase`/`camelCase` orientados al DOM y uso correcto de `Hug` / `Fill`.
  2. **Mapeo Estricto de Props y Variantes (1:1):** Coincidencia exacta con props en código (`camelCase`), booleans en lugar de variantes redundantes y opciones semánticas.
  3. **Tokens Semánticos vs. Valores Hardcodeados:** Todas las propiedades de color, espaciado, radio y tipografía vinculadas a Variables y Estilos de Figma.
  4. **Component Description como Micro-Prompt Técnico:** Validación y redacción de la descripción nativa en Figma con ruta `@/components/ui/...`, reglas de accesibilidad/estado y restricciones de uso.

### 2. Regla Persistente de Contexto Figma
- **Archivo:** [`.agents/rules/quick-figma-context.md`](.agents/rules/quick-figma-context.md)
- **Propósito:** Instrucciones siempre disponibles para el agente con el `fileKey`, URL, mapa de páginas (`0:1`, `2033:13277`, `557:6348`, etc.), IDs verificados de colecciones (`Base` / `Mode`), variables, estilos de texto/efectos y referencia a los nodos maestros de cada componente.

### 3. Estado y Contratos Machine-Readable
- **`design-system-state.json`** en la raíz del proyecto: índice rápido de IDs de páginas, colecciones, variables clave y nodos de referencia del archivo Figma.
- **`src/design-tokens/contracts/`**: fuente estructurada en JSON con anatomía, props 1:1, tokens y reglas de comportamiento listas para usar al generar componentes UI en código.
