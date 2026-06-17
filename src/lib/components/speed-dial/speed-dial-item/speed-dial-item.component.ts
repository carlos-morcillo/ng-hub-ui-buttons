import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
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
}
