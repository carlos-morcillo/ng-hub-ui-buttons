import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubSpeedDialComponent } from './speed-dial.component';

describe('HubSpeedDialComponent', () => {
	let fixture: ComponentFixture<HubSpeedDialComponent>;
	let ref: ComponentRef<HubSpeedDialComponent>;
	let component: HubSpeedDialComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({}).compileComponents();
		fixture = TestBed.createComponent(HubSpeedDialComponent);
		ref = fixture.componentRef;
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be closed by default', () => {
		expect(component.isOpen()).toBe(false);
	});

	it('should open on toggle()', () => {
		component.toggle();
		expect(component.isOpen()).toBe(true);
	});

	it('should close on second toggle()', () => {
		component.toggle();
		component.toggle();
		expect(component.isOpen()).toBe(false);
	});

	it('should emit opened output when opened', () => {
		const spy = vi.fn();
		component.opened.subscribe(spy);
		component.toggle();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should emit closed output when closed', () => {
		component.toggle(); // open
		const spy = vi.fn();
		component.closed.subscribe(spy);
		component.toggle(); // close
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('resolves a semantic color to its sys token on the trigger --hub-fab-accent', () => {
		ref.setInput('color', 'primary');
		fixture.detectChanges();
		const trigger: HTMLElement = fixture.nativeElement.querySelector('.hub-fab');
		expect(trigger.style.getPropertyValue('--hub-fab-accent')).toBe('var(--hub-sys-color-primary, primary)');
	});

	it('passes a literal color through unchanged on the trigger --hub-fab-accent', () => {
		ref.setInput('color', '#ff0000');
		fixture.detectChanges();
		const trigger: HTMLElement = fixture.nativeElement.querySelector('.hub-fab');
		expect(trigger.style.getPropertyValue('--hub-fab-accent')).toBe('#ff0000');
	});

	/**
	 * The items sit in a sibling column, one `--hub-speed-dial-gap` away from the trigger.
	 * The browser fires `mouseleave` on the trigger button as soon as the pointer starts
	 * that trip, and only on the host when it leaves the whole control — so the host is the
	 * only boundary that still means "gone".
	 */
	describe('hover trigger', () => {
		let host: HTMLElement;
		let trigger: HTMLElement;

		const enter = (target: HTMLElement) => target.dispatchEvent(new MouseEvent('mouseenter'));
		const leave = (target: HTMLElement) => target.dispatchEvent(new MouseEvent('mouseleave'));

		beforeEach(() => {
			ref.setInput('trigger', 'hover');
			fixture.detectChanges();
			host = fixture.nativeElement;
			trigger = host.querySelector('.hub-fab')!;
		});

		it('opens when the pointer enters the control', () => {
			enter(host);

			expect(component.isOpen()).toBe(true);
		});

		it('stays open while the pointer crosses from the trigger to the actions', () => {
			enter(host);
			fixture.detectChanges();

			leave(trigger);

			expect(component.isOpen()).toBe(true);
		});

		it('closes when the pointer leaves the control altogether', () => {
			enter(host);
			fixture.detectChanges();

			leave(host);

			expect(component.isOpen()).toBe(false);
		});

		it('ignores hover entirely under the click trigger', () => {
			ref.setInput('trigger', 'click');
			fixture.detectChanges();

			enter(host);

			expect(component.isOpen()).toBe(false);
		});
	});
});
