import { Component, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubButtonComponent } from './button.component';

describe('HubButtonComponent', () => {
	let fixture: ComponentFixture<HubButtonComponent>;
	let ref: ComponentRef<HubButtonComponent>;
	let el: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({}).compileComponents();
		fixture = TestBed.createComponent(HubButtonComponent);
		ref = fixture.componentRef;
		el = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('should have hub-btn class on host', () => {
		expect(el.classList).toContain('hub-btn');
	});

	it('should apply variant class (default: solid)', () => {
		expect(el.classList).toContain('hub-btn-solid');
	});

	it('should apply color class (default: primary)', () => {
		expect(el.classList).toContain('hub-btn-primary');
	});

	it('should apply size class (default: md)', () => {
		expect(el.classList).toContain('hub-btn-md');
	});

	it('should apply hub-btn-danger when color=danger', () => {
		ref.setInput('color', 'danger');
		fixture.detectChanges();
		expect(el.classList).toContain('hub-btn-danger');
	});

	it('should apply hub-btn-outline when variant=outline', () => {
		ref.setInput('variant', 'outline');
		fixture.detectChanges();
		expect(el.classList).toContain('hub-btn-outline');
	});


	it('should apply hub-btn-loading when loading=true', () => {
		ref.setInput('loading', true);
		fixture.detectChanges();
		expect(el.classList).toContain('hub-btn-loading');
	});

	it('should set disabled attribute when disabled=true', () => {
		ref.setInput('disabled', true);
		fixture.detectChanges();
		expect(el.hasAttribute('disabled')).toBe(true);
	});
});

@Component({
	standalone: true,
	imports: [HubButtonComponent],
	template: `<button hubButton variant="outline" color="danger" [loading]="true">Go</button>`
})
class AttributeHostComponent {}

describe('HubButtonComponent — [hubButton] attribute form', () => {
	let btn: HTMLButtonElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [AttributeHostComponent] }).compileComponents();
		const fixture = TestBed.createComponent(AttributeHostComponent);
		fixture.detectChanges();
		btn = fixture.nativeElement.querySelector('button');
	});

	it('attaches to a native <button> without replacing the tag', () => {
		expect(btn).toBeTruthy();
		expect(btn.tagName).toBe('BUTTON');
	});

	it('applies the computed hub-btn classes to the native host', () => {
		expect(btn.classList).toContain('hub-btn');
		expect(btn.classList).toContain('hub-btn-outline');
		expect(btn.classList).toContain('hub-btn-danger');
		expect(btn.classList).toContain('hub-btn-loading');
	});

	it('renders the loading spinner inside the native button (component template)', () => {
		expect(btn.querySelector('.hub-btn__spinner')).toBeTruthy();
	});

	it('projects the button label', () => {
		expect(btn.textContent).toContain('Go');
	});
});
