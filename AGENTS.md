# AGENTS.md — AI Agent Instructions for ⚡ Quick - v1.2

This repository is the canonical specification for the **⚡ Quick - v1.2** Design System (independent component contracts + Tailwind CSS design tokens).

## Required Reading Order Before Writing or Auditing UI

1. **[DESIGN.md](DESIGN.md)** — Mandatory rules: semantic token enforcement, strict single-Primary button hierarchy, component decision trees, typography, radii, and mobile touch constraints.
2. **[src/design-tokens/theme.css](src/design-tokens/theme.css)** & **[src/design-tokens/tokens.json](src/design-tokens/tokens.json)** — All CSS variables (`--surface-*`, `--primary-*`, `--feedback-*`, `--spacing-*`, `--radius-*`, `--shadow-*`), Light/Dark values, and Tailwind v4 `@theme` mappings.
3. **[src/design-tokens/icons.json](src/design-tokens/icons.json)** — All `107` verified icon names (`Icon/Line / ...`, `Currency / ...`, `Flag / ...`, `Platform=...`). Never use an icon name outside this file.
4. **[src/design-tokens/contracts/index.json](src/design-tokens/contracts/index.json)** → open only the specific `[component].contract.json` files needed for the task (anatomies, exposed slots, 1:1 Figma ↔ TypeScript prop mappings, bound tokens, `usageGuidelines`, `behaviorRules`).

## Hard Rules

- **No invented variants or props:** Only use the exact variant options and property names listed in each component's `.contract.json`.
- **No raw colors or primitives:** Always consume semantic variables (`var(--surface-background)`, `bg-surface-background`, etc.), never raw hex values or `Neutral/50..900`.
- **No external UI primitive assumptions:** Components are library-independent (no `@radix-ui`, `sonner`, or `@tanstack` dependencies), implemented with semantic HTML, WAI-ARIA, and Tailwind CSS.
- **No competing Primary buttons:** Every footer or action pair uses 1 `Primary` (or `Destructive`) button alongside 1 `Outline` or `Ghost` button.

## Figma MCP Integration (When Editing or Auditing the Figma File)

- Read **[.agents/rules/quick-figma-context.md](.agents/rules/quick-figma-context.md)** and **[design-system-state.json](design-system-state.json)** for verified Figma `fileKey` (`HwLUpu9i41HlBTF7erR5ad`), page IDs, collection IDs, and component node IDs.
- Use **[.agents/skills/figma-mcp-ready-audit/SKILL.md](.agents/skills/figma-mcp-ready-audit/SKILL.md)** when auditing Figma components for MCP readiness (`0–100` score).
- Keep Figma node IDs decoupled in `design-system-state.json` and `.agents/rules/quick-figma-context.md` — never expose Figma node IDs inside `src/design-tokens/contracts/*.json`.
