# AGENTS.md — AI Agent Instructions for ⚡ Quick - v1.2

This repository is the canonical specification for the **⚡ Quick - v1.2** Design System (cross-file Figma Team Library manifest + independent component contracts + Tailwind CSS design tokens + reusable React UI library).

## Creating Product Screens in Figma (Any Target File)

When asked to design, mock up, or update product screens, flows, dashboards, or mobile views inside Figma (especially in a **new or external target Figma file**):

1. Follow **[.agents/skills/quick-figma-screens/SKILL.md](.agents/skills/quick-figma-screens/SKILL.md)** step by step.
2. Read **[figma-library-manifest.json](figma-library-manifest.json)** (`62` public components, `18` `_` subcomponents, `94` icon/foundation items) to import published assets by **key** (`importComponentSetByKeyAsync`, `importComponentByKeyAsync`, `importVariableByKeyAsync`, `importStyleByKeyAsync`). Never use `HwLUpu9i41HlBTF7erR5ad` local `nodeId`s inside external files.
3. **Mandatory Library Lock:** Filter `search_design_system` with `includeLibraryKeys: ["lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd"]` (official Team Library `⚡ Quick - v1.2`). **NEVER** use the outdated Community template `Quick ⚡ - v1.2` (`lk-c590e7be0b43e4c47aa285910835678469595e363682bac303924c50807844de9528ccb4a5b66d21fb75761433b1af7ed340c0fc63ecbd44495f30e596ba5c1f`).
4. **Strict Quick-Only & Zero Fallback (`NON-NEGOTIABLE`):**
   - Assemble UI exclusively with real imported Quick instances (`Topbar`, `Sidebar Navigation`, `Bottom Navigation`, `Card` incl. `Use=Promo`, `Radio Card`, `List Item`, `Button`, `Badge`, `Input Text`, `Sheet`, `Dialog`, etc.) using order-independent `pickVariant(set, wanted)` matching (`split(", ").includes(...)`).
   - Only create transparent Auto Layout layout containers (`fills = []`, or `Surfaces/Background` on root `Screen`) and section heading/copy `TEXT` nodes bound to Quick `Text Styles` + `Surfaces/Foreground*`.
   - **Never** draw shapes (`createRectangle`/`createEllipse`/`createVector`), styled custom frames imitating UI widgets (`strokes`/`cornerRadius`/`fills`), `detachInstance()`, or visually reconstruct `src/components/ui/*.tsx` components from scratch inside Figma.
   - If an import fails or a widget does not exist in `figma-library-manifest.json` (remember Figma blocks `appendChild()` inside `INSTANCE` nodes), **STOP and ask the user** — never silently draw fake components.
   - Always run the **Quick-Only Self-Audit** (`SKILL.md` Section 5: `forbiddenShapesCount === 0`, `suspiciousStyledFrames.length === 0`) + screenshot check and report the counts to the user.

## Required Reading Order Before Writing or Auditing Code UI

1. **[DESIGN.md](DESIGN.md)** — Mandatory rules: semantic token enforcement, strict single-Primary button hierarchy, component decision trees, typography, radii, mobile touch constraints, and responsive truncation/badge stacking.
2. **[src/design-tokens/theme.css](src/design-tokens/theme.css)** & **[src/design-tokens/tokens.json](src/design-tokens/tokens.json)** — All CSS variables (`--surface-*`, `--primary-*`, `--feedback-*`, `--spacing-*`, `--radius-*`, `--shadow-*`), Light/Dark values, and Tailwind v4 `@theme` mappings.
3. **[src/design-tokens/icons.json](src/design-tokens/icons.json)** — All `107` verified icon names (`Icon/Line / ...`, `Currency / ...`, `Flag / ...`, `Platform=...`). Never use an icon name outside this file.
4. **[src/design-tokens/contracts/index.json](src/design-tokens/contracts/index.json)** (`72` contracts, `84` nodes) & **[src/components/ui/index.ts](src/components/ui/index.ts)** (`51` `.tsx` modules) → open only the specific `[component].contract.json` or component files needed for the task.

## Hard Rules

- **Strict Quick-Only & Zero Fallback:** Inside Figma, never create raw shapes (`RECTANGLE`/`ELLIPSE`/`VECTOR`), custom styled widget frames, or `detachInstance()`, and never fall back silently to `set.defaultVariant` or hand-drawn UI when an asset is missing/unimported — stop and report the gap.
- **No invented variants or props:** Only use the exact variant options and property names listed in each component's `.contract.json`.
- **No raw colors or primitives:** Always consume semantic variables (`var(--surface-background)`, `bg-surface-background`, `Surfaces/Background`), never raw hex values or `Neutral/50..900`.
- **No external UI primitive assumptions:** Components in `src/components/ui/` are library-independent (no `@radix-ui`, `sonner`, or `@tanstack` dependencies), implemented with semantic HTML, WAI-ARIA, and Tailwind CSS.
- **No competing Primary buttons:** Every footer or action pair uses 1 `Primary` (or `Destructive`) button alongside 1 `Outline` or `Ghost` button.

## Figma MCP Integration (When Editing or Auditing the Library Source File)

- Read **[.agents/rules/quick-figma-context.md](.agents/rules/quick-figma-context.md)**, **[design-system-state.json](design-system-state.json)**, and **[figma-library-manifest.json](figma-library-manifest.json)** for verified Figma `fileKey` (`HwLUpu9i41HlBTF7erR5ad`), page IDs, collection keys, and component keys/node IDs.
- Use **[.agents/skills/figma-mcp-ready-audit/SKILL.md](.agents/skills/figma-mcp-ready-audit/SKILL.md)** when auditing Figma components for MCP readiness (`0–100` score).
- Keep Figma node IDs decoupled in `design-system-state.json` and `.agents/rules/quick-figma-context.md` — never expose Figma node IDs inside `src/design-tokens/contracts/*.json`.
