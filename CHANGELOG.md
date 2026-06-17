# ng-hub-ui-buttons Changelog

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
