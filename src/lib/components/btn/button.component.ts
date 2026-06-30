import { ChangeDetectionStrategy, Component, HostBinding, computed, input } from '@angular/core';
import { HubBtnSize, HubBtnVariant, HubSemanticColor } from '../../models/button.types';

/**
 * Styled button. Applies `hub-btn` CSS classes computed from signal inputs and
 * renders an optional loading spinner around the projected content.
 *
 * Usable in two interchangeable forms from the same class:
 * - As an element: `<hub-button variant="solid" color="primary">Save</hub-button>`.
 * - As an attribute on any host: `<button hubButton>Save</button>` / `<a hubButton href="…">Link</a>`.
 *
 * Prefer the attribute form on a native `<button>` / `<a>` when you need real button
 * semantics (focus, keyboard activation, form submission); the `<hub-button>` element is
 * a styling host without native button behaviour.
 */
@Component({
	selector: 'hub-button, [hubButton]',
	standalone: true,
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'hub-btn' }
})
export class HubButtonComponent {
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
