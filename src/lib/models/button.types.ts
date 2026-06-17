/**
 * Semantic color tokens shared across all button-library components.
 * Maps to --hub-sys-color-<color>-* design-system token families.
 */
export type HubSemanticColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

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
export type HubDropdownPlacement =
	| 'top-start'
	| 'top'
	| 'top-end'
	| 'start'
	| 'end'
	| 'bottom-start'
	| 'bottom'
	| 'bottom-end';
