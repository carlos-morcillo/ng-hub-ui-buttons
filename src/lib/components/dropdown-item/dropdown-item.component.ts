import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';
import { resolveHubAccent } from 'ng-hub-ui-utils';
import { HubSemanticColor } from '../../models/button.types';

/**
 * Menu item for use inside HubDropdownPanelComponent.
 * Emits itemClick when activated. Supports an optional icon, selected state and semantic color.
 */
@Component({
	selector: 'hub-dropdown-item',
	standalone: true,
	templateUrl: './dropdown-item.component.html',
	styleUrl: './dropdown-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'hub-dropdown-item',
		'[class]': '_hostClass',
		'[style.--hub-dropdown-item-accent]': '_accent'
	}
})
export class HubDropdownItemComponent {
	color = input<HubSemanticColor | 'default'>('default');
	/** Optional CSS class of the icon rendered before the label (e.g. `'bi bi-pencil'`). */
	icon = input<string>();
	/**
	 * Makes the item inert.
	 *
	 * Transformed, so the bare HTML form works: `<hub-dropdown-item disabled>` passes the
	 * empty string an attribute without a value carries, which an untransformed
	 * `input(false)` rejects at compile time. Same for {@link selected}.
	 */
	disabled = input(false, { transform: booleanAttribute });
	/** Shows a checkmark indicator when selected. */
	selected = input(false, { transform: booleanAttribute });
	itemClick = output<void>();

	protected get _hostClass(): string {
		return [
			this.color() !== 'default' ? `hub-dropdown-item-${this.color()}` : '',
			this.disabled() ? 'hub-dropdown-item-disabled' : '',
			this.selected() ? 'hub-dropdown-item-selected' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	/**
	 * The semantic accent painted as the item label colour through the
	 * `--hub-dropdown-item-accent` slot. Accepts ANY colour: a bareword (a built-in
	 * semantic name, a host-registered accent or a CSS named colour) resolves to its
	 * `--hub-sys-color-<name>` token with the bareword as the raw fallback, so
	 * unregistered names still paint; a literal (`#hex`, `rgb()`, `oklch()`,
	 * `var(...)`) is passed through unchanged. Returns `null` for the `default`
	 * colour (the item inherits its colour) and for the built-in classes, which
	 * paint themselves — the slot only takes effect for custom / literal colours.
	 */
	protected get _accent(): string | null {
		return this.color() === 'default' ? null : resolveHubAccent(this.color());
	}

	protected _handleClick(): void {
		if (this.disabled()) return;
		this.itemClick.emit();
	}
}
