# ng-hub-ui-buttons

**Español** | [English](./README.md)

[![NPM Version](https://img.shields.io/npm/v/ng-hub-ui-buttons.svg)](https://www.npmjs.com/package/ng-hub-ui-buttons)
[![Angular](https://img.shields.io/badge/Angular-21%2B-red.svg)](https://angular.dev)
[![License](https://img.shields.io/npm/l/ng-hub-ui-buttons.svg)](LICENSE)

Sistema de botones completo para Angular 21+ — botones estándar, FAB, speed dial y dropdown overlay — totalmente basado en signals, sin dependencias externas más allá de `ng-hub-ui-utils`.

## Documentación y ejemplos

Este paquete forma parte de [Hub UI](https://hubui.dev/), una colección de librerías de componentes Angular para aplicaciones standalone.

- Docs: https://hubui.dev/buttons/overview/
- Ejemplos: https://hubui.dev/buttons/examples/
- Hub UI: https://hubui.dev/

## Familia de librerías `ng-hub-ui`

Esta librería forma parte del ecosistema **ng-hub-ui**:

- [**ng-hub-ui-accordion**](https://www.npmjs.com/package/ng-hub-ui-accordion) _(deprecado — usa ng-hub-ui-panels)_
- [**ng-hub-ui-action-sheet**](https://www.npmjs.com/package/ng-hub-ui-action-sheet)
- [**ng-hub-ui-avatar**](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [**ng-hub-ui-board**](https://www.npmjs.com/package/ng-hub-ui-board)
- [**ng-hub-ui-breadcrumbs**](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [**ng-hub-ui-buttons**](https://www.npmjs.com/package/ng-hub-ui-buttons) ← Estás aquí
- [**ng-hub-ui-calendar**](https://www.npmjs.com/package/ng-hub-ui-calendar)
- [**ng-hub-ui-dropdown**](https://www.npmjs.com/package/ng-hub-ui-dropdown) _(deprecado — usa ng-hub-ui-buttons)_
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

## Descripción

`ng-hub-ui-buttons` es una librería de botones sin dependencias externas para aplicaciones Angular 21+ standalone (peer: `ng-hub-ui-utils`). Incluye `HubBtnComponent` y `HubBtnDirective` para botones en flujo, `HubFabComponent` para acciones flotantes en posición fija, `HubSpeedDialComponent` para menús FAB expandibles y `HubDropdownDirective` que adjunta cualquier `<ng-template>` a cualquier trigger mediante `OverlayService` — sin CDK. Todas las entradas usan la API de Signals de Angular. Cada propiedad visual es una CSS custom property, por lo que todo el sistema se tematiza con una sola hoja de estilos.

## Características

- **API basada en Signals** — todas las entradas usan `input()`, `model()` y `output()`; compatible con `OnPush` y aplicaciones zoneless.
- **Cinco variantes × seis colores** — `solid`, `outline`, `soft`, `ghost` y `link`, disponibles en `primary`, `secondary`, `success`, `danger`, `warning` e `info`.
- **Cuatro tamaños** — `sm`, `md`, `lg`, `xl` con padding y fuente proporcionales.
- **FAB con nueve posiciones** — posicionamiento fijo en cualquier esquina, centro de borde o centro de pantalla con propiedades lógicas CSS (compatible con RTL).
- **Speed Dial** — menú FAB expandible con modelo bidireccional `isOpen`, expansión direccional y cierre con Escape.
- **Dropdown overlay** — adjunta cualquier `<ng-template>` a cualquier trigger; ocho opciones de placement, trigger por click o hover, cierre al hacer clic fuera o al hacer scroll.
- **Sistema de tokens SCSS extensible** — defaults con `:where()` (especificidad cero) para que cualquier regla del consumidor tenga prioridad. API de mixins públicos para registrar colores semánticos personalizados.

---

## Inicio rápido

### 1. Instalación

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

### 2. Importa los componentes que necesites

Todos los exports son standalone — importa solo lo que uses:

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
        <hub-button [hubDropdown]="menu" placement="bottom-start">Acciones</hub-button>

        <ng-template #menu>
            <hub-dropdown-panel>
                <hub-dropdown-item (itemClick)="edit()">Editar</hub-dropdown-item>
                <hub-dropdown-item color="danger" (itemClick)="delete()">Eliminar</hub-dropdown-item>
            </hub-dropdown-panel>
        </ng-template>
    `
})
export class MyComponent { }
```

---

## Componentes y directivas

### `HubBtnComponent` — `<hub-button>`

| Input | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `variant` | `solid \| outline \| soft \| ghost \| link` | `solid` | Estilo visual |
| `color` | `primary \| secondary \| success \| danger \| warning \| info` | `primary` | Color semántico |
| `size` | `sm \| md \| lg \| xl` | `md` | Escala de tamaño |
| `iconOnly` | `boolean` | `false` | Botón cuadrado con padding igual para iconos |
| `loading` | `boolean` | `false` | Muestra spinner y bloquea la interacción |
| `disabled` | `boolean` | `false` | Desactiva el botón y añade el atributo `disabled` |

### `HubBtnDirective` — `[hubButton]`

Mismos inputs que `HubBtnComponent`. Aplícalo sobre un `<button>` o `<a>` nativo.

```html
<button hubBtn variant="outline" color="success">Confirmar</button>
<a hubBtn variant="link" color="primary" href="/docs">Leer más</a>
```

### `HubFabComponent` — `<hub-fab>`

| Input | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `position` | `top-start \| top-center \| top-end \| middle-start \| center \| middle-end \| bottom-start \| bottom-center \| bottom-end` | `bottom-end` | Posición fija en el viewport |
| `size` | `mini \| standard \| large` | `standard` | Tamaño del botón |
| `color` | semántico | `primary` | Color |
| `collapseOnScroll` | `boolean` | `false` | Oculta la etiqueta extendida al hacer scroll |
| `disabled` | `boolean` | `false` | Desactiva el botón |

Output: `fabClick`.

### `HubSpeedDialComponent` — `<hub-speed-dial>`

| Input / Output | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `isOpen` | `model(false)` | `false` | Binding bidireccional del estado abierto/cerrado |
| `position` | igual que FAB | `bottom-end` | Posición fija en el viewport |
| `color` | semántico | `primary` | Color del botón trigger |
| `direction` | `up \| down \| left \| right` | `up` | Dirección en que se expanden los items |

Métodos: `open()`, `close()`, `toggle()`. Se cierra con Escape.

Usa `hubTrigger` en el elemento proyectado como botón trigger:

```html
<hub-speed-dial>
    <hub-button hubTrigger color="primary"><i class="fa-solid fa-plus"></i></hub-button>
    <hub-speed-dial-item icon="fa-solid fa-pen" label="Editar" (itemClick)="edit()" />
    <hub-speed-dial-item icon="fa-solid fa-trash" label="Eliminar" color="danger" (itemClick)="delete()" />
</hub-speed-dial>
```

### `HubSpeedDialItemComponent` — `<hub-speed-dial-item>`

| Input | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `icon` | `string` | — | Clase(s) CSS aplicadas a un elemento `<i>` (p. ej. `fa-solid fa-pen`) |
| `label` | `string` | — | Etiqueta tooltip junto al item |
| `color` | semántico | `primary` | Color del botón |
| `disabled` | `boolean` | `false` | Desactiva el item |

Output: `itemClick`.

### `HubDropdownDirective` — `[hubDropdown]`

| Input | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `hubDropdown` | `TemplateRef` | — | Template del panel a renderizar en el overlay (requerido) |
| `placement` | `bottom-start \| bottom \| bottom-end \| top-start \| top \| top-end \| start \| end` | `bottom-start` | Posición del overlay relativa al trigger |
| `trigger` | `click \| hover` | `click` | Evento que abre el dropdown |
| `closeOnSelect` | `boolean` | `true` | Cierra al hacer clic dentro del panel |
| `disabled` | `boolean` | `false` | Impide la apertura |
| `offsetY` | `number` | `4` | Separación en px entre trigger y panel |
| `panelClass` | `string` | `''` | Clase CSS adicional en el panel overlay |
| `isOpen` | `model(false)` | — | Estado bidireccional abierto/cerrado |

Outputs: `opened`, `closed`. Métodos: `open()`, `close()`, `toggle()`. Se cierra con Escape, clic fuera y scroll.

### `HubDropdownPanelComponent` — `<hub-dropdown-panel>`

Contenedor del contenido del dropdown. Acepta un input `color` para mostrar un borde de acento semántico en el borde superior.

### `HubDropdownItemComponent` — `<hub-dropdown-item>`

| Input | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `color` | semántico \| `default` | `default` | Color del texto |
| `icon` | `string` | — | Clase(s) CSS aplicadas a un `<i>` antes de la etiqueta |
| `disabled` | `boolean` | `false` | Desactiva el click y atenúa el item |
| `selected` | `boolean` | `false` | Muestra un indicador de selección |

Output: `itemClick`.

### `HubDropdownDividerComponent` — `<hub-dropdown-divider>`

Separador horizontal con `role="separator"`.

### `HubDropdownHeaderComponent` — `<hub-dropdown-header>`

Etiqueta de grupo en mayúsculas dentro de un panel dropdown.

---

## Personalización CSS

Todas las propiedades visuales son CSS custom properties con `:where()` (especificidad cero), por lo que cualquier regla del consumidor las sobreescribe sin `!important`.

```css
/* Botón */
--hub-btn-padding-x:         0.875rem;
--hub-btn-padding-y:         0.4375rem;
--hub-btn-border-radius:     var(--hub-sys-radius-md, 0.375rem);
--hub-btn-border-width:      1.5px;
--hub-btn-font-size:         1rem;
--hub-btn-font-weight:       500;
--hub-btn-gap:               0.375rem;
--hub-btn-transition:        all 0.15s ease;
--hub-btn-spinner-size:      0.875em;
--hub-btn-disabled-opacity:  0.55;

/* FAB */
--hub-fab-size-mini:          2.5rem;
--hub-fab-size-standard:      3.5rem;
--hub-fab-size-large:         4.5rem;
--hub-fab-border-radius:      50%;
--hub-fab-shadow:             var(--hub-sys-shadow-md);
--hub-fab-shadow-hover:       var(--hub-sys-shadow-lg);
--hub-fab-offset:             1rem;
--hub-fab-z-index:            1030;
--hub-fab-transition:         box-shadow 0.2s ease, transform 0.15s ease;

/* Speed Dial */
--hub-speed-dial-gap:         0.625rem;
--hub-speed-dial-z-index:     1030;
--hub-speed-dial-animation:   0.2s ease;

/* Panel del dropdown */
--hub-dropdown-panel-min-width:      11.25rem;
--hub-dropdown-panel-max-height:     20rem;
--hub-dropdown-panel-padding-y:      0.25rem;
--hub-dropdown-panel-bg:             var(--hub-sys-color-surface-default, #fff);
--hub-dropdown-panel-border-color:   var(--hub-sys-color-border-subtle, #e2e8f0);
--hub-dropdown-panel-border-radius:  var(--hub-sys-radius-md, 0.5rem);
--hub-dropdown-panel-shadow:         var(--hub-sys-shadow-lg);
--hub-dropdown-panel-z-index:        1000;

/* Item del dropdown */
--hub-dropdown-item-padding-x:          0.875rem;
--hub-dropdown-item-padding-y:          0.4375rem;
--hub-dropdown-item-hover-bg:           var(--hub-sys-color-surface-subtle, #f8fafc);
--hub-dropdown-item-border-radius:      var(--hub-sys-radius-sm, 0.25rem);
--hub-dropdown-item-disabled-opacity:   0.45;
```

Los colores semánticos se resuelven mediante los tokens `--hub-sys-color-{variant}-*` de `ng-hub-ui-ds`.

---

## API de mixins SCSS

Registra colores semánticos personalizados sin modificar la librería. Importa la API de mixins desde los estilos distribuidos:

```scss
@use 'ng-hub-ui-buttons/styles' as hub;
```

### Añadir un color personalizado a las cinco variantes de botón

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

### Crear una variante completamente personalizada

`hub-btn-variant-rules` es el primitivo genérico. Sus defaults coinciden con la variante `ghost` — solo sobreescribe lo que difiera:

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

### Mixins disponibles

| Mixin | Contexto | Descripción |
|---|---|---|
| `hub-btn-variant-rules($type, ...)` | bloque `hub-button, [hubButton]` | Primitivo genérico — todas las propiedades de variante como parámetros con nombre |
| `hub-btn-color-rules($type)` | bloque `hub-button, [hubButton]` | Genera las cinco variantes built-in para un color personalizado |
| `hub-fab-color($type)` | raíz | Regla global `.hub-fab-{type}` |
| `hub-dropdown-panel-color($type)` | raíz | Regla global de color para `hub-dropdown-panel` |
| `hub-dropdown-panel-color-rules($type)` | dentro de selector `hub-dropdown-panel` | Solo propiedades CSS — tú eliges el selector |
| `hub-dropdown-item-color($type)` | raíz | Regla global de color para `hub-dropdown-item` |
| `hub-dropdown-item-color-rules($type)` | dentro de `.hub-dropdown-item__inner` | Solo propiedades CSS — tú eliges el selector |

---

## Migración desde `ng-hub-ui-dropdown`

`ng-hub-ui-dropdown` está deprecado. Sustituye:

| Antes | Ahora |
|-------|-------|
| `HubDropdownModule` | `HubDropdownDirective` + `HubDropdownPanelComponent` |
| `<hub-dropdown>` | `[hubDropdown]="tpl"` en cualquier trigger + `<ng-template #tpl>` |
| `<hub-dropdown-item>` | `<hub-dropdown-item>` (mismo selector, nuevo paquete) |

---

## Contribuir

¡Las contribuciones son bienvenidas! Abre una issue o envía un pull request en [GitHub](https://github.com/carlos-morcillo/ng-hub-ui-buttons).

### Proceso de Pull Request

1. Haz un fork del repositorio
2. Crea una nueva rama: `git checkout -b feat/mi-nueva-feature`
3. Realiza tus cambios
4. Añade pruebas para cualquier funcionalidad nueva
5. Actualiza la documentación si es necesario
6. Envía un Pull Request

### Directrices de desarrollo

- Escribe pruebas unitarias para las nuevas funcionalidades
- Sigue la guía de estilo de Angular
- Actualiza la documentación ante cambios en la API
- Mantén la compatibilidad hacia atrás
- Añade comentarios JSDoc para la lógica compleja

### Convención de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nuevas funcionalidades
- `fix:` Corrección de errores
- `docs:` Cambios en documentación
- `refactor:` Refactorizaciones
- `test:` Añadir o actualizar tests
- `chore:` Tareas de mantenimiento

### Reportar incidencias

Antes de crear una incidencia, por favor:

- Revisa las incidencias existentes
- Incluye los pasos para reproducir el problema
- Especifica tu entorno (versión de Angular, navegador)

---

## Breaking changes

Ver [BREAKING_CHANGES.md](./BREAKING_CHANGES.md).

## Changelog

Ver [CHANGELOG.md](./CHANGELOG.md).

---

## ☕ Apoyar el proyecto

Si este proyecto te resulta útil y quieres apoyar su desarrollo, puedes invitarme a un café:

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/carlosmorcillo)

¡Tu apoyo es muy apreciado y ayuda a mantener y mejorar este proyecto!

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT — consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Hecho con ❤️ por [Carlos Morcillo Fernández](https://www.carlosmorcillo.com)
