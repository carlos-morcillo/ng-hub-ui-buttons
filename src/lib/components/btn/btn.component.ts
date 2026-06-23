import { ChangeDetectionStrategy, Component, HostBinding, computed, input } from '@angular/core';
import { HubBtnSize, HubBtnVariant, HubSemanticColor } from '../../models/button.types';

/**
 * Styled button component. Applies hub-btn CSS classes computed from signal inputs.
 * Use <hub-button> when the element type can be this component, or [hubButton] directive
 * when a native element (button, a, etc.) must keep its tag.
 */
@Component({
	selector: 'hub-button',
	standalone: true,
	templateUrl: './btn.component.html',
	styleUrl: './btn.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'hub-btn' }
})
export class HubBtnComponent {
	/** Visual style of the button. */
	variant = input<HubBtnVariant>('solid');

	/** Semantic color token. */
	color = input<HubSemanticColor>('primary');

	/** Size token. */
	size = input<HubBtnSize>('md');

	/** When true, enforces equal width/height (icon-only layout). */
	iconOnly = input(false);

	/** When true, shows a spinner and blocks pointer events. */
	loading = input(false);

	/** Mirrors the native disabled attribute on the host element. */
	disabled = input(false);

	/** Computed CSS classes applied to the host element via HostBinding. */
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

	/** Reflects the disabled state as a native HTML attribute. */
	@HostBinding('attr.disabled')
	protected get _disabledAttr(): true | null {
		return this.disabled() ? true : null;
	}
}
