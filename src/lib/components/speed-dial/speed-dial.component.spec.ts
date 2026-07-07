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
});
