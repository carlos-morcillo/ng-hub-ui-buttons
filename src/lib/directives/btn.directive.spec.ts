import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HubBtnDirective } from './btn.directive';

@Component({
	standalone: true,
	imports: [HubBtnDirective],
	template: `<button hubBtn color="success" variant="outline" size="lg">Click</button>`
})
class TestHostComponent {}

describe('HubBtnDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let el: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
		el = fixture.debugElement.query(By.directive(HubBtnDirective)).nativeElement;
	});

	it('should apply hub-btn base class', () => {
		expect(el.classList).toContain('hub-btn');
	});

	it('should apply hub-btn-outline class', () => {
		expect(el.classList).toContain('hub-btn-outline');
	});

	it('should apply hub-btn-success class', () => {
		expect(el.classList).toContain('hub-btn-success');
	});

	it('should apply hub-btn-lg class', () => {
		expect(el.classList).toContain('hub-btn-lg');
	});
});
