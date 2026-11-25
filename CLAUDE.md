# CLAUDE.md — Claude Instructions for ⚡ Quick - v1.2

This repository is the source of truth for **⚡ Quick - v1.2** across two workflows: **creating product screens directly in Figma** (cross-file via Figma MCP) and **building/auditing React + Tailwind CSS v4 code**.

See **[AGENTS.md](AGENTS.md)** and **[DESIGN.md](DESIGN.md)** for full non-negotiable rules.

---

## Choose the Active Mode First

### Mode 1 — Creating Product Screens in Figma (Default when designing screens / flows / mocks)
Use when the user asks to design or update screens, dashboards, mobile apps, modals, or sheets inside **any** target Figma file (`figma.com/design/...`):

1. Read **[.agents/skills/quick-figma-screens/SKILL.md](.agents/skills/quick-figma-screens/SKILL.md)** before writing to Figma.
2. Read **[DESIGN.md](DESIGN.md)** for component decision trees, single-Primary button hierarchy, semantic token rules, touch targets, Light/Dark behavior, and responsive truncation/badge stacking.
3. Read **[figma-library-manifest.json](figma-library-manifest.json)** to get published cross-file keys (`62` public components incl. `Card` `Use=Promo`, `Radio Card`, 16-variant `List Item`, plus `18` `_` subcomponents, icons, variables, `textStyles`, `effectStyles`).
4. **Hard Library Lock:**
   - Official Team Library: **`⚡ Quick - v1.2`** (`libraryKey`: `lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd`).
   - Always pass this `libraryKey` inside `includeLibraryKeys` when calling `search_design_system`.
   - **NEVER import** from Community library `Quick ⚡ - v1.2` (`lk-c590e7be...`) or unrelated org libraries, and **NEVER** reuse local `nodeId`s from `HwLUpu9i41HlBTF7erR5ad` inside external target files.
5. **Strict Quick-Only & Zero Fallback (`NON-NEGOTIABLE`):**
   - Assemble every UI element exclusively from live imported Quick `INSTANCE` nodes (`importComponentSetByKeyAsync` / `importComponentByKeyAsync`) and semantic variables (`Surfaces/*`, `Primary/*`, `Feedback/*`, `spacing/*`, `radius/*`).
   - **Allowed manual nodes ONLY:** transparent Auto Layout structural containers (`Screen` with `Surfaces/Background`, `MainColumn`, `Section`, `Grid`, `Stack`, `Row`) and section heading/copy `TEXT` nodes bound to imported Quick `Text Styles` + `Surfaces/Foreground*`.
   - **Strictly forbidden:** `createRectangle()`, `createEllipse()`, `createPolygon()`, `createLine()`, `createVector()`, custom styled frames (`strokes`/`cornerRadius`/`fills`) pretending to be cards/buttons/badges/inputs/list rows, `detachInstance()`, or rebuilding Figma widgets visually by reading React code in `src/components/ui/*.tsx`.
   - Match variants order-independently with `pickVariant(set, wantedProps)` (`split(", ").includes(...)`) and **throw on mismatch** instead of falling back silently to `set.defaultVariant`.
   - Remember Figma blocks `appendChild()` into `INSTANCE` nodes. If an import fails OR the screen requires a widget/card layout absent from `figma-library-manifest.json`, **STOP immediately and ask the user** (to publish/grant Team Library access, add the component to Quick, or approve a `Slot: Content` placeholder) — never invent fake shapes.
6. **Mandatory Self-Audit & Visual Verification:** Before finishing, run the **Quick-Only Self-Audit** from `SKILL.md` (`quickInstanceCount`, `forbiddenShapesCount === 0`, `suspiciousStyledFrames.length === 0`), verify visually with screenshots (`await node.screenshot()` or `get_screenshot`), and report those exact audit counts to the user.

---

### Mode 2 — Coding or Auditing UI Components (`React` / `Tailwind CSS v4`)
Use when implementing or reviewing frontend code:

1. Read **[AGENTS.md](AGENTS.md)** and **[DESIGN.md](DESIGN.md)**.
2. Consume tokens from **[src/design-tokens/theme.css](src/design-tokens/theme.css)** & **[src/design-tokens/tokens.json](src/design-tokens/tokens.json)** (never raw hex or `Neutral/*` primitives).
3. Use only verified icon names from **[src/design-tokens/icons.json](src/design-tokens/icons.json)** (`107` entries).
4. Consult **[src/design-tokens/contracts/index.json](src/design-tokens/contracts/index.json)** (`72` contracts, `84` nodes across `47` sections) and reuse existing library-independent components exported by **[src/components/ui/index.ts](src/components/ui/index.ts)** (`51` `.tsx` modules).

---

## Shared Non-Negotiable Rules
- **Single Primary Action:** Max `1` `Primary` (or `Destructive`) button paired with `1` `Outline` or `Ghost` button per action footer/group. Never invent a `Secondary` variant.
- **Fonts:** Load and bind **`Heebo`** (`Text/Body/*`, `Text/Heading/xl..2xl`) and **`Zalando Sans`** (`Text/Heading/3xl..6xl`). Never default to `Inter` or `Switzer`.
- **Do not leak local Figma `nodeId`s** into `src/design-tokens/contracts/*.json`.
