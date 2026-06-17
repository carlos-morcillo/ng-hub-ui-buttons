import { InjectionToken, Signal } from '@angular/core';

/**
 * Context shared between HubDropdownDirective and its panel/item descendants.
 * Injected by the directive; consumed by HubDropdownPanelComponent and
 * HubDropdownItemComponent to implement closeOnSelect without prop drilling.
 */
export interface DropdownContext {
	/** Whether clicking an item should close the dropdown. */
	readonly closeOnSelect: Signal<boolean>;
	/** Imperatively close the dropdown. */
	close(): void;
}

/** Injection token for DropdownContext. */
export const DROPDOWN_CONTEXT = new InjectionToken<DropdownContext>('HubDropdownContext');
