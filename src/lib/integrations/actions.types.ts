/**
 * Framework-neutral description of one table row's actions.
 *
 * The shape mirrors (structurally) the contract other ng-hub-ui libraries expose for
 * optional action hosting — `ng-hub-ui-paginable`'s `HubPaginableActionsAdapter` — so
 * this adapter can be wired into them without either package importing the other. It is
 * the same arrangement `hubFormControlAdapter` already uses for the table's inputs.
 *
 * Everything here is already resolved for the row: no predicates, no streams. A host
 * library that lets consumers write those resolves them before describing the cell.
 */

/** Where a menu panel opens relative to its trigger. */
export type HubRowMenuPlacement = 'top-start' | 'top' | 'top-end' | 'start' | 'end' | 'bottom-start' | 'bottom' | 'bottom-end';

/** One thing a person can do to a row. */
export interface HubRowActionItem {
	icon?: string;
	label?: string;
	tooltip?: string;
	variant?: string;
	color?: string;
	/** Drawn and refused — not absent. An absence cannot say «not right now». */
	disabled: boolean;
	onSelect: () => void;
}

export interface HubRowButtonAction extends HubRowActionItem {
	kind: 'button';
}

export interface HubRowMenuAction extends Omit<HubRowActionItem, 'onSelect'> {
	kind: 'menu';
	placement?: HubRowMenuPlacement;
	items: ReadonlyArray<HubRowActionItem>;
}

export type HubRowAction = HubRowButtonAction | HubRowMenuAction;

export interface HubActionsCellConfig {
	actions: ReadonlyArray<HubRowAction>;
}

/** Live handle to the actions created by {@link hubActionsAdapter}. */
export interface HubActionsHandle {
	update(config: HubActionsCellConfig): void;
	destroy(): void;
}

/** What a host library injects to have its row actions drawn by this library. */
export interface HubActionsAdapter {
	create(container: unknown, config: HubActionsCellConfig): HubActionsHandle;
}
