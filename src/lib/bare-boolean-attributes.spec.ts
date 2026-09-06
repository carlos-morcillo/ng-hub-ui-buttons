import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HubDropdownItemComponent } from './components/dropdown-item/dropdown-item.component';
import { HubFabComponent } from './components/fab/fab.component';
import { HubSpeedDialItemComponent } from './components/speed-dial/speed-dial-item/speed-dial-item.component';
import { HubDropdownDirective } from './directives/dropdown.directive';

/**
 * `disabled`, `selected` and friends promise the HTML spelling of a boolean attribute: the
 * name on its own, no value. That spelling passes the empty string, which an untransformed
 * `input(false)` rejects with TS2322 — so the templates in this file are half the
 * assertion. Without `booleanAttribute` on every input below, this spec does not compile.
 */
@Component({
	standalone: true,
	imports: [HubFabComponent, HubSpeedDialItemComponent, HubDropdownItemComponent, HubDropdownDirective],
	template: `
		<hub-fab disabled extended collapseOnScroll>Add</hub-fab>

		<hub-speed-dial-item icon="bi bi-pencil" disabled />

		<hub-dropdown-item disabled selected>Edit</hub-dropdown-item>

		<span class="hover-menu" [hubDropdown]="tpl" closeOnSelect>Menu</span>
		<span class="locked-menu" [hubDropdown]="tpl" disabled>Locked</span>
		<ng-template #tpl><div class="panel">Panel</div></ng-template>
	`
})
class BareAttributes {}

describe('bare boolean attributes', () => {
	let el: HTMLElement;
	let menus: HubDropdownDirective[];

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [BareAttributes] }).compileComponents();

		const fixture = TestBed.createComponent(BareAttributes);
		fixture.detectChanges();
		el = fixture.nativeElement;
		menus = fixture.debugElement
			.queryAll(By.directive(HubDropdownDirective))
			.map((de) => de.injector.get(HubDropdownDirective));
	});

	it('reads them as true on hub-fab', () => {
		const fab = el.querySelector('hub-fab')!;

		expect(fab.classList).toContain('hub-fab-disabled');
		expect(fab.classList).toContain('hub-fab-extended');
	});

	it('reads them as true on hub-speed-dial-item', () => {
		const button = el.querySelector<HTMLButtonElement>('hub-speed-dial-item button')!;

		expect(button.disabled).toBe(true);
	});

	it('reads them as true on hub-dropdown-item', () => {
		const item = el.querySelector('hub-dropdown-item')!;

		expect(item.classList).toContain('hub-dropdown-item-disabled');
		expect(item.classList).toContain('hub-dropdown-item-selected');
	});

	it('reads them as true on hubDropdown', () => {
		const [hover, locked] = menus;

		expect(hover.closeOnSelect()).toBe(true);
		expect(locked.disabled()).toBe(true);
	});

	it('leaves a disabled hubDropdown shut', () => {
		const locked = menus[1];

		locked.open();

		expect(locked.isOpen()).toBe(false);
	});
});
