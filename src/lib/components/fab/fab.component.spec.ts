import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubFabComponent } from './fab.component';

describe('HubFabComponent', () => {
	let fixture: ComponentFixture<HubFabComponent>;
	let ref: ComponentRef<HubFabComponent>;
	let el: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({}).compileComponents();
		fixture = TestBed.createComponent(HubFabComponent);
		ref = fixture.componentRef;
		el = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should have hub-fab base class on host', () => {
		expect(el.classList).toContain('hub-fab');
	});

	it('should apply hub-fab-standard size class by default', () => {
		expect(el.classList).toContain('hub-fab-standard');
	});

	it('should apply hub-fab-primary color class by default', () => {
		expect(el.classList).toContain('hub-fab-primary');
	});

	it('should apply hub-fab-bottom-end position class by default', () => {
		expect(el.classList).toContain('hub-fab-bottom-end');
	});

	it('should apply hub-fab-extended class when extended=true', () => {
		ref.setInput('extended', true);
		fixture.detectChanges();
		expect(el.classList).toContain('hub-fab-extended');
	});

	it('should apply hub-fab-center position class', () => {
		ref.setInput('position', 'center');
		fixture.detectChanges();
		expect(el.classList).toContain('hub-fab-center');
	});

	it('should apply hub-fab-mini size class', () => {
		ref.setInput('size', 'mini');
		fixture.detectChanges();
		expect(el.classList).toContain('hub-fab-mini');
	});

	it('resolves a semantic color to its sys token on --hub-fab-accent', () => {
		ref.setInput('color', 'primary');
		fixture.detectChanges();
		expect(el.style.getPropertyValue('--hub-fab-accent')).toBe('var(--hub-sys-color-primary, primary)');
	});

	it('passes a literal color through unchanged on --hub-fab-accent', () => {
		ref.setInput('color', '#ff0000');
		fixture.detectChanges();
		expect(el.style.getPropertyValue('--hub-fab-accent')).toBe('#ff0000');
	});
});
