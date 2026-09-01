import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HubButtonComponent } from '../components/btn/button.component';
import { HubDropdownItemComponent } from '../components/dropdown-item/dropdown-item.component';
import { HubDropdownPanelComponent } from '../components/dropdown-panel/dropdown-panel.component';
import { HubDropdownDirective } from '../directives/dropdown.directive';
import { HubBtnVariant } from '../models/button.types';
import { HubActionsCellConfig, HubRowAction, HubRowMenuAction } from './actions.types';

/** The appearances this library draws; anything else falls back to `soft`. */
const KNOWN_VARIANTS: ReadonlyArray<HubBtnVariant> = ['solid', 'outline', 'soft', 'ghost', 'link'];

/**
 * One table row's actions, drawn with the design system's own button and dropdown.
 *
 * Exists so the adapter can create a single component instead of assembling a directive,
 * a template reference and a panel by hand: `hubDropdown` needs a host element and an
 * `ng-template`, which is natural in a template and awkward imperatively.
 *
 * It knows nothing about tables. Its input is the neutral description a host library
 * hands over, which is what keeps `ng-hub-ui-buttons` free of any dependency on the
 * library that renders it.
 */
@Component({
	selector: 'hub-actions-cell',
	standalone: true,
	imports: [NgClass, HubButtonComponent, HubDropdownDirective, HubDropdownPanelComponent, HubDropdownItemComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@for (action of config().actions; track $index) {
			@if (asMenu(action); as menu) {
				<button
					hubButton
					type="button"
					[variant]="asVariant(menu.variant)"
					[color]="menu.color ?? 'neutral'"
					[disabled]="menu.disabled"
					[attr.title]="menu.tooltip ?? null"
					[attr.aria-label]="menu.tooltip ?? menu.label ?? null"
					[hubDropdown]="panel"
					[placement]="menu.placement ?? 'bottom-end'"
					(click)="$event.stopPropagation()"
				>
					@if (menu.icon) {
						<i [ngClass]="menu.icon" aria-hidden="true"></i>
					}
					@if (menu.label) {
						<span>{{ menu.label }}</span>
					}
				</button>

				<ng-template #panel>
					<hub-dropdown-panel>
						@for (item of menu.items; track $index) {
							<hub-dropdown-item [icon]="item.icon" [disabled]="item.disabled" (itemClick)="item.onSelect()">
								{{ item.label }}
							</hub-dropdown-item>
						}
					</hub-dropdown-panel>
				</ng-template>
			} @else {
				<button
					hubButton
					type="button"
					[variant]="asVariant(action.variant)"
					[color]="action.color ?? 'neutral'"
					[disabled]="action.disabled"
					[attr.title]="action.tooltip ?? null"
					[attr.aria-label]="action.tooltip ?? action.label ?? null"
					(click)="onSelect(action, $event)"
				>
					@if (action.icon) {
						<i [ngClass]="action.icon" aria-hidden="true"></i>
					}
					@if (action.label) {
						<span>{{ action.label }}</span>
					}
				</button>
			}
		}
	`,
	host: {
		class: 'hub-actions-cell',
		style: 'display: inline-flex; align-items: center; gap: var(--hub-ref-space-2, 0.5rem);'
	}
})
export class HubActionsCellComponent {
	readonly config = input.required<HubActionsCellConfig>();

	/**
	 * Narrows an action to a menu, for the template's `@if (…; as menu)`.
	 *
	 * A type guard rather than a `kind` comparison in the template, because the template
	 * cannot narrow a union on its own and would otherwise need a cast at every field.
	 */
	protected asMenu(action: HubRowAction): HubRowMenuAction | null {
		return action.kind === 'menu' ? action : null;
	}

	/**
	 * Narrows the host's open vocabulary onto this library's closed one.
	 *
	 * A host names appearances in its own terms and leaves the type open — the table, for
	 * one, has a `default` that means «the plain bordered button I have always drawn», a
	 * name this library does not have. Anything unrecognised becomes `soft`, which is what
	 * a row action looks like here, rather than a type error in code that works.
	 */
	protected asVariant(variant: string | undefined): HubBtnVariant {
		return KNOWN_VARIANTS.includes(variant as HubBtnVariant) ? (variant as HubBtnVariant) : 'soft';
	}

	/**
	 * Runs the action and keeps the click from reaching the row underneath.
	 *
	 * A host that draws these inside clickable rows — a table whose rows open a detail
	 * page — would otherwise navigate away every time somebody pressed a row action, and
	 * the action's own effect would be lost with the screen it happened on. A click on an
	 * action is never a click on what surrounds it, whoever surrounds it.
	 */
	protected onSelect(action: HubRowAction, event: Event): void {
		event.stopPropagation();

		if (action.kind === 'menu' || action.disabled) {
			return;
		}
		action.onSelect();
	}
}
