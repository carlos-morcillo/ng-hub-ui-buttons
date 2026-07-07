import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { resolveHubAccent } from 'ng-hub-ui-utils';
import { HubSemanticColor } from '../../../models/button.types';

/**
 * Secondary action item rendered inside HubSpeedDialComponent.
 * Emits itemClick when activated. Supports an optional label tooltip.
 */
@Component({
	selector: 'hub-speed-dial-item',
	standalone: true,
	templateUrl: './speed-dial-item.component.html',
	styleUrl: './speed-dial-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HubSpeedDialItemComponent {
	/** Icon character or ligature string displayed in the action button. */
	icon = input.required<string>();
	/** Tooltip label shown next to the action button. */
	label = input('');
	color = input<HubSemanticColor | 'default'>('default');
	disabled = input(false);
	itemClick = output<void>();

	/**
	 * The semantic accent painted on the action button through its
	 * `--hub-speed-dial-item-accent` slot. Accepts ANY colour: a bareword (a
	 * built-in semantic name, a host-registered accent or a CSS named colour)
	 * resolves to its `--hub-sys-color-<name>` token with the bareword as the raw
	 * fallback, so unregistered names still paint; a literal (`#hex`, `rgb()`,
	 * `oklch()`, `var(...)`) is passed through unchanged. Returns `null` for the
	 * `default` colour and for the built-in classes, which paint themselves — the
	 * slot only takes effect for custom / literal colours.
	 */
	protected get _accent(): string | null {
		return this.color() === 'default' ? null : resolveHubAccent(this.color());
	}
}
