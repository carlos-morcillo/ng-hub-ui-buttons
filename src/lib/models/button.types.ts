/**
 * The nine canonical accents the button stylesheet registers out of the box,
 * each mapping to a `--hub-sys-color-<color>` design-system family. Includes the
 * three neutral accents (`neutral` / `light` / `dark`) the design-system already
 * ships and the button accent loop already emits.
 */
export type HubSemanticBuiltinColor =
	'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'light' | 'dark';

/**
 * Semantic color token shared across all button-library components
 * (btn / fab / speed-dial / dropdown).
 *
 * OPEN SET: any of the nine built-in accents, **or any custom string** a product
 * registers with the `hub-btn-color-rules('<name>')` mixin (or a bare
 * `--hub-btn-accent` rule). The `(string & {})` arm keeps IntelliSense listing the
 * built-ins while still accepting arbitrary values, so `color="brand"` type-checks
 * once its accent is registered — the button derives the whole role family
 * (emphasis / subtle / on) from that single slot at runtime.
 */
export type HubSemanticColor = HubSemanticBuiltinColor | (string & {});

/** Visual style variant of a button. Controls background, border and text treatment. */
export type HubBtnVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link';

/** Size token for standard buttons. */
export type HubBtnSize = 'sm' | 'md' | 'lg' | 'xl';

/** Size token for circular FAB buttons. */
export type HubFabSize = 'mini' | 'standard' | 'large';

/**
 * 9-position grid for FAB viewport placement.
 * Implemented with position:fixed + inset-inline-* / inset-block-* for RTL support.
 */
export type HubFabPosition =
	| 'top-start'
	| 'top-center'
	| 'top-end'
	| 'middle-start'
	| 'center'
	| 'middle-end'
	| 'bottom-start'
	| 'bottom-center'
	| 'bottom-end';

/**
 * Placement slot for the dropdown overlay, relative to the trigger element.
 * OverlayPosition tries positions in order until one fits the viewport.
 */
export type HubDropdownPlacement = 'top-start' | 'top' | 'top-end' | 'start' | 'end' | 'bottom-start' | 'bottom' | 'bottom-end';
