---
name: quick-figma-screens
description: Cross-file playbook for any AI agent (Claude Code, Claude Desktop, Cursor, Antigravity, Codex, Windsurf) to design, build, or update product screens, flows, dashboards, modals, and mobile views inside Figma using the published ⚡ Quick - v1.2 Team Library. Triggers on requests in Spanish or English such as "diseña esta pantalla en Figma con Quick", "crea un flujo móvil en Figma", "build this screen/dashboard in Figma using Quick", "push screen to Figma", or whenever building UI inside a Figma design file.
---
# Quick v1.2 — Cross-File Figma Screen Builder

Build editable, production-quality product screens in **any** target Figma file by importing live component instances, icons, semantic variables, and styles from the published **⚡ Quick - v1.2** Team Library (`libraryKey`: `lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd`).

## Prerequisites & Companion Skills

1. **Target Figma file:** Get the user's Figma URL or `fileKey`. If none exists yet, create one with `create_new_file` (following `figma-create-new-file` if installed).
2. **Session tracking:** Call `create_session(fileKey, description)` before reading or mutating, and reuse the returned `sessionId` across every Figma MCP call.
3. **Companion MCP skills (if installed in your agent runtime):** Always load `figma-use` and `figma-generate-design` before mutating via `use_figma`, and include them in `skillNames`.
4. **Canonical repo specs:** Keep [DESIGN.md](../../../DESIGN.md), [figma-library-manifest.json](../../../figma-library-manifest.json), and needed contracts in `src/design-tokens/contracts/*.contract.json` open before picking variants or properties.

---

## 1. Mandatory Library Lock (Avoid Collision!)

Multiple libraries may appear in the user's Figma org. You **MUST** scope every lookup to the official Team Library only:

- **ALLOWED (`includeLibraryKeys`):**
  `["lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd"]` (`⚡ Quick - v1.2`, `source: "team"`, `sourceFileKey: "HwLUpu9i41HlBTF7erR5ad"`)
- **FORBIDDEN:**
  - Community template **`Quick ⚡ - v1.2`** (`lk-c590e7be0b43e4c47aa285910835678469595e363682bac303924c50807844de9528ccb4a5b66d21fb75761433b1af7ed340c0fc63ecbd44495f30e596ba5c1f`) — outdated, lacks Lote 1 & Lote 2 components and Light/Dark contrast fixes.
  - Other workspace libraries (`Handoff`, `ds-160`, `UI Toolkit`, `Material 3`) unless explicitly requested.
- **Cross-file ID rule:** Never pass local `nodeId`s from `HwLUpu9i41HlBTF7erR5ad` (like `67:19` or `VariableID:2154:4968`) into external files. Always import via `key` from [figma-library-manifest.json](../../../figma-library-manifest.json) (or `search_design_system` filtered by the allowed `libraryKey`).

If the user's Figma account cannot see `⚡ Quick - v1.2` (`get_libraries` does not list it and `importComponentSetByKeyAsync` fails), stop and tell the user they need **Team Library view access** to `⚡ Quick - v1.2` (`HwLUpu9i41HlBTF7erR5ad`) before screens can instantiate library components.

---

## 2. Cross-File Import Recipes (Plugin API via `use_figma`)

Always read exact component keys, variable keys, style keys, and `assetType` (`component_set` vs `component`) from [figma-library-manifest.json](../../../figma-library-manifest.json).

### Import a `COMPONENT_SET` and instantiate an exact variant
```js
const btnSet = await figma.importComponentSetByKeyAsync("<componentSetKey>");
const variant =
  btnSet.findOne(
    (n) => n.type === "COMPONENT" && n.name === "Variant=Primary, Size=MD, Content=Label"
  ) ?? btnSet.defaultVariant;
const btn = variant.createInstance();
parentFrame.appendChild(btn);
```

### Import a standalone `COMPONENT` or verified `Icon` (`24×24`)
```js
const iconComp = await figma.importComponentByKeyAsync("<iconKey>");
const iconInstance = iconComp.createInstance();
```

### Import semantic variables & bind fills / strokes / spacing / radii
Never hardcode hex colors (`#FCFCFC`, `#171717`) or `Neutral/50..900` primitives:
```js
const bgVar = await figma.variables.importVariableByKeyAsync("ac8f4596669d2dc136f9ce936d89a31d4d598573"); // Surfaces/Background
const borderVar = await figma.variables.importVariableByKeyAsync("45f813b40a1c383675ed539b0add9a8eb73e687f"); // Surfaces/Border

frame.fills = [
  figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", bgVar)
];
frame.strokes = [
  figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }, "color", borderVar)
];
frame.strokeWeight = 1;
```

### Set Light or Dark Mode cleanly on a Screen Frame
```js
const bgVar = await figma.variables.importVariableByKeyAsync("ac8f4596669d2dc136f9ce936d89a31d4d598573");
const modeCollection = await figma.variables.getVariableCollectionByIdAsync(bgVar.variableCollectionId);
const targetMode = modeCollection.modes.find((m) => m.name === "Dark"); // or "Light"
if (targetMode) {
  screenFrame.setExplicitVariableModeForCollection(modeCollection, targetMode.modeId);
}
```

### Import Text Styles & Effect Styles
Load both `Heebo` and `Zalando Sans` (matching styles checked via `listAvailableFontsAsync`) before setting characters or applying text styles:
```js
const bodySmMedium = await figma.importStyleByKeyAsync("c645e04b3778b848ae909a1896279fc3f11bd450"); // Text/Body/sm/medium
const focusEffect = await figma.importStyleByKeyAsync("7d9e7e8fef712fad3630cacfb70a6e5c423b2414");  // Shadow/Focus
await textNode.setTextStyleIdAsync(bodySmMedium.id);
await cardNode.setEffectStyleIdAsync(focusEffect.id);
```

---

## 3. Platform Shells (Web vs. Mobile)

Pick the shell **before** assembling sections:

### A. Web Application (`1440 × 900`)
- **Frame setup:** `HORIZONTAL` Auto Layout (`1440×900`, `Surfaces/Background`), left `Sidebar Navigation` (`Mode=Expanded` `248px` or `Collapsed` `72px`), right main column (`VERTICAL`, `FILL` width & height).
- **Main column:** `Topbar` (`Use=DesktopTabs` or `Use=DesktopBreadcrumb`, `FILL` width) → scrollable content body (`VERTICAL`, `padding = spacing/6` `24px`, `itemSpacing = spacing/6` `24px`).
- **Content blocks:** compose with `Card` (`Use=Stat | Form | Default | Pricing`, etc.), `Search & Filter Bar` (`Viewport=Desktop`), `Data Table`, `Pagination`, `Carousel` (`Layout=WebCards | HeroBanner`), and trigger `Dialog` (`Size=SM | MD`, centered over `OVERLAY`) or `Sheet` (`Position=Right (Web)`).

### B. Mobile App (`390 × 844`)
- **Frame setup:** `VERTICAL` Auto Layout (`390×844`, `Surfaces/Background`, `clipsContent = true`).
- **Header:** `Topbar` (`Use=MobileAppBar`, `390×56`, `FILL` width).
- **Scrollable body:** `VERTICAL` Auto Layout (`FILL` width, `FILL` height, `padding = spacing/4` `16px`, `itemSpacing = spacing/4` `16px`).
- **Mobile-first components:**
  - `Search & Filter Bar` (`Viewport=Mobile`)
  - `Carousel` (`Layout=MobilePeek`)
  - `List Item` rows and touch-friendly controls (`>= 48px` tap targets; inputs `>= 16px` `Text/Body/base/normal`)
  - `Sheet` (`Position=Bottom (Mobile)`) for mobile filters/forms (never `Position=Right (Web)` on `390px`)
  - `Stepper` (`Direction=↓ Vertical`) on narrow multi-step flows
- **Footer:** `Bottom Navigation` (`390×68`, `Items=4 Tabs | 5 Tabs (CTA)`, exposed `_Bottom Nav Item` instances with **exactly one** active tab matching the screen).

---

## 4. Design & Construction Rules (From `DESIGN.md`)

1. **Zero invented components:** Do **not** draw rectangles pretending to be buttons, badges, inputs, toggles, or nav bars when a Quick component exists. Only create Auto Layout containers to hold text headings, sections, grids, or `Slot: Content` replacements.
2. **Strict Button Hierarchy:** Max `1` `Primary` (or `Destructive`) button per footer/action pair, accompanied by `1` `Outline` or `Ghost` button. Never invent a `Secondary` variant.
3. **Typography:** Use `Heebo` (`Text/Body/*`, `Text/Heading/xl..2xl`) and `Zalando Sans` (`Text/Heading/3xl..6xl`) only. Never leave `Inter` or `Switzer`.
4. **Property Parity:** Only assign exact `VARIANT`, `BOOLEAN` (`👁️ ...`), `TEXT` (`✏️ ...`), and `INSTANCE_SWAP` property values documented in the component's `src/design-tokens/contracts/[component].contract.json`.
5. **Auto Layout Discipline:** Append child nodes to Auto Layout parents **before** setting `layoutSizingHorizontal = "FILL"` or `layoutSizingVertical = "HUG"`. Never leave `Group` wrappers or broken overlaps.

---

## 5. Mandatory Visual Verification Gate

After assembling each screen (and after any layout fix):
1. Return all created/updated frame IDs from `use_figma`.
2. Capture a visual check (`await screenFrame.screenshot()` or `get_screenshot`).
3. Verify:
   - Zero clipped text, zero zero-width text blocks, and zero overlapping headers/footers.
   - Light/Dark polarity looks clean (test switching `Mode` if building themed pairs).
   - Footer CTAs preserve 1 Primary + 1 Outline/Ghost hierarchy.
4. Remove any temporary discovery instances or placeholder shimmers (`placeholder = false`) before finishing.
