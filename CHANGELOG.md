# ng-hub-ui-buttons Changelog

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
