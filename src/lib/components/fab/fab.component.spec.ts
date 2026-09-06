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

	it('emits fabClick once when the host is clicked', () => {
		const emitted: void[] = [];
		fixture.componentInstance.fabClick.subscribe((value) => emitted.push(value));

		el.click();

		expect(emitted.length).toBe(1);
	});

	it('does not emit fabClick when disabled', () => {
		let emissions = 0;
		fixture.componentInstance.fabClick.subscribe(() => emissions++);
		ref.setInput('disabled', true);
		fixture.detectChanges();

		el.click();

		expect(emissions).toBe(0);
	});

	/**
	 * The FAB is a custom tag with projected content, so nothing about it is a control
	 * unless it says so: without a role it is announced as plain text, and without a
	 * tabindex no one reaches it without a pointer.
	 */
	describe('keyboard and assistive tech', () => {
		it('announces itself as a button', () => {
			expect(el.getAttribute('role')).toBe('button');
		});

		it('is in the tab order', () => {
			expect(el.getAttribute('tabindex')).toBe('0');
		});

		it('leaves the tab order and reports aria-disabled when disabled', () => {
			ref.setInput('disabled', true);
			fixture.detectChanges();

			expect(el.getAttribute('tabindex')).toBe('-1');
			expect(el.getAttribute('aria-disabled')).toBe('true');
		});

		it('says nothing about aria-disabled while enabled', () => {
			expect(el.getAttribute('aria-disabled')).toBeNull();
		});

		it('emits fabClick on Enter', () => {
			let emissions = 0;
			fixture.componentInstance.fabClick.subscribe(() => emissions++);

			el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

			expect(emissions).toBe(1);
		});

		it('emits fabClick on Space and swallows the page scroll', () => {
			let emissions = 0;
			fixture.componentInstance.fabClick.subscribe(() => emissions++);
			const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });

			el.dispatchEvent(event);

			expect(emissions).toBe(1);
			expect(event.defaultPrevented).toBe(true);
		});

		it('ignores Enter while disabled', () => {
			let emissions = 0;
			fixture.componentInstance.fabClick.subscribe(() => emissions++);
			ref.setInput('disabled', true);
			fixture.detectChanges();

			el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

			expect(emissions).toBe(0);
		});
	});
});
