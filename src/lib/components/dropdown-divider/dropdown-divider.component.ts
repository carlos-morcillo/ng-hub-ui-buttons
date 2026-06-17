import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Horizontal separator for grouping items inside HubDropdownPanelComponent. */
@Component({
	selector: 'hub-dropdown-divider',
	standalone: true,
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'hub-dropdown-divider',
		role: 'separator',
		'aria-hidden': 'true'
	},
	styles: [
		`
			:host {
				display: block;
				height: 1px;
				background: var(--hub-dropdown-divider-color, var(--hub-sys-color-border-subtle, #e2e8f0));
				margin: 0.25rem 0;
			}
		`
	]
})
export class HubDropdownDividerComponent {}
