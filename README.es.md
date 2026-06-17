# ng-hub-ui-buttons

**Español** | [English](./README.md)

[![NPM Version](https://img.shields.io/npm/v/ng-hub-ui-buttons.svg)](https://www.npmjs.com/package/ng-hub-ui-buttons)
[![Angular](https://img.shields.io/badge/Angular-22-red.svg)](https://angular.dev)
[![License](https://img.shields.io/npm/l/ng-hub-ui-buttons.svg)](LICENSE)

Sistema de botones completo para Angular 22 — botones estándar, FAB, speed dial y dropdown overlay — totalmente basado en signals, sin dependencias externas más allá de `ng-hub-ui-utils`.

## Documentación y ejemplos

Este paquete forma parte de [Hub UI](https://hubui.dev/), una colección de librerías de componentes Angular para aplicaciones standalone.

- Docs: https://hubui.dev/buttons/overview/
- Ejemplos: https://hubui.dev/buttons/examples/
- Hub UI: https://hubui.dev/

---

## Instalación

```bash
npm install ng-hub-ui-buttons ng-hub-ui-utils
```

> **Theming (recomendado):** instala los design tokens compartidos:
>
> ```bash
> npm install ng-hub-ui-ds
> ```
> ```css
> @import 'ng-hub-ui-ds/styles/tokens/hub-tokens.css';
> ```

---

## Uso rápido

Todos los exports son standalone — importa solo lo que necesites:

```typescript
import { HubBtnComponent, HubDropdownDirective, HubDropdownPanelComponent, HubDropdownItemComponent } from 'ng-hub-ui-buttons';

@Component({
    standalone: true,
    imports: [HubBtnComponent, HubDropdownDirective, HubDropdownPanelComponent, HubDropdownItemComponent],
    template: `
        <hub-btn [hubDropdown]="menu" placement="bottom-start">Acciones</hub-btn>

        <ng-template #menu>
            <hub-dropdown-panel>
                <hub-dropdown-item (itemClick)="edit()">Editar</hub-dropdown-item>
                <hub-dropdown-item color="danger" (itemClick)="delete()">Eliminar</hub-dropdown-item>
            </hub-dropdown-panel>
        </ng-template>
    `
})
export class MyComponent { ... }
```

---

## Migración desde `ng-hub-ui-dropdown`

`ng-hub-ui-dropdown` está deprecado. Sustituye:

| Antes | Ahora |
|-------|-------|
| `HubDropdownModule` | `HubDropdownDirective` + `HubDropdownPanelComponent` |
| `<hub-dropdown>` | `[hubDropdown]="tpl"` en cualquier trigger + `<ng-template #tpl>` |
| `<hub-dropdown-item>` | `<hub-dropdown-item>` (mismo selector, nuevo paquete) |

---

## Changelog

Ver [CHANGELOG.md](./CHANGELOG.md).

## Licencia

MIT
