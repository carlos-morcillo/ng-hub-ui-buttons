# ng-hub-ui-buttons Changelog

## [22.10.0] - 2026-09-01

### Added

- **`hubActionsAdapter`**, so a host library can have its row actions drawn with this
  library's button and dropdown without either package depending on the other.

  It is the arrangement `hubFormControlAdapter` already uses for a table's inputs: the
  host describes what a row offers in neutral terms — icons, labels, `disabled`, the
  actions inside a menu — and this maps the description onto the real components. The
  types are declared here and mirror the host's structurally, so nothing is imported
  across the boundary and the application is the only place that knows both exist.

  Register it where the host expects it; for `ng-hub-ui-paginable`:

  ```ts
  providers: [provideHubPaginableActions(hubActionsAdapter)];
  ```

- **`hub-actions-cell`**, the component that adapter creates. Public because creating a
  component is the honest way to assemble `hubDropdown` — it needs a host element and an
  `ng-template`, which is natural in a template and awkward imperatively.

### Fixed

- **Only one dropdown is open at a time, however it was opened.**

  Closing on click-outside already made a second one *usually* replace the first, since
  opening it is itself a click outside the first. Usually is not a guarantee: a dropdown
  opened from code produces no such click — a keyboard shortcut, a menu restored after a
  re-render, a table row opening its own — and both panels stayed up.

- **A click on a row action no longer reaches whatever surrounds it.** Drawn inside a
  clickable row — a table row that opens a detail page — pressing an action navigated
  away, and the action's own effect was lost with the screen it happened on.

## [22.9.4] - 2026-09-01

### Changed

- **The `homepage` in the manifest points at this library's own documentation page** rather than at
  the site root. It is the link a registry shows beside the package and the one a reader clicks from
  it, and landing on a front page they then have to search is a worse answer than landing on the
  reference for the package they were already looking at. Metadata only — no code, no types, no
  styles change, and nothing a consumer imports is affected.

## [22.9.3] - 2026-08-17

### Fixed

- **The published package declared no licence.** An absent `license` field is not neutral — a registry reports it as unlicensed, which legally reads as all rights reserved, the most restrictive state possible rather than the most open. The intent was always MIT; it is now stated in `package.json` and carried in a `LICENSE` file that ships with the package.

## [22.9.2] - 2026-08-08

### Fixed

- Documentation links now point at the canonical localized URLs. The README linked to `https://hubui.dev/<path>` with no locale prefix and no trailing slash, and both forms are 301-redirected, so every reader arriving from npm or GitHub landed on a redirect instead of the canonical page.

## [22.9.1] - 2026-07-26

### Fixed

- Declared the real `ng-hub-ui-utils` peer range: `>=22.7.0`. The library imports `resolveHubAccent` (utils 22.7.0) and the overlay engine; the previous `>=1.0.0` floor resolved to a utils major that lacks those symbols, producing installs that compile but fail at runtime.

## [22.9.0] - 2026-07-07

### Added

- **`hub-btn-theme(...)` mixin** — one-call token theming for `<hub-button>` / `[hubBtn]`: `accent` (drives the role family) plus `border-radius`, `padding-x/-y`, `font-size`. Null-defaulted and additive; the variant-registration mixins (`hub-btn-color-rules`, `hub-fab-color`, `hub-dropdown-*-color`) stay for registering new named accents. `@use 'ng-hub-ui-buttons/styles' as *;`.

### Changed

- **`<hub-button>` / fab / speed-dial / dropdown `[color]` accepts ANY colour.** On top of the built-in semantic accents, the input now also accepts a **registered custom accent** and a **literal colour** (`#ff0000`, `rgb(...)`, `oklch(...)`, a CSS named colour), resolved through the shared `resolveHubAccent` helper (imported from `ng-hub-ui-utils`): a bareword becomes `var(--hub-sys-color-<name>, <name>)`; a literal is used as-is. The single `--hub-<comp>-accent` slot derives the rest of the family, so built-in colours are unchanged.
- **Internal — host bindings moved to the `host` metadata object.** `@HostBinding` / `@HostListener` decorators were replaced by the `host` object in the component/directive metadata (Angular style guide). No public API or behaviour change.

## [22.8.0] - 2026-07-05

### Added

- **Open-set colour API.** `HubSemanticColor` is now `HubSemanticBuiltinColor | (string & {})`: the nine built-in accents (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, and now `neutral`, `light`, `dark` — which the accent loop and the `--hub-sys-color-{neutral,light,dark}` ds tokens already emitted) **plus any custom string**. A product can register a bespoke accent with `hub-btn-color-rules('brand')` (or a bare `--hub-btn-accent` rule) and use `<hub-button color="brand">` with no cast — the button derives the whole role family from the single slot at runtime. The new `HubSemanticBuiltinColor` type is exported for iterating the canonical set.
- **`loading` now fully disables the button.** In addition to the spinner, a loading button reflects `aria-busy="true"` and the native `disabled` attribute, drops out of the tab order (`tabindex="-1"` on the element form) and ignores pointer and keyboard activation — so an in-flight submit cannot fire twice. Previously `loading` only set `pointer-events: none`, leaving keyboard activation and form submission live.
- **Swappable SVG spinner via `--hub-button-spinner`.** The loading glyph is now an SVG exposed as a CSS variable (`--hub-button-spinner`, a `url("data:image/svg+xml,…")` painted through `mask` so it inherits the button's `currentColor`), with `--hub-button-spinner-duration` for the spin speed (and the existing `--hub-button-spinner-size`). Point the token at any SVG to replace the loader — no recompilation. Replaces the previous hard-coded CSS-border spinner. Honours `prefers-reduced-motion` by slowing the spin.
- **Overridable hover / pressed token slots** on the button. Hover is now driven by `--hub-btn-hover-bg` (default `var(--hub-btn-accent-subtle)`), `--hub-btn-hover-border` (default `transparent`) and `--hub-btn-hover-color` (default `var(--hub-btn-accent-emphasis)`); a new pressed family adds `--hub-btn-active-bg` (default `color-mix(in oklch, var(--hub-btn-accent) 70%, var(--hub-sys-color-ink, #212529))`), `--hub-btn-active-border` (default `transparent`) and `--hub-btn-active-color` (default `var(--hub-btn-accent-on)`). Each appearance re-points only the slots it needs, so a consumer can retune a single interaction colour with one CSS variable — no recompilation.
- **`:active` (pressed) state** on every button appearance (`&:active:not([disabled]):not(.hub-btn-disabled)`), reading the new `--hub-btn-active-*` slots. Previously buttons had no pressed feedback.
- **Element-form keyboard accessibility.** The `<hub-button>` element form (which cannot swap its host tag for a native `<button>`) now advertises `role="button"`, a focusable `tabindex` (`0`, or `-1` when inert — disabled or loading), `aria-disabled` while inert, and activates on Enter/Space (`preventDefault` on Space to avoid scrolling). The `[hubButton]` attribute form on a native `<button>`/`<a>` adds none of these bindings, so it stays free of redundant `role`/`tabindex`.

### Changed

- **`hub-btn-variant-rules` mixin** gained `$active-bg` / `$active-border` / `$active-color` parameters and now routes both the `:hover` and `:active` branches through the overridable `--hub-btn-hover-*` / `--hub-btn-active-*` slots. The `$hover-*` parameters now default to `null` (fall back to the host slot defaults). Existing visuals are unchanged.

## [22.7.0] - 2026-07-02

### Added

- **Speed-dial label tokens** `--hub-speed-dial-label-bg` (default `var(--hub-sys-color-ink, #212529)`) and `--hub-speed-dial-label-color` (default `var(--hub-sys-surface-page, #ffffff)`): theme-aware inverted pair for the tooltip-style item label chip.

### Fixed

- **Speed-dial and dropdown no longer crash SSR/prerender with `document is not defined`.** `HubSpeedDialComponent` and `HubDropdownDirective` subscribed to the global `document`'s `keydown` in their constructors (Escape-to-close), which threw a `ReferenceError` on the server and aborted rendering of any page containing them. The listeners now use the injected `DOCUMENT` and are only wired in the browser (`isPlatformBrowser` guard); the dropdown's scroll/click-outside handlers also use the injected `DOCUMENT`.
- **Speed-dial item label rendered inverted when the ds tokens were loaded**: the chip is designed as a dark tooltip-style label, but it consumed `--hub-sys-color-surface-default` / `--hub-sys-text-primary` (white background + dark text with ds loaded). It now consumes the new `--hub-speed-dial-label-bg` / `--hub-speed-dial-label-color` tokens, which resolve to ink-on-surface — dark chip on light themes, light chip on dark themes.
- **Token fallbacks realigned to the ds (ng-hub-ui-ds) light defaults**, so the with-ds and without-ds renders match: `--hub-sys-color-border-subtle` `#e2e8f0` → `#dee2e6`, `--hub-sys-color-text-subtle` `#94a3b8` → `#6c757d`, `--hub-sys-color-surface-subtle` `#f8fafc` → `#f8f9fa`, `--hub-sys-color-surface-default` `#fff` → `#ffffff`, `--hub-sys-shadow-sm` → `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)`, `--hub-sys-shadow-md` → `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`, `--hub-sys-shadow-lg` → `0 1rem 3rem rgba(0, 0, 0, 0.175)`; white fallbacks normalized to the ds spelling `#ffffff`.

### Changed

- **Hardcoded style values now consume ds tokens** (same rendered value, ds-aligned fallback): dropdown panel border width → `var(--hub-ref-border-width, 1px)`, dropdown divider margin → `var(--hub-ref-space-1, 0.25rem)`, speed-dial item gap → `var(--hub-speed-dial-gap, 0.625rem)`, button transition → `var(--hub-sys-transition-fast, all 0.15s ease-in-out)`.

## [22.6.0] - 2026-06-30

### Changed

- **Icons in buttons are projected, not configured.** `<hub-button>` / `[hubButton]` stays icon-library agnostic: project a `<hub-icon>` (or any element) as the button's content. The icon's side follows the markup order (before the label = leading, after = trailing) and the icon/label gap is the `--hub-button-gap` token. No providers or renderer wiring — so there is intentionally **no** `icon` input.

### Removed

- **`iconOnly` input and the forced square layout (`:host(.hub-btn-icon)`)** _(breaking)_. A button now sizes to its content; for an icon-only button, project just the icon and set an `aria-label`. Symmetric padding keeps it visually balanced without a dedicated mode.

## [22.5.0] - 2026-06-30

### Changed

- **`HubBtnComponent` renamed to `HubButtonComponent`.** `HubBtnComponent` is still exported as a deprecated alias, so existing imports keep working.
- **`HubButtonComponent` now has a dual selector `hub-button, [hubButton]`** — the same component works both as an element (`<hub-button>`) and as an attribute on any native host (`<button hubButton>` / `<a hubButton>`). The attribute form now also renders the loading spinner (it is a real component template), which the old directive could not.

### Deprecated

- **`HubBtnDirective`** is removed and replaced by `HubButtonComponent` (which now matches `[hubButton]`). `HubBtnDirective` is still exported as a deprecated alias of `HubButtonComponent` for backward compatibility.

## [22.4.0] - 2026-06-26

### Added

- Local accent slot `--hub-btn-accent` (default `var(--hub-sys-color-primary, #0d6efd)`): the single per-component colour input from which the whole role family is derived.
- Runtime-derived role family from the slot, recomputed live with `color-mix()` / relative colour — no recompilation:
    - `--hub-btn-accent-emphasis` = `color-mix(in oklch, accent 80%, var(--hub-sys-color-ink))` (hover / active).
    - `--hub-btn-accent-subtle` = `color-mix(in oklch, accent 12%, var(--hub-sys-surface-page))` (soft fills).
    - `--hub-btn-accent-on` = grayscale contrast flip of the accent (`oklch(from … clamp(0, (0.62 - l) * 1000, 1) 0 h)`) — the new on-accent contrast pair, replacing the old `--hub-sys-color-{v}-on-default` lookup.
- Open-set theming at runtime: any new accent (e.g. `brand`) works with a single CSS rule that points the slot at a colour — `.hub-btn-brand { --hub-btn-accent: var(--hub-sys-color-brand); }` — and emphasis / subtle / on derive themselves. The open path no longer depends on the `@each` or on recompiling the library.

### Changed

- Canonical `zindex` token names (BREAKING): `--hub-fab-z-index` → `--hub-fab-zindex`, `--hub-dropdown-panel-z-index` → `--hub-dropdown-panel-zindex`, `--hub-speed-dial-z-index` → `--hub-speed-dial-zindex` (no hyphen, matching the `--hub-sys-zindex-*` convention).
- Decoupled appearance from colour: the `solid` / `outline` / `soft` / `ghost` / `link` rules now consume ONLY the local `--hub-btn-accent*` slot family, so they are accent-agnostic and apply to any variant (known or user-registered).
- Known-variant loop expanded from 5 to the 9 canonical accents — `primary, secondary, success, danger, warning, info, neutral, light, dark` — where each class only points `--hub-btn-accent` at its `--hub-sys-color-{variant}`.
- `hub-btn-variant-rules(...)` no longer takes a `$type` argument; its colour defaults now read the local slot family instead of per-type `--hub-sys-color-{type}-*` tokens.
- `hub-btn-color-rules($type)` now registers a variant by setting the local accent slot (one declaration) instead of emitting five appearance blocks.
- Migrated every `color-mix(in srgb, …)` to `in oklch` (soft hover mix and the spinner border).

### Removed

- Per-variant role lookups (`--hub-sys-color-{type}-default` / `-emphasis` / `-subtle` / `-on-default`) from the component and mixins; the local slot now derives these roles, so the library consumes only the accent and the ds-provided `-on` contrast pattern.

## [22.3.1] - 2026-06-25

### Fixed

- Design-token consistency pass: aligned inline fallback defaults with the canonical `ng-hub-ui-ds` values and routed hardcoded literals (z-index, font-weight, line-height, radii and theme-aware colours) through their `--hub-sys-*` / `--hub-ref-*` tokens, so they follow the active theme. No visual change when the ds tokens are loaded.

## [22.3.0] - 2026-06-25

### Changed

- Consolidated every dimension token onto the shared `--hub-ref-*` reference scale, so button / FAB / dropdown sizing resolves through the design-system tokens instead of hand-tuned rem literals (matches the Figma `ff/button`, `ff/dropdown` and `ff/fab` variable layer):
    - Button base: `--hub-button-padding-x` `0.875rem` → `var(--hub-ref-space-3)`, `--hub-button-padding-y` `0.4375rem` → `var(--hub-ref-space-2)`, `--hub-button-gap` `0.375rem` → `var(--hub-ref-space-2)`, `--hub-button-disabled-opacity` `0.55` → `var(--hub-sys-opacity-disabled)`.
    - Button size ramp `sm` / `lg` / `xl` now references `--hub-ref-space-*` and `--hub-ref-font-size-*`.
    - Dropdown: `--hub-dropdown-item-padding-x/y`, the item inner `gap`, `--hub-dropdown-panel-padding-y` and the `dropdown-header` padding/font fall back to `--hub-ref-*`.
    - FAB: `--hub-fab-offset` → `var(--hub-ref-space-3)`, extended-FAB `gap` → `var(--hub-ref-space-2)`.
- Visual note: a few defaults shift to land on the reference scale (button `md` padding 14→16px / 7→8px, gap 6→8px; dropdown item padding 14→16px; disabled opacity 0.55→0.65). Behaviour is unchanged.

## [22.2.1] - 2026-06-23

### Changed

- `btn.component.ts` renamed to `button.component.ts` for naming consistency with the element selector.

## [22.2.0] - 2026-06-23

### Changed

- `HubBtnComponent` selector renamed from `hub-btn` to `hub-button`.
- `HubBtnDirective` selector renamed from `[hubBtn]` to `[hubButton]`.
- CSS custom properties renamed from `--hub-btn-*` to `--hub-button-*` for naming consistency with the element selector.
- `peerDependencies`: `ng-hub-ui-utils` corrected to `>=1.0.0` (published package follows a different versioning scheme, not aligned with Angular major).

## [22.1.0] - 2026-06-23

### Added

- `HubDropdownDirective`: panel closes automatically on scroll to keep it aligned with the trigger
- Public SCSS mixin API at `ng-hub-ui-buttons/styles`: `hub-btn-solid-rules`, `hub-btn-outline-rules`, `hub-btn-soft-rules`, `hub-btn-ghost-rules`, `hub-btn-link-rules`, `hub-btn-color-rules`, `hub-fab-color`, `hub-dropdown-panel-color`, `hub-dropdown-item-color` and their `*-rules` variants — lets third-party developers register custom semantic colors without modifying the library

### Changed

- `HubSpeedDialComponent`: trigger slot renamed from `slot="trigger"` to `hubTrigger` attribute
- `HubSpeedDialItemComponent` and `HubDropdownItemComponent`: `icon` input now expects a CSS class string (e.g. `fa-solid fa-plus`) rendered via `<i [class]="icon()">` instead of raw text content
- All component styles migrated to `:host` selectors for correct Angular Emulated ViewEncapsulation behavior

### Fixed

- `HubFabComponent`: added `ViewEncapsulation.None`; when nested inside `HubSpeedDialComponent` now uses `position: static` instead of `position: fixed`
- Speed-dial position variants now include `align-items` so action items expand flush with the trigger button

## [22.0.0] - 2026-06-17

### Added

- `HubBtnComponent` (`<hub-btn>`) — standalone button component with signal-based inputs: `variant` (solid | outline | soft | ghost | link), `color` (semantic), `size` (sm | md | lg | xl), `iconOnly`, `loading`, `disabled`
- `HubBtnDirective` (`[hubBtn]`) — attribute-style directive exposing identical API for use on native `<button>` and `<a>` elements
- `HubFabComponent` (`<hub-fab>`) — floating action button with 9-position grid (`top-start` … `bottom-end` + `center`), `collapseOnScroll` debounced via passive scroll listener, and CSS logical properties for RTL support
- `HubSpeedDialComponent` (`<hub-speed-dial>`) — expandable FAB menu; exposes `toggle()`, `open()`, `close()` and a two-way `isOpen` model; closes on Escape
- `HubSpeedDialItemComponent` (`<hub-speed-dial-item>`) — individual action item projected inside `HubSpeedDialComponent`
- `HubDropdownDirective` (`[hubDropdown]`) — overlay-based dropdown trigger using `OverlayService` from `ng-hub-ui-utils`; supports `placement`, `trigger` (click | hover), `closeOnSelect`, `offsetY`, `panelClass`; keyboard-close on Escape; exposes `open()`, `close()`, `toggle()` and `isOpen` two-way model
- `HubDropdownPanelComponent` (`<hub-dropdown-panel>`) — styled panel wrapper with optional semantic `color` accent border
- `HubDropdownItemComponent` (`<hub-dropdown-item>`) — menu item with optional `icon`, `selected` indicator, semantic `color`, `disabled` state, and `itemClick` output
- `HubDropdownDividerComponent` (`<hub-dropdown-divider>`) — visual separator with `role="separator"`
- `HubDropdownHeaderComponent` (`<hub-dropdown-header>`) — uppercase group label
- SCSS token system: `:where()` zero-specificity defaults + `@each` semantic color loops for all variants
- CSS logical properties throughout for RTL/LTR compatibility
- Full Vitest unit test suite (40 tests across all components and directives)
