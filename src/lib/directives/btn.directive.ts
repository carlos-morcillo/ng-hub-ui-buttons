import { Directive, HostBinding, input } from '@angular/core';
import { HubBtnSize, HubBtnVariant, HubSemanticColor } from '../models/button.types';

/**
 * Applies hub-btn styles to any host element (button, a, div, etc.).
 * Use this when the element type must stay native and cannot be replaced by <hub-btn>.
 * Exposes the same inputs as HubBtnComponent.
 */
@Directive({
	selector: '[hubBtn]',
	standalone: true,
	host: { class: 'hub-btn' }
})
export class HubBtnDirective {
	variant = input<HubBtnVariant>('solid');
	color = input<HubSemanticColor>('primary');
	size = input<HubBtnSize>('md');
	iconOnly = input(false);
	loading = input(false);
	disabled = input(false);

	@HostBinding('class')
	protected get _hostClass(): string {
		return [
			`hub-btn-${this.variant()}`,
			`hub-btn-${this.color()}`,
			`hub-btn-${this.size()}`,
			this.iconOnly() ? 'hub-btn-icon' : '',
			this.loading() ? 'hub-btn-loading' : '',
			this.disabled() ? 'hub-btn-disabled' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	@HostBinding('attr.disabled')
	protected get _disabledAttr(): true | null {
		return this.disabled() ? true : null;
	}
}
