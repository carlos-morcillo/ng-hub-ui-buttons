import { Component, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubDropdownDirective } from './dropdown.directive';

/**
 * Two panels open at once is a page with two menus and one pointer.
 *
 * Closing on click-outside already made a second dropdown *usually* replace the first,
 * since opening it is itself a click outside the first. Usually is not a guarantee: a
 * dropdown opened from code produces no such click — a keyboard shortcut, a menu restored
 * after a re-render, a table row opening its own — and both panels stay up.
 *
 * A table is where this stops being theoretical: every row has the same menu, and they
 * are all one component away from being opened without anybody clicking.
 */
@Component({
	standalone: true,
	imports: [HubDropdownDirective],
	template: `
		<button [hubDropdown]="first">one</button>
		<ng-template #first><span>first panel</span></ng-template>

		<button [hubDropdown]="second">two</button>
		<ng-template #second><span>second panel</span></ng-template>

		<button [hubDropdown]="third">three</button>
		<ng-template #third><span>third panel</span></ng-template>
	`
})
class ThreeMenus {
	readonly dropdowns = viewChildren(HubDropdownDirective);
}

describe('only one dropdown open at a time', () => {
	let fixture: ComponentFixture<ThreeMenus>;
	let menus: readonly HubDropdownDirective[];

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [ThreeMenus] }).compileComponents();

		fixture = TestBed.createComponent(ThreeMenus);
		fixture.detectChanges();
		menus = fixture.componentInstance.dropdowns();
	});

	afterEach(() => menus.forEach((menu) => menu.close()));

	it('closes the one that was open when another opens from code', () => {
		menus[0].open();
		menus[1].open();

		expect(menus[0].isOpen()).toBe(false);
		expect(menus[1].isOpen()).toBe(true);
	});

	it('never leaves two up, however many are opened', () => {
		menus.forEach((menu) => menu.open());

		expect(menus.filter((menu) => menu.isOpen()).length).toBe(1);
		expect(menus[2].isOpen()).toBe(true);
	});

	/** Closing the last one leaves nothing recorded, so the next open closes nothing. */
	it('reopens cleanly after everything is closed', () => {
		menus[0].open();
		menus[0].close();
		menus[1].open();

		expect(menus[1].isOpen()).toBe(true);
		expect(menus[0].isOpen()).toBe(false);
	});

	/**
	 * A menu destroyed while open must not stay recorded as the open one.
	 *
	 * A table row is the ordinary way this happens: the row is redrawn or the page
	 * navigates away while its menu is up. Left recorded, the next dropdown to open
	 * anywhere would call `close()` on a destroyed instance — which emits `closed` on an
	 * `OutputRef` nobody owns any more, and Angular says so with NG0953.
	 */
	it('forgets a menu destroyed while it was open', () => {
		menus[0].open();

		// Watched on the instance rather than on its `closed` output: Angular refuses to
		// deliver an emission from a destroyed `OutputRef` — that refusal is the NG0953
		// itself — so a subscriber would see nothing either way. What has to be true is
		// that nobody reaches into the destroyed directive at all.
		const reachedInto = vi.spyOn(menus[0], 'close');

		fixture.destroy();

		const otra = TestBed.createComponent(ThreeMenus);
		otra.detectChanges();
		otra.componentInstance.dropdowns()[0].open();

		expect(reachedInto).not.toHaveBeenCalled();

		otra.destroy();
	});

	it('emits closed on the one it displaces', () => {
		let closedCount = 0;
		menus[0].closed.subscribe(() => closedCount++);

		menus[0].open();
		menus[1].open();

		expect(closedCount).toBe(1);
	});
});
