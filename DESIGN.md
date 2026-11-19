# Quick v1.2 — Design System Specification for AI Agents

Quick v1.2 is an independent, Tailwind CSS-standardized UI design system (no `@radix-ui` or external UI kit dependencies; built on semantic HTML, WAI-ARIA, and keyboard interaction). Source of truth lives in:

- [src/design-tokens/theme.css](src/design-tokens/theme.css) — CSS custom properties (`:root` / `.dark`) + Tailwind CSS v4 `@theme` bindings
- [src/design-tokens/tokens.json](src/design-tokens/tokens.json) — resolved Light/Dark colors, spacing, radii, breakpoints, typography, and shadows
- [src/design-tokens/icons.json](src/design-tokens/icons.json) — complete catalog of all 107 verified `24x24` icon names
- [src/design-tokens/contracts/index.json](src/design-tokens/contracts/index.json) — 59 component contracts covering 71 Figma nodes across 39 sections

---

## 1. Non-Negotiable Rules

### Rule 1 — Semantic Tokens Only (Never Raw Hex or Primitives)
UI components **MUST** use semantic tokens from `tokens.json` / `theme.css`. Never use primitive `Neutral/50..900`, `White`, `Black`, or raw `#hex` colors inside components.

| Role | Allowed Token / CSS Variable | Forbidden |
| :--- | :--- | :--- |
| Page / card canvas | `--surface-background` (`Surfaces/Background`) | `#FCFCFC`, `--neutral-50` |
| Subtle pill / well / inactive | `--surface-muted` (`Surfaces/Muted`) | `#E4E4E7`, `--neutral-100` |
| Primary text / active stroke | `--surface-foreground` (`Surfaces/Foreground`) | `#171717`, `--neutral-900` |
| Secondary / helper text | `--surface-foreground-muted` (`Surfaces/Foreground-Muted`) | `#717179`, `--neutral-500` |
| Borders & dividers | `--surface-border` / `--surface-input` | Hardcoded gray borders |
| Primary CTA fill & text | `.bg-primary-gradient` (`--primary-top` → `--primary-bottom`) + `--primary-foreground` | Ad-hoc gradients or hex |
| Status colors | `--feedback-{success,warning,danger,info}{,-bold,-subtle}` | Custom red/green/blue hex |
| Elevation & Focus | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-focus` | Custom `box-shadow` |

### Rule 2 — Strict Button Hierarchy (Max 1 Primary Action per Group)
`Button` variants are **strictly**: `Primary`, `Outline`, `Ghost`, `Destructive`. No `Secondary` or `Link` variant exists.

- **Never place two `Primary` buttons side by side** inside a `Dialog`, `Sheet`, `Card`, `EmptyState`, or `Alert` footer.
- Every action pair **must** combine **1 main action** (`Primary`, or `Destructive` for irreversible deletion) with **1 secondary action** (`Outline` or `Ghost` for `Cancel` / `Reset`).
- When `Content=Icon`, an accessible `aria-label` is mandatory.

```tsx
// Correct — 1 Outline cancel + 1 Primary confirm
<Button variant="Outline" size="SM">Cancel</Button>
<Button variant="Primary" size="SM">Save changes</Button>

// Incorrect — two Primary buttons competing, or invented "secondary" variant
<Button variant="Primary" size="SM">Cancel</Button>
<Button variant="Primary" size="SM">Save changes</Button>
```

### Rule 3 — Typography, Touch Targets & Concentric Radii
- **Font families:** Body and `xl`/`2xl` headings use **`Heebo`** (`--font-primary`); display headings (`3xl`–`6xl`) use **`Zalando Sans`** (`--font-heading`). Never use `Switzer` or arbitrary font sizes; bind strictly to the 22 styles in `tokens.json` (`Text/Body/*`, `Text/Heading/*`).
- **Mobile inputs:** Interactive form controls on touch viewports **must** use at least `16px` (`Text/Body/base/normal`) to prevent iOS auto-zoom.
- **Touch targets:** Interactive mobile controls (`BottomNavigation` items `72×52`, `Topbar` buttons, form rows) must keep hit targets `>= 48×48px` (desktop icon buttons `XS` = `28×28px`, `SM` = `40×40px`, `MD` = `48×48px`, `LG` = `56×56px`).
- **Concentric radii:** Keep inner container radii smaller than their parent (`radius/lg` `8px`, `radius/xl` `12px`, `radius/2xl` `16px`, `radius/3xl` `24px`): `innerRadius <= outerRadius - padding`.
- **Icons:** Only use exact icon names from `src/design-tokens/icons.json` (`107` total; never invent unverified icon names).

---

## 2. Component Decision Trees

### Overlays, Drawers & Feedback
```text
Need to interrupt or inform the user?
 ├── Blocking confirmation, destructive prompt, or short focused form (380px / 460px)
 │    └── Dialog (paired with Overlay; SM = confirmation, MD = form)
 ├── Wide side inspector on Desktop (360px right) or touch bottom drawer on Mobile
 │    └── Sheet (Position="Right (Web)" on Desktop, Position="Bottom (Mobile)" on touch)
 ├── Transient auto-dismissing action result ("Saved", "Copied")
 │    └── Toast
 ├── Persistent in-page status/warning banner inside a form or page flow
 │    └── Alert (use Notification for inbox-style dismissible cards)
 ├── Trigger-anchored command/action list
 │    └── DropdownMenu (never for form field values -> use InputSelect)
 └── Brief hover/focus text hint only (zero interactive elements)
      └── Tooltip
```

### Form Selection & Temporal Controls
```text
Choosing a value in a form?
 ├── Immediate binary setting without pressing Save
 │    └── Switch (or SwitchStandalone when parent row already holds the label)
 ├── Binary agreement or multi-select checklist (0..N items)
 │    └── Checkbox (wrap >= 2 items in CheckboxGroup; CheckboxStandalone in DataTable)
 ├── Mutually exclusive single choice from 2–5 options
 │    ├── Form field with helper descriptions -> RadioButton inside RadioGroup
 │    └── Compact view/scale switcher inside toolbar/card -> SegmentControl
 ├── Single choice from >= 4 options
 │    └── InputSelect (never DropdownMenu)
 └── Date or Time selection
      ├── Compact input trigger (`Single`, `Range`, `DateTime`) -> DatePicker
      ├── Full monthly calendar grid (`Default`) -> Calendar (with `_Calendar Days` 6 states)
      └── Structured numeric time (`24h` HH:MM:SS or `12h` HH:MM AM/PM) -> TimePicker
```

### Navigation & Labels
```text
Navigating views or displaying compact status?
 ├── Application navigation
 │    ├── Desktop (>= 768px) -> SidebarNavigation (248px Expanded / 72px Collapsed) + Topbar (`DesktopBreadcrumb` | `DesktopTabs`)
 │    ├── Mobile (< 768px) -> Topbar (`MobileAppBar` 390x56) + BottomNavigation (`4 Tabs` | `5 Tabs (CTA)`, 390x68) + Sheet for overflow nav
 │    ├── In-page sibling views -> Tab (`role="tablist"`)
 │    ├── Hierarchical parent path (>= 3 levels) -> Breadcrumb
 │    └── Sequential multi-step flow -> Stepper (`Horizontal` Desktop / `Vertical` Mobile)
 └── Compact metadata / chips
      ├── Read-only status pill or count -> Badge
      ├── User-removable filter chip -> Tag / TagGroup (`Dismissible="Yes"`)
      └── Keyboard shortcut keycap -> Kbd (`Subtle` | `Outline` | `Solid`)
```

---

## 3. Code Examples

```tsx
// Correct — semantic Card footer pairing Outline + Primary + valid Quick tokens
<Card variant="Form" size="MD">
  <CardHeader>
    <CardTitle className="text-heading-xl-bold">Workspace Settings</CardTitle>
    <CardDescription className="text-body-sm-normal text-surface-foreground-muted">
      Changes take effect immediately across your team.
    </CardDescription>
  </CardHeader>
  <CardContent className="gap-4">
    <InputText label="Workspace name" value="Quick Design" />
  </CardContent>
  <CardFooter className="gap-2 justify-end">
    <Button variant="Outline" size="SM">Cancel</Button>
    <Button variant="Primary" size="SM">Save</Button>
  </CardFooter>
</Card>

// Incorrect — raw hex color, nonexistent Secondary variant, unverified icon
<div style={{ background: "#FCFCFC" }}>
  <Button variant="Secondary" icon="Icon/Line / Rocket">Go</Button>
</div>
```
