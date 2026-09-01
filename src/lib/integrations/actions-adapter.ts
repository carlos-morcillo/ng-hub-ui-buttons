import { ViewContainerRef } from '@angular/core';
import { HubActionsCellComponent } from './actions-cell.component';
import { HubActionsAdapter, HubActionsCellConfig, HubActionsHandle } from './actions.types';

/**
 * Draws a host library's row actions with this library's button and dropdown.
 *
 * Register it where the host expects it — for `ng-hub-ui-paginable`:
 *
 * ```ts
 * import { provideHubPaginableActions } from 'ng-hub-ui-paginable';
 * import { hubActionsAdapter } from 'ng-hub-ui-buttons';
 *
 * providers: [provideHubPaginableActions(hubActionsAdapter)];
 * ```
 *
 * The host describes each row's actions in neutral terms and this maps them onto the
 * real components, so neither package imports the other and the application is the only
 * place that knows both exist.
 */
export const hubActionsAdapter: HubActionsAdapter = {
	create(container: unknown, config: HubActionsCellConfig): HubActionsHandle {
		const ref = (container as ViewContainerRef).createComponent(HubActionsCellComponent);
		ref.setInput('config', config);

		return {
			update(next: HubActionsCellConfig): void {
				// A new object every time, so `input.required` sees a change: the host
				// rebuilds the description on each row change and mutating in place would
				// leave an OnPush cell showing the previous row's actions.
				ref.setInput('config', { ...next });
				ref.changeDetectorRef.markForCheck();
			},
			destroy(): void {
				ref.destroy();
			}
		};
	}
};
