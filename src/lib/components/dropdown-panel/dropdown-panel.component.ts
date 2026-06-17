import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { HubSemanticColor } from '../../models/button.types';

/**
 * Styled container for dropdown content.
 * Renders a shadowed panel with an optional semantic color top-border accent.
 * Place hub-dropdown-item, hub-dropdown-divider, and hub-dropdown-header children inside.
 */
@Component({
	selector: 'hub-dropdown-panel',
	standalone: true,
	template: `<ng-content></ng-content>`,
	styleUrl: './dropdown-panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'hub-dropdown-panel' }
})
export class HubDropdownPanelComponent {
	/** Adds a semantic color accent to the panel top border. */
	color = input<HubSemanticColor | 'default'>('default');

	@HostBinding('class')
	protected get _hostClass(): string {
		return this.color() !== 'default' ? `hub-dropdown-panel-${this.color()}` : '';
	}
}
