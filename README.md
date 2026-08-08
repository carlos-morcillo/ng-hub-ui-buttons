# ng-hub-ui-buttons

[Español](./README.es.md) | **English**

[![NPM Version](https://img.shields.io/npm/v/ng-hub-ui-buttons.svg)](https://www.npmjs.com/package/ng-hub-ui-buttons)
[![Angular](https://img.shields.io/badge/Angular-21%2B-red.svg)](https://angular.dev)
[![License](https://img.shields.io/npm/l/ng-hub-ui-buttons.svg)](LICENSE)

Complete Angular 21+ button system — standard buttons, FAB, speed dial and overlay dropdown — fully signal-based, zero external dependencies beyond `ng-hub-ui-utils`.

## Documentation and Live Examples

This package is part of [Hub UI](https://hubui.dev/en/), a collection of Angular component libraries for standalone apps.

- Docs: https://hubui.dev/en/buttons/overview/
- Live examples: https://hubui.dev/en/buttons/examples/
- Hub UI: https://hubui.dev/en/

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

`ng-hub-ui-buttons` is a zero-dependency button library for Angular 21+ standalone applications (peer: `ng-hub-ui-utils`). It ships `HubButtonComponent` for in-flow buttons — usable as an element (`<hub-button>`) or as an attribute on a native host (`<button hubButton>` / `<a hubButton>`) — `HubFabComponent` for fixed-viewport floating actions, `HubSpeedDialComponent` for expandable FAB menus, and `HubDropdownDirective` that attaches any `<ng-template>` panel to any trigger via the `OverlayService` — no CDK required. All inputs use the Angular Signals API. Every visual property is a CSS custom property so the entire system themes with a single stylesheet override.

## Features

- **Signal-based API** — all inputs use `input()`, `model()` and `output()`; fully `OnPush`-safe and compatible with zoneless apps.
- **Five variants × nine colours** — `solid`, `outline`, `soft`, `ghost` and `link`, each available in `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `neutral`, `light` and `dark`.
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
    HubButtonComponent,
    HubDropdownDirective,
    HubDropdownPanelComponent,
    HubDropdownItemComponent
} from 'ng-hub-ui-buttons';

@Component({
    standalone: true,
    imports: [HubButtonComponent, HubDropdownDirective, HubDropdownPanelComponent, HubDropdownItemComponent],
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

### `HubButtonComponent` — `<hub-button>` or `[hubButton]`

A single component with a dual selector — use it as an **element** or as an **attribute** on a native host. Both forms share the same inputs and render the loading spinner.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `solid \| outline \| soft \| ghost \| link` | `solid` | Visual style |
| `color` | `HubSemanticColor` — the nine built-ins (`primary \| secondary \| success \| danger \| warning \| info \| neutral \| light \| dark`) **or any custom accent** registered with `hub-btn-color-rules()` | `primary` | Semantic colour (open set) |
| `size` | `sm \| md \| lg \| xl` | `md` | Size scale |
| `loading` | `boolean` | `false` | Shows the spinner and marks the button **busy + disabled** — non-focusable, inert to pointer/keyboard, reflects `aria-busy="true"` and the `disabled` attribute |
| `disabled` | `boolean` | `false` | Disables the button and sets the `disabled` attribute |

```html
<!-- Element form -->
<hub-button variant="solid" color="primary">Save</hub-button>

<!-- Attribute form on a native host (recommended for real button semantics) -->
<button hubButton variant="outline" color="success">Confirm</button>
<a hubButton variant="link" color="primary" href="/docs">Read more</a>
```

> **Tip:** prefer the attribute form on a native `<button>` / `<a>` when you need real button semantics (focus, keyboard activation, form submission). The `<hub-button>` element form is a styling host, but it self-advertises `role="button"`, a focusable `tabindex` and Enter/Space activation so it stays keyboard-accessible; because it then reports as a button, don't nest it inside another interactive element.
>
> **Deprecated aliases:** `HubBtnComponent` and `HubBtnDirective` still export (pointing to `HubButtonComponent`) for backward compatibility — migrate to `HubButtonComponent`.

#### Loading / busy state

```html
<button hubButton color="primary" [loading]="saving()">Save</button>
```

While `loading` is `true` the button shows an animated spinner and is fully inert: it reflects `aria-busy="true"` and the native `disabled` attribute, drops out of the tab order and ignores pointer and keyboard activation — so an in-flight submit can't fire twice.

The spinner glyph is the swappable `--hub-button-spinner` token (a `url("data:image/svg+xml,…")` painted through `mask`, so it inherits the button's text colour). Point it at any SVG to replace the loader, and tune `--hub-button-spinner-duration` / `--hub-button-spinner-size`:

```css
hub-button, [hubButton] {
    --hub-button-spinner: url("data:image/svg+xml,%3Csvg …%3E"); /* your loader */
    --hub-button-spinner-duration: 1s;
}
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
--hub-button-spinner-duration:  0.7s;
--hub-button-spinner:           url("data:image/svg+xml,…"); /* the loading glyph — swap for any SVG */
--hub-button-disabled-opacity:  0.55;

/* Button interaction slots (overridable hover / pressed families) */
--hub-btn-hover-bg:       var(--hub-btn-accent-subtle);
--hub-btn-hover-border:   transparent;
--hub-btn-hover-color:    var(--hub-btn-accent-emphasis);
--hub-btn-active-bg:      color-mix(in oklch, var(--hub-btn-accent) 70%, var(--hub-sys-color-ink, #212529));
--hub-btn-active-border:  transparent;
--hub-btn-active-color:   var(--hub-btn-accent-on);

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
--hub-dropdown-panel-padding-y:      var(--hub-ref-space-1, 0.25rem);
--hub-dropdown-panel-bg:             var(--hub-sys-color-surface-default, #ffffff);
--hub-dropdown-panel-border-color:   var(--hub-sys-color-border-subtle, #dee2e6);
--hub-dropdown-panel-border-radius:  var(--hub-sys-radius-md, 0.375rem);
--hub-dropdown-panel-shadow:         var(--hub-sys-shadow-lg, 0 1rem 3rem rgba(0, 0, 0, 0.175));
--hub-dropdown-panel-zindex:        var(--hub-sys-zindex-dropdown, 1000);

/* Dropdown item */
--hub-dropdown-item-padding-x:          var(--hub-ref-space-3, 1rem);
--hub-dropdown-item-padding-y:          var(--hub-ref-space-2, 0.5rem);
--hub-dropdown-item-hover-bg:           var(--hub-sys-color-surface-subtle, #f8f9fa);
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

`hub-btn-color-rules('brand')` points the local `--hub-btn-accent` slot at
`--hub-sys-color-brand`. You only define that **one** value — the button derives
the whole role family (`-emphasis` / `-subtle` / `-on`) from it at runtime, so
every appearance (solid/outline/soft/ghost/link) works and `color="brand"`
type-checks (the `color` input is an open set):

```scss
:root {
    --hub-sys-color-brand: #ff6b00; // the single accent — that's all it needs
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

`hub-btn-variant-rules` is the generic primitive — **all parameters are named**
(there is no positional `$type`). Its defaults match the `ghost` variant, and
every colour reads the local `--hub-btn-accent*` slot family, so it stays
accent-agnostic. Override only the values that differ:

```scss
hub-button, [hubButton] {
    &.hub-btn-inverted.hub-btn-brand {
        @include hub.hub-btn-variant-rules(
            $bg:          var(--hub-btn-accent-on),
            $color:       var(--hub-btn-accent),
            $border:      var(--hub-btn-accent),
            $hover-bg:    var(--hub-btn-accent),
            $hover-color: var(--hub-btn-accent-on)
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
| `hub-btn-variant-rules($bg, $color, $border, $hover-*, $active-*, …)` | inside a `hub-button, [hubButton]` variant selector | Generic primitive — every appearance property as a **named** param (no positional `$type`) |
| `hub-btn-color-rules($type)` | global `hub-button, [hubButton]` block | Registers one custom accent (`--hub-btn-accent` → `--hub-sys-color-$type`); all five appearances derive from it |
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
