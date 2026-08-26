import { Component, ComponentRef, signal } from '@angular/core';
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

	it('loading also disables: reflects disabled + aria-busy', () => {
		ref.setInput('loading', true);
		fixture.detectChanges();
		expect(el.hasAttribute('disabled')).toBe(true);
		expect(el.getAttribute('aria-busy')).toBe('true');
	});

	it('does not report aria-busy while idle', () => {
		expect(el.hasAttribute('aria-busy')).toBe(false);
	});

	it('accepts an open-set custom color (hub-btn-<custom> class)', () => {
		ref.setInput('color', 'brand');
		fixture.detectChanges();
		expect(el.classList).toContain('hub-btn-brand');
	});

	it('resolves a semantic color to its sys token on --hub-btn-accent', () => {
		ref.setInput('color', 'primary');
		fixture.detectChanges();
		expect(el.style.getPropertyValue('--hub-btn-accent')).toBe('var(--hub-sys-color-primary, primary)');
	});

	it('passes a literal color through unchanged on --hub-btn-accent', () => {
		ref.setInput('color', '#ff0000');
		fixture.detectChanges();
		expect(el.style.getPropertyValue('--hub-btn-accent')).toBe('#ff0000');
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

	it('does NOT add role/tabindex on the native host (attribute form)', () => {
		expect(btn.hasAttribute('role')).toBe(false);
		expect(btn.hasAttribute('tabindex')).toBe(false);
	});
});

@Component({
	standalone: true,
	imports: [HubButtonComponent],
	template: `<hub-button [disabled]="disabled()" [loading]="loading()">Save</hub-button>`
})
class ElementHostComponent {
	disabled = signal(false);
	loading = signal(false);
}

describe('HubButtonComponent — <hub-button> element form (a11y)', () => {
	let fixture: ComponentFixture<ElementHostComponent>;
	let host: ElementHostComponent;
	let el: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [ElementHostComponent] }).compileComponents();
		fixture = TestBed.createComponent(ElementHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		el = fixture.nativeElement.querySelector('hub-button');
	});

	it('renders as a <hub-button> element that cannot expose native button semantics', () => {
		expect(el.tagName).toBe('HUB-BUTTON');
	});

	it('advertises role=button and a focusable tabindex', () => {
		expect(el.getAttribute('role')).toBe('button');
		expect(el.getAttribute('tabindex')).toBe('0');
	});

	it('drops out of the tab order (tabindex=-1) when disabled', () => {
		host.disabled.set(true);
		fixture.detectChanges();
		expect(el.getAttribute('tabindex')).toBe('-1');
	});

	it('fires a click on Enter', () => {
		let clicks = 0;
		el.addEventListener('click', () => clicks++);
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(clicks).toBe(1);
	});

	it('fires a click on Space and prevents default', () => {
		let clicks = 0;
		el.addEventListener('click', () => clicks++);
		const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
		el.dispatchEvent(event);
		expect(clicks).toBe(1);
		expect(event.defaultPrevented).toBe(true);
	});

	it('does not activate on keydown while disabled', () => {
		host.disabled.set(true);
		fixture.detectChanges();
		let clicks = 0;
		el.addEventListener('click', () => clicks++);
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(clicks).toBe(0);
	});

	it('is inert while loading: tabindex=-1, aria-busy + aria-disabled set', () => {
		host.loading.set(true);
		fixture.detectChanges();
		expect(el.getAttribute('tabindex')).toBe('-1');
		expect(el.getAttribute('aria-busy')).toBe('true');
		expect(el.getAttribute('aria-disabled')).toBe('true');
	});

	it('does not activate on keydown while loading', () => {
		host.loading.set(true);
		fixture.detectChanges();
		let clicks = 0;
		el.addEventListener('click', () => clicks++);
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(clicks).toBe(0);
	});
});
