# ng-hub-ui-buttons

[Español](./README.es.md) | **English**

[![NPM Version](https://img.shields.io/npm/v/ng-hub-ui-buttons.svg)](https://www.npmjs.com/package/ng-hub-ui-buttons)
[![Angular](https://img.shields.io/badge/Angular-22-red.svg)](https://angular.dev)
[![License](https://img.shields.io/npm/l/ng-hub-ui-buttons.svg)](LICENSE)

Complete Angular 22 button system — standard buttons, FAB, speed dial and overlay dropdown — fully signal-based, zero external dependencies beyond `ng-hub-ui-utils`.

## Documentation and Live Examples

This package is part of [Hub UI](https://hubui.dev/), a collection of Angular component libraries for standalone apps.

- Docs: https://hubui.dev/buttons/overview/
- Live examples: https://hubui.dev/buttons/examples/
- Hub UI: https://hubui.dev/

## Library Family `ng-hub-ui`

This library is part of the **ng-hub-ui** ecosystem:

- [**ng-hub-ui-action-sheet**](https://www.npmjs.com/package/ng-hub-ui-action-sheet)
- [**ng-hub-ui-avatar**](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [**ng-hub-ui-board**](https://www.npmjs.com/package/ng-hub-ui-board)
- [**ng-hub-ui-breadcrumbs**](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [**ng-hub-ui-buttons**](https://www.npmjs.com/package/ng-hub-ui-buttons) ← You are here
- [**ng-hub-ui-calendar**](https://www.npmjs.com/package/ng-hub-ui-calendar)
- [**ng-hub-ui-dropdown**](https://www.npmjs.com/package/ng-hub-ui-dropdown) _(deprecated — use ng-hub-ui-buttons)_
- [**ng-hub-ui-forms**](https://www.npmjs.com/package/ng-hub-ui-forms)
- [**ng-hub-ui-modal**](https://www.npmjs.com/package/ng-hub-ui-modal)
- [**ng-hub-ui-nav**](https://www.npmjs.com/package/ng-hub-ui-nav)
- [**ng-hub-ui-paginable**](https://www.npmjs.com/package/ng-hub-ui-paginable)
- [**ng-hub-ui-panels**](https://www.npmjs.com/package/ng-hub-ui-panels)
- [**ng-hub-ui-portal**](https://www.npmjs.com/package/ng-hub-ui-portal)
- [**ng-hub-ui-skeleton**](https://www.npmjs.com/package/ng-hub-ui-skeleton)
- [**ng-hub-ui-sortable**](https://www.npmjs.com/package/ng-hub-ui-sortable)
- [**ng-hub-ui-stepper**](https://www.npmjs.com/package/ng-hub-ui-stepper)
- [**ng-hub-ui-toast**](https://www.npmjs.com/package/ng-hub-ui-toast)
- [**ng-hub-ui-utils**](https://www.npmjs.com/package/ng-hub-ui-utils)

---

## Quick Start

### 1. Install

```bash
npm install ng-hub-ui-buttons ng-hub-ui-utils
```

> **Theming (recommended):** install the shared design tokens:
>
> ```bash
> npm install ng-hub-ui-ds
> ```
> ```css
> @import 'ng-hub-ui-ds/styles/tokens/hub-tokens.css';
> ```

### 2. Import the components you need

All exports are standalone — import only what you use:

```typescript
import { HubBtnComponent, HubDropdownDirective, HubDropdownPanelComponent, HubDropdownItemComponent } from 'ng-hub-ui-buttons';

@Component({
    standalone: true,
    imports: [HubBtnComponent, HubDropdownDirective, HubDropdownPanelComponent, HubDropdownItemComponent],
    template: `
        <hub-btn [hubDropdown]="menu" placement="bottom-start">Actions</hub-btn>

        <ng-template #menu>
            <hub-dropdown-panel>
                <hub-dropdown-item (itemClick)="edit()">Edit</hub-dropdown-item>
                <hub-dropdown-item color="danger" (itemClick)="delete()">Delete</hub-dropdown-item>
            </hub-dropdown-panel>
        </ng-template>
    `
})
export class MyComponent { ... }
```

---

## Components and Directives

### `HubBtnComponent` — `<hub-btn>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `solid \| outline \| soft \| ghost \| link` | `solid` | Visual style |
| `color` | `primary \| secondary \| success \| danger \| warning \| info` | `primary` | Semantic colour |
| `size` | `sm \| md \| lg \| xl` | `md` | Size scale |
| `iconOnly` | `boolean` | `false` | Equal-padding square button for icons |
| `loading` | `boolean` | `false` | Shows spinner, blocks interaction |
| `disabled` | `boolean` | `false` | Disables button and sets `disabled` attribute |

### `HubBtnDirective` — `[hubBtn]`

Same inputs as `HubBtnComponent`. Use on a native `<button>` or `<a>` element.

```html
<button hubBtn variant="outline" color="success">Confirm</button>
```

### `HubFabComponent` — `<hub-fab>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `position` | `top-start \| top-center \| top-end \| middle-start \| center \| middle-end \| bottom-start \| bottom-center \| bottom-end` | `bottom-end` | Fixed viewport position |
| `size` | `mini \| standard \| large` | `standard` | Button size |
| `color` | semantic | `primary` | Colour variant |
| `collapseOnScroll` | `boolean` | `false` | Hides label on scroll, expands on stop |

### `HubSpeedDialComponent` — `<hub-speed-dial>`

| Input/Output | Type | Description |
|---|---|---|
| `isOpen` | `model(false)` | Two-way binding for open state |
| `position` | same as FAB | FAB position |
| `color` | semantic | Trigger button colour |

Methods: `open()`, `close()`, `toggle()`. Closes on Escape.

Project `<hub-speed-dial-item>` elements inside for actions.

### `HubDropdownDirective` — `[hubDropdown]`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `hubDropdown` (required) | `TemplateRef` | — | Panel template to render in the overlay |
| `placement` | `bottom-start \| bottom \| bottom-end \| top-start \| top \| top-end \| start \| end` | `bottom-start` | Overlay position |
| `trigger` | `click \| hover` | `click` | Open trigger |
| `closeOnSelect` | `boolean` | `true` | Close when user clicks inside panel |
| `disabled` | `boolean` | `false` | Prevents opening |
| `offsetY` | `number` | `4` | Gap in px between trigger and panel |
| `panelClass` | `string` | `''` | Extra CSS class on the overlay panel |
| `isOpen` | `model(false)` | — | Two-way open state |

Outputs: `opened`, `closed`. Methods: `open()`, `close()`, `toggle()`. Closes on Escape and backdrop click.

### `HubDropdownPanelComponent` — `<hub-dropdown-panel>`

Container for dropdown content. Accepts `color` for a semantic accent border.

### `HubDropdownItemComponent` — `<hub-dropdown-item>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `color` | semantic \| `default` | `default` | Text colour variant |
| `icon` | `string` | — | Icon character/ligature before label |
| `disabled` | `boolean` | `false` | Prevents click |
| `selected` | `boolean` | `false` | Shows checkmark indicator |

Output: `itemClick`.

### `HubDropdownDividerComponent` — `<hub-dropdown-divider>`

Horizontal separator (`role="separator"`).

### `HubDropdownHeaderComponent` — `<hub-dropdown-header>`

Uppercase group label inside a dropdown panel.

---

## CSS Customisation

All visual properties are exposed as CSS variables. Default values use `:where()` (zero specificity) so any selector overrides them:

```css
/* Button */
--hub-btn-border-radius: 0.375rem;
--hub-btn-font-weight: 500;
--hub-btn-transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

/* FAB */
--hub-fab-size: 3.5rem;
--hub-fab-shadow: 0 4px 14px 0 rgba(0,0,0,.25);

/* Dropdown */
--hub-dropdown-panel-border-radius: 0.5rem;
--hub-dropdown-panel-shadow: 0 8px 24px rgba(0,0,0,.12);
--hub-dropdown-item-hover-bg: var(--hub-sys-color-surface-subtle, #f8fafc);
```

Semantic colours resolve through `--hub-sys-color-{variant}-*` tokens from `ng-hub-ui-ds`.

---

## Migrating from `ng-hub-ui-dropdown`

`ng-hub-ui-dropdown` is deprecated. Replace:

| Old | New |
|-----|-----|
| `HubDropdownModule` | `HubDropdownDirective` + `HubDropdownPanelComponent` |
| `<hub-dropdown>` | `[hubDropdown]="tpl"` on any trigger + `<ng-template #tpl>` |
| `<hub-dropdown-item>` | `<hub-dropdown-item>` (same selector, new package) |

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT
