import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
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
	host: { class: 'hub-dropdown-item' }
})
export class HubDropdownItemComponent {
	color = input<HubSemanticColor | 'default'>('default');
	/** Optional icon character or ligature displayed before the label. */
	icon = input<string>();
	disabled = input(false);
	/** Shows a checkmark indicator when selected. */
	selected = input(false);
	itemClick = output<void>();

	@HostBinding('class')
	protected get _hostClass(): string {
		return [
			this.color() !== 'default' ? `hub-dropdown-item-${this.color()}` : '',
			this.disabled() ? 'hub-dropdown-item-disabled' : '',
			this.selected() ? 'hub-dropdown-item-selected' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	protected _handleClick(): void {
		if (this.disabled()) return;
		this.itemClick.emit();
	}
}
