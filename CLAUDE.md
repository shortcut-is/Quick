# CLAUDE.md — Claude Instructions for ⚡ Quick - v1.2

This repository is the source of truth for **⚡ Quick - v1.2** across two workflows: **creating product screens directly in Figma** (cross-file via Figma MCP) and **building/auditing React + Tailwind CSS v4 code**.

See **[AGENTS.md](AGENTS.md)** and **[DESIGN.md](DESIGN.md)** for full non-negotiable rules.

---

## Choose the Active Mode First

### Mode 1 — Creating Product Screens in Figma (Default when designing screens / flows / mocks)
Use when the user asks to design or update screens, dashboards, mobile apps, modals, or sheets inside **any** target Figma file (`figma.com/design/...`):

1. Read **[.agents/skills/quick-figma-screens/SKILL.md](.agents/skills/quick-figma-screens/SKILL.md)** before writing to Figma.
2. Read **[DESIGN.md](DESIGN.md)** for component decision trees, single-Primary button hierarchy, semantic token rules, touch targets, and Light/Dark behavior.
3. Read **[figma-library-manifest.json](figma-library-manifest.json)** to get published cross-file keys (`libraryKey`, `componentSetKey` / `componentKey`, `variableKey`, `textStyles`, `effectStyles`, `icons`).
4. **Hard Library Lock:**
   - Official Team Library: **`⚡ Quick - v1.2`** (`libraryKey`: `lk-42ecd4388755c0390b485290190fb3fc1d492de52ee02c61e9bc5cb7acb5750104301599e94dd5e75b946f3adcbf31d9f98b9d050ea63b1463a469099278edfd`).
   - Always pass this `libraryKey` inside `includeLibraryKeys` when calling `search_design_system`.
   - **NEVER import** from Community library `Quick ⚡ - v1.2` (`lk-c590e7be...`) or unrelated org libraries, and **NEVER** reuse local `nodeId`s from `HwLUpu9i41HlBTF7erR5ad` inside external target files.
   - Always assemble screens with real library instances (`importComponentSetByKeyAsync` / `importComponentByKeyAsync`) and semantic variables (`Surfaces/*`, `Primary/*`, `Feedback/*`, `spacing/*`, `radius/*`) — never draw raw boxes or hardcode hex colors.
   - Visually inspect completed screens using screenshots (`await node.screenshot()` or `get_screenshot`).

---

### Mode 2 — Coding or Auditing UI Components (`React` / `Tailwind CSS v4`)
Use when implementing or reviewing frontend code:

1. Read **[AGENTS.md](AGENTS.md)** and **[DESIGN.md](DESIGN.md)**.
2. Consume tokens from **[src/design-tokens/theme.css](src/design-tokens/theme.css)** & **[src/design-tokens/tokens.json](src/design-tokens/tokens.json)** (never raw hex or `Neutral/*` primitives).
3. Use only verified icon names from **[src/design-tokens/icons.json](src/design-tokens/icons.json)** (`107` entries).
4. Consult **[src/design-tokens/contracts/index.json](src/design-tokens/contracts/index.json)** (`71` contracts) and reuse existing library-independent components exported by **[src/components/ui/index.ts](src/components/ui/index.ts)** (`51` `.tsx` modules).

---

## Shared Non-Negotiable Rules
- **Single Primary Action:** Max `1` `Primary` (or `Destructive`) button paired with `1` `Outline` or `Ghost` button per action footer/group. Never invent a `Secondary` variant.
- **Fonts:** Load and bind **`Heebo`** (`Text/Body/*`, `Text/Heading/xl..2xl`) and **`Zalando Sans`** (`Text/Heading/3xl..6xl`). Never default to `Inter` or `Switzer`.
- **Do not leak local Figma `nodeId`s** into `src/design-tokens/contracts/*.json`.
