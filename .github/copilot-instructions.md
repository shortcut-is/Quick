# ⚡ Quick - v1.2 — Copilot Instructions

This repository defines the **⚡ Quick - v1.2** Design System (`figma-library-manifest.json`, `DESIGN.md`, `AGENTS.md`, `src/design-tokens/`, `src/components/ui/`).

## 1. Building Screens in Figma (via Figma MCP)
Read `.agents/skills/quick-figma-screens/SKILL.md` and `figma-library-manifest.json` first:
- **Hard Library Lock:** Scope `search_design_system` and cross-file imports strictly to official Team Library `⚡ Quick - v1.2` (`lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd`). NEVER use Community `Quick ⚡ - v1.2` (`lk-c590e7be...`) or reuse `HwLUpu9i41HlBTF7erR5ad` node IDs outside the library source file.
- **Strict Quick-Only & Zero Fallback (`NON-NEGOTIABLE`):**
  - Build every UI control exclusively from imported Quick `INSTANCE` nodes (`62` public components, `18` `_` subcomponents) and semantic Quick variables/styles.
  - Only create transparent Auto Layout layout containers (`fills = []`, or `Surfaces/Background` on the root viewport `Screen`) and section headings/copy bound to Quick `Text Styles` + `Surfaces/Foreground*`.
  - **Forbidden:** `createRectangle`/`createEllipse`/`createPolygon`/`createLine`/`createVector`, styled frames (`strokes`/`cornerRadius`/`fills`) pretending to be UI widgets, `detachInstance()`, silent `defaultVariant` fallbacks, or manually drawing components copied from `src/components/ui/*.tsx`.
  - Match variants order-independently (`split(", ").includes("${k}=${v}")`) and throw if missing. If an import fails or a pattern does not exist in `figma-library-manifest.json` (Figma blocks `appendChild()` inside `INSTANCE` nodes), **STOP and ask the user**.
- **Self-Audit Gate:** Run the **Quick-Only Self-Audit** (`SKILL.md` Section 5: `forbiddenShapesCount === 0`, `suspiciousStyledFrames.length === 0`) and inspect screenshots before replying.

## 2. React + Tailwind CSS v4 (`src/components/ui/`)
- Reuse `src/components/ui/index.ts` (`51` `.tsx` modules), `src/design-tokens/theme.css` semantic variables (zero raw `#hex`), `src/design-tokens/icons.json` (`107` icons), and `src/design-tokens/contracts/*.contract.json` (`72` contracts).
- Enforce 1 `Primary` (or `Destructive`) + 1 `Outline`/`Ghost` CTA hierarchy, `Heebo`/`Zalando Sans`, and responsive clamping/mobile badge stacking (`DESIGN.md` Rule 4).
