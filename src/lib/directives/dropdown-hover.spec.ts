import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HubDropdownDirective } from './dropdown.directive';

/**
 * A hover menu the pointer cannot reach is a menu with no items.
 *
 * The panel hangs off the body and sits `offsetY` pixels away from its trigger, so the trip
 * from one to the other crosses ground that belongs to neither: the trigger fires
 * `mouseleave` before the panel fires `mouseenter`. Closing on that first event left every
 * item unreachable, so leaving now only starts a grace period, and arriving on the panel
 * cancels it.
 */
@Component({
	standalone: true,
	imports: [HubDropdownDirective],
	template: `
		<button [hubDropdown]="tpl" [trigger]="'hover'" [closeOnSelect]="false">Open</button>
		<ng-template #tpl>
			<div class="panel">
				<button class="item" type="button" (click)="picked = true">Item</button>
			</div>
		</ng-template>
	`
})
class HoverMenu {
	picked = false;
}

/** Comfortably past the directive's grace period. */
const AFTER_GRACE = 500;

describe('dropdown hover trigger', () => {
	let fixture: ComponentFixture<HoverMenu>;
	let menu: HubDropdownDirective;
	let trigger: HTMLElement;

	const panel = () => document.querySelector<HTMLElement>('.panel')!;
	const enter = (target: HTMLElement) => target.dispatchEvent(new MouseEvent('mouseenter'));
	const leave = (target: HTMLElement) => target.dispatchEvent(new MouseEvent('mouseleave'));

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [HoverMenu] }).compileComponents();

		fixture = TestBed.createComponent(HoverMenu);
		fixture.detectChanges();
		menu = fixture.debugElement.query(By.directive(HubDropdownDirective)).injector.get(HubDropdownDirective);
		trigger = fixture.nativeElement.querySelector('button');

		// Only the two the grace period is built on: the overlay's own scheduling stays real.
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
	});

	afterEach(() => {
		vi.useRealTimers();
		menu.close();
	});

	it('opens when the pointer enters the trigger', () => {
		enter(trigger);

		expect(menu.isOpen()).toBe(true);
	});

	it('lets the pointer cross the gap and click an item', () => {
		enter(trigger);
		fixture.detectChanges();

		leave(trigger);
		enter(panel());
		vi.advanceTimersByTime(AFTER_GRACE);

		expect(menu.isOpen()).toBe(true);

		panel().querySelector<HTMLElement>('.item')!.click();

		expect(fixture.componentInstance.picked).toBe(true);
		expect(menu.isOpen()).toBe(true);
	});

	it('closes once the pointer leaves the panel too', () => {
		enter(trigger);
		fixture.detectChanges();

		leave(trigger);
		enter(panel());
		leave(panel());
		vi.advanceTimersByTime(AFTER_GRACE);

		expect(menu.isOpen()).toBe(false);
	});

	it('closes when the pointer leaves the trigger and arrives nowhere', () => {
		enter(trigger);
		fixture.detectChanges();

		leave(trigger);
		vi.advanceTimersByTime(AFTER_GRACE);

		expect(menu.isOpen()).toBe(false);
	});

	it('stays open when the pointer comes back to the trigger within the grace period', () => {
		enter(trigger);
		fixture.detectChanges();

		leave(trigger);
		enter(trigger);
		vi.advanceTimersByTime(AFTER_GRACE);

		expect(menu.isOpen()).toBe(true);
	});

	it('does not close a dropdown reopened while an old countdown was running', () => {
		enter(trigger);
		fixture.detectChanges();

		leave(trigger);
		menu.close();
		menu.open();
		vi.advanceTimersByTime(AFTER_GRACE);

		expect(menu.isOpen()).toBe(true);
	});
});
