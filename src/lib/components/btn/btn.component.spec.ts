import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubBtnComponent } from './btn.component';

describe('HubBtnComponent', () => {
	let fixture: ComponentFixture<HubBtnComponent>;
	let ref: ComponentRef<HubBtnComponent>;
	let el: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({}).compileComponents();
		fixture = TestBed.createComponent(HubBtnComponent);
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

	it('should apply hub-btn-icon when iconOnly=true', () => {
		ref.setInput('iconOnly', true);
		fixture.detectChanges();
		expect(el.classList).toContain('hub-btn-icon');
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
