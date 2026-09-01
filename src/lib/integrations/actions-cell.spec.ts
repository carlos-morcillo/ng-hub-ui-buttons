import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubActionsCellComponent } from './actions-cell.component';
import { HubActionsCellConfig } from './actions.types';

/**
 * Row actions sit inside things that are themselves clickable.
 *
 * A table whose rows open a detail page is the ordinary case, and there the click on an
 * action reaches the row unless something stops it: the action runs, the route changes,
 * and whatever the action did is lost with the screen it happened on. The markup this
 * replaces stopped the click; the description that replaced it carries no event, so the
 * stopping has to live here.
 */
@Component({
	standalone: true,
	imports: [HubActionsCellComponent],
	template: `
		<div class="row" (click)="rowClicks.set(rowClicks() + 1)">
			<hub-actions-cell [config]="config()" />
		</div>
	`
})
class ClickableRow {
	readonly rowClicks = signal(0);
	readonly config = signal<HubActionsCellConfig>({ actions: [] });
}

describe('actions cell inside a clickable row', () => {
	let fixture: ComponentFixture<ClickableRow>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [ClickableRow] }).compileComponents();
		fixture = TestBed.createComponent(ClickableRow);
	});

	/** The first button rendered inside the cell. */
	function firstButton(): HTMLButtonElement {
		return fixture.nativeElement.querySelector('hub-actions-cell button') as HTMLButtonElement;
	}

	it('runs the action without clicking the row it sits in', () => {
		let ran = 0;
		fixture.componentInstance.config.set({
			actions: [{ kind: 'button', icon: 'i-eye', disabled: false, onSelect: () => ran++ }]
		});
		fixture.detectChanges();

		firstButton().click();

		expect(ran).toBe(1);
		expect(fixture.componentInstance.rowClicks()).toBe(0);
	});

	it('does not click the row when opening a menu either', () => {
		fixture.componentInstance.config.set({
			actions: [
				{
					kind: 'menu',
					icon: 'i-dots',
					disabled: false,
					items: [{ label: 'Edit', disabled: false, onSelect: () => undefined }]
				}
			]
		});
		fixture.detectChanges();

		firstButton().click();

		expect(fixture.componentInstance.rowClicks()).toBe(0);
	});

	it('runs nothing for a refused action, and still spares the row', () => {
		let ran = 0;
		fixture.componentInstance.config.set({
			actions: [{ kind: 'button', icon: 'i-trash', disabled: true, onSelect: () => ran++ }]
		});
		fixture.detectChanges();

		// Dispatched rather than `.click()`, because a disabled button ignores the latter
		// and the point is what happens if the event arrives anyway.
		firstButton().dispatchEvent(new MouseEvent('click', { bubbles: true }));

		expect(ran).toBe(0);
		expect(fixture.componentInstance.rowClicks()).toBe(0);
	});

	it('draws a refused action rather than hiding it', () => {
		fixture.componentInstance.config.set({
			actions: [{ kind: 'button', icon: 'i-trash', disabled: true, onSelect: () => undefined }]
		});
		fixture.detectChanges();

		expect(firstButton()).toBeTruthy();
		expect(firstButton().disabled).toBe(true);
	});
});
