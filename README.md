# ng-hub-ui-buttons

[Español](./README.es.md) | **English**

[![NPM Version](https://img.shields.io/npm/v/ng-hub-ui-buttons.svg)](https://www.npmjs.com/package/ng-hub-ui-buttons)
[![Angular](https://img.shields.io/badge/Angular-21%2B-red.svg)](https://angular.dev)
[![License](https://img.shields.io/npm/l/ng-hub-ui-buttons.svg)](LICENSE)

Complete Angular 21+ button system — standard buttons, FAB, speed dial and overlay dropdown — fully signal-based, zero external dependencies beyond `ng-hub-ui-utils`.

## Documentation and Live Examples

This package is part of [Hub UI](https://hubui.dev/), a collection of Angular component libraries for standalone apps.

- Docs: https://hubui.dev/buttons/overview/
- Live examples: https://hubui.dev/buttons/examples/
- Hub UI: https://hubui.dev/

## Library Family `ng-hub-ui`

This library is part of the **ng-hub-ui** ecosystem:

- [**ng-hub-ui-accordion**](https://www.npmjs.com/package/ng-hub-ui-accordion) _(deprecated — use ng-hub-ui-panels)_
- [**ng-hub-ui-action-sheet**](https://www.npmjs.com/package/ng-hub-ui-action-sheet)
- [**ng-hub-ui-avatar**](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [**ng-hub-ui-board**](https://www.npmjs.com/package/ng-hub-ui-board)
- [**ng-hub-ui-breadcrumbs**](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [**ng-hub-ui-buttons**](https://www.npmjs.com/package/ng-hub-ui-buttons) ← You are here
- [**ng-hub-ui-calendar**](https://www.npmjs.com/package/ng-hub-ui-calendar)
- [**ng-hub-ui-dropdown**](https://www.npmjs.com/package/ng-hub-ui-dropdown) _(deprecated — use ng-hub-ui-buttons)_
- [**ng-hub-ui-forms**](https://www.npmjs.com/package/ng-hub-ui-forms)
- [**ng-hub-ui-history**](https://www.npmjs.com/package/ng-hub-ui-history)
- [**ng-hub-ui-milestones**](https://www.npmjs.com/package/ng-hub-ui-milestones)
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

## Description

`ng-hub-ui-buttons` is a zero-dependency button library for Angular 21+ standalone applications (peer: `ng-hub-ui-utils`). It ships `HubBtnComponent` and `HubBtnDirective` for in-flow buttons, `HubFabComponent` for fixed-viewport floating actions, `HubSpeedDialComponent` for expandable FAB menus, and `HubDropdownDirective` that attaches any `<ng-template>` panel to any trigger via the `OverlayService` — no CDK required. All inputs use the Angular Signals API. Every visual property is a CSS custom property so the entire system themes with a single stylesheet override.

## Features

- **Signal-based API** — all inputs use `input()`, `model()` and `output()`; fully `OnPush`-safe and compatible with zoneless apps.
- **Five variants × six colours** — `solid`, `outline`, `soft`, `ghost` and `link`, each available in `primary`, `secondary`, `success`, `danger`, `warning` and `info`.
- **Four sizes** — `sm`, `md`, `lg`, `xl` with proportional padding and font scaling.
- **FAB with nine positions** — fixed-viewport placement at any corner, edge-center or screen-center via CSS logical properties (RTL-ready).
- **Speed Dial** — expandable FAB menu with `isOpen` two-way model, directional expansion and Escape close.
- **Overlay Dropdown** — attaches any `<ng-template>` to any trigger; eight placement options, click or hover trigger, backdrop and scroll close, no CDK dependency.
- **Extensible SCSS token system** — `:where()` zero-specificity defaults mean any consumer rule wins without `!important`. Public mixin API lets you register custom semantic colors.

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
import {
    HubBtnComponent,
    HubDropdownDirective,
    HubDropdownPanelComponent,
    HubDropdownItemComponent
} from 'ng-hub-ui-buttons';

@Component({
    standalone: true,
    imports: [HubBtnComponent, HubDropdownDirective, HubDropdownPanelComponent, HubDropdownItemComponent],
    template: `
        <hub-button [hubDropdown]="menu" placement="bottom-start">Actions</hub-button>

        <ng-template #menu>
            <hub-dropdown-panel>
                <hub-dropdown-item (itemClick)="edit()">Edit</hub-dropdown-item>
                <hub-dropdown-item color="danger" (itemClick)="delete()">Delete</hub-dropdown-item>
            </hub-dropdown-panel>
        </ng-template>
    `
})
export class MyComponent { }
```

---

## Components and Directives

### `HubBtnComponent` — `<hub-button>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `solid \| outline \| soft \| ghost \| link` | `solid` | Visual style |
| `color` | `primary \| secondary \| success \| danger \| warning \| info` | `primary` | Semantic colour |
| `size` | `sm \| md \| lg \| xl` | `md` | Size scale |
| `iconOnly` | `boolean` | `false` | Equal-padding square button for icon-only use |
| `loading` | `boolean` | `false` | Shows spinner and blocks interaction |
| `disabled` | `boolean` | `false` | Disables the button and sets the `disabled` attribute |

### `HubBtnDirective` — `[hubButton]`

Same inputs as `HubBtnComponent`. Apply to a native `<button>` or `<a>` element.

```html
<button hubButton variant="outline" color="success">Confirm</button>
<a hubButton variant="link" color="primary" href="/docs">Read more</a>
```

### `HubFabComponent` — `<hub-fab>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `position` | `top-start \| top-center \| top-end \| middle-start \| center \| middle-end \| bottom-start \| bottom-center \| bottom-end` | `bottom-end` | Fixed viewport position |
| `size` | `mini \| standard \| large` | `standard` | Button size |
| `color` | semantic | `primary` | Colour variant |
| `collapseOnScroll` | `boolean` | `false` | Hides extended label on scroll, expands on stop |
| `disabled` | `boolean` | `false` | Disables the button |

Output: `fabClick`.

### `HubSpeedDialComponent` — `<hub-speed-dial>`

| Input / Output | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `model(false)` | `false` | Two-way binding for open/closed state |
| `position` | same as FAB | `bottom-end` | Fixed viewport position |
| `color` | semantic | `primary` | Trigger button colour |
| `direction` | `up \| down \| left \| right` | `up` | Direction in which action items expand |

Methods: `open()`, `close()`, `toggle()`. Closes on Escape.

Use `hubTrigger` on the element projected as the trigger button:

```html
<hub-speed-dial>
    <hub-button hubTrigger color="primary"><i class="fa-solid fa-plus"></i></hub-button>
    <hub-speed-dial-item icon="fa-solid fa-pen" label="Edit" (itemClick)="edit()" />
    <hub-speed-dial-item icon="fa-solid fa-trash" label="Delete" color="danger" (itemClick)="delete()" />
</hub-speed-dial>
```

### `HubSpeedDialItemComponent` — `<hub-speed-dial-item>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `icon` | `string` | — | CSS class(es) applied to an `<i>` element (e.g. `fa-solid fa-pen`) |
| `label` | `string` | — | Tooltip label shown beside the item |
| `color` | semantic | `primary` | Item button colour |
| `disabled` | `boolean` | `false` | Disables the item |

Output: `itemClick`.

### `HubDropdownDirective` — `[hubDropdown]`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `hubDropdown` | `TemplateRef` | — | Panel template to render in the overlay (required) |
| `placement` | `bottom-start \| bottom \| bottom-end \| top-start \| top \| top-end \| start \| end` | `bottom-start` | Overlay position relative to the trigger |
| `trigger` | `click \| hover` | `click` | Event that opens the dropdown |
| `closeOnSelect` | `boolean` | `true` | Close when the user clicks inside the panel |
| `disabled` | `boolean` | `false` | Prevents opening |
| `offsetY` | `number` | `4` | Gap in px between trigger and panel |
| `panelClass` | `string` | `''` | Extra CSS class added to the overlay panel |
| `isOpen` | `model(false)` | — | Two-way open state |

Outputs: `opened`, `closed`. Methods: `open()`, `close()`, `toggle()`. Closes on Escape, backdrop click and scroll.

### `HubDropdownPanelComponent` — `<hub-dropdown-panel>`

Container for dropdown content. Accepts a `color` input for a semantic accent border on the top edge.

### `HubDropdownItemComponent` — `<hub-dropdown-item>`

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `color` | semantic \| `default` | `default` | Text colour variant |
| `icon` | `string` | — | CSS class(es) applied to an `<i>` element before the label |
| `disabled` | `boolean` | `false` | Prevents click and dims the item |
| `selected` | `boolean` | `false` | Shows a checkmark indicator |

Output: `itemClick`.

### `HubDropdownDividerComponent` — `<hub-dropdown-divider>`

Horizontal separator with `role="separator"`.

### `HubDropdownHeaderComponent` — `<hub-dropdown-header>`

Uppercase group label inside a dropdown panel.

---

## CSS Customisation

All visual properties are CSS custom properties scoped with `:where()` (zero specificity), so any consumer rule overrides them without `!important`.

```css
/* Button */
--hub-button-padding-x:         0.875rem;
--hub-button-padding-y:         0.4375rem;
--hub-button-border-radius:     var(--hub-sys-radius-md, 0.375rem);
--hub-button-border-width:      1.5px;
--hub-button-font-size:         1rem;
--hub-button-font-weight:       500;
--hub-button-gap:               0.375rem;
--hub-button-transition:        all 0.15s ease;
--hub-button-spinner-size:      0.875em;
--hub-button-disabled-opacity:  0.55;

/* FAB */
--hub-fab-size-mini:          2.5rem;
--hub-fab-size-standard:      3.5rem;
--hub-fab-size-large:         4.5rem;
--hub-fab-border-radius:      50%;
--hub-fab-shadow:             var(--hub-sys-shadow-md);
--hub-fab-shadow-hover:       var(--hub-sys-shadow-lg);
--hub-fab-offset:             1rem;
--hub-fab-zindex:            1030;
--hub-fab-transition:         box-shadow 0.2s ease, transform 0.15s ease;

/* Speed Dial */
--hub-speed-dial-gap:         0.625rem;
--hub-speed-dial-zindex:     1030;
--hub-speed-dial-animation:   0.2s ease;

/* Dropdown panel */
--hub-dropdown-panel-min-width:      11.25rem;
--hub-dropdown-panel-max-height:     20rem;
--hub-dropdown-panel-padding-y:      0.25rem;
--hub-dropdown-panel-bg:             var(--hub-sys-color-surface-default, #fff);
--hub-dropdown-panel-border-color:   var(--hub-sys-color-border-subtle, #e2e8f0);
--hub-dropdown-panel-border-radius:  var(--hub-sys-radius-md, 0.5rem);
--hub-dropdown-panel-shadow:         var(--hub-sys-shadow-lg);
--hub-dropdown-panel-zindex:        1000;

/* Dropdown item */
--hub-dropdown-item-padding-x:          0.875rem;
--hub-dropdown-item-padding-y:          0.4375rem;
--hub-dropdown-item-hover-bg:           var(--hub-sys-color-surface-subtle, #f8fafc);
--hub-dropdown-item-border-radius:      var(--hub-sys-radius-sm, 0.25rem);
--hub-dropdown-item-disabled-opacity:   0.45;
```

Semantic colours resolve through `--hub-sys-color-{variant}-*` tokens from `ng-hub-ui-ds`.

---

## SCSS Mixin API

Register custom semantic colors without modifying the library. Import the mixin API from the distributed styles:

```scss
@use 'ng-hub-ui-buttons/styles' as hub;
```

### Add a custom color to all five button variants

```scss
:root {
    --hub-sys-color-brand-default:    #ff6b00;
    --hub-sys-color-brand-emphasis:   #cc5500;
    --hub-sys-color-brand-subtle:     #fff0e6;
    --hub-sys-color-brand-on-default: #fff;
}

hub-button, [hubButton] {
    @include hub.hub-btn-color-rules('brand');
}
```

```html
<hub-button variant="solid" color="brand">Brand</hub-button>
<hub-button variant="outline" color="brand">Brand</hub-button>
```

### Create a fully custom variant

`hub-btn-variant-rules` is the generic primitive. Its defaults match the `ghost` variant — override only the values that differ:

```scss
hub-button, [hubButton] {
    &.hub-btn-inverted.hub-btn-brand {
        @include hub.hub-btn-variant-rules('brand',
            $bg:          var(--hub-sys-color-brand-on-default),
            $color:       var(--hub-sys-color-brand-default),
            $border:      var(--hub-sys-color-brand-default),
            $hover-bg:    var(--hub-sys-color-brand-default),
            $hover-color: var(--hub-sys-color-brand-on-default)
        );
    }
}
```

### Add a custom FAB color

```scss
@include hub.hub-fab-color('brand');
```

### Add a custom dropdown color

```scss
// Panel accent border
@include hub.hub-dropdown-panel-color('brand');

// Item text + hover
@include hub.hub-dropdown-item-color('brand');
```

### Available mixins

| Mixin | Context | Description |
|---|---|---|
| `hub-btn-variant-rules($type, ...)` | global `hub-button, [hubButton]` block | Generic primitive — all variant properties as named params |
| `hub-btn-color-rules($type)` | global `hub-button, [hubButton]` block | All five built-in variants for one custom color |
| `hub-fab-color($type)` | root | Global `.hub-fab-{type}` color rule |
| `hub-dropdown-panel-color($type)` | root | Global color rule for `hub-dropdown-panel` |
| `hub-dropdown-panel-color-rules($type)` | inside `hub-dropdown-panel` selector | CSS properties only — bring your own selector |
| `hub-dropdown-item-color($type)` | root | Global color rule for `hub-dropdown-item` |
| `hub-dropdown-item-color-rules($type)` | inside `.hub-dropdown-item__inner` selector | CSS properties only — bring your own selector |

---

## Migrating from `ng-hub-ui-dropdown`

`ng-hub-ui-dropdown` is deprecated. Replace:

| Old | New |
|-----|-----|
| `HubDropdownModule` | `HubDropdownDirective` + `HubDropdownPanelComponent` |
| `<hub-dropdown>` | `[hubDropdown]="tpl"` on any trigger + `<ng-template #tpl>` |
| `<hub-dropdown-item>` | `<hub-dropdown-item>` (same selector, new package) |

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/carlos-morcillo/ng-hub-ui-buttons).

### Pull Request Process

1. Fork the repository
2. Create a new branch: `git checkout -b feat/my-new-feature`
3. Make your changes
4. Add tests for any new functionality
5. Update documentation if needed
6. Submit a pull request

### Development Guidelines

- Write unit tests for new features
- Follow the Angular style guide
- Update documentation for API changes
- Maintain backward compatibility
- Add JSDoc comments for complex logic

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactors
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Reporting Issues

Before creating an issue, please:

- Check existing issues
- Include reproduction steps
- Specify your environment (Angular version, browser)

---

## Breaking Changes

See [BREAKING_CHANGES.md](./BREAKING_CHANGES.md).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

---

## ☕ Support the Project

If you find this project helpful and would like to support its development, you can buy me a coffee:

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/carlosmorcillo)

Your support is greatly appreciated and helps maintain and improve this project!

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Carlos Morcillo Fernández](https://www.carlosmorcillo.com)
