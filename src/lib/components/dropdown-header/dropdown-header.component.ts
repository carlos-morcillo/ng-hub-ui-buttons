import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Group label for organizing items inside HubDropdownPanelComponent. */
@Component({
	selector: 'hub-dropdown-header',
	standalone: true,
	template: `<ng-content></ng-content>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'hub-dropdown-header' },
	styles: [
		`
			:host {
				display: block;
				padding: 0.375rem var(--hub-dropdown-header-padding-x, 0.875rem) 0.1875rem;
				font-size: var(--hub-dropdown-header-font-size, 0.6875rem);
				font-weight: 700;
				color: var(--hub-dropdown-header-color, var(--hub-sys-color-text-subtle, #94a3b8));
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
		`
	]
})
export class HubDropdownHeaderComponent {}
