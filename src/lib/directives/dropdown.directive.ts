import {
	DestroyRef,
	Directive,
	ElementRef,
	TemplateRef,
	ViewContainerRef,
	inject,
	input,
	model,
	output,
	signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OverlayService } from 'ng-hub-ui-utils';
import type { OverlayRef, ConnectionPosition } from 'ng-hub-ui-utils';
import { HubDropdownPlacement } from '../models/button.types';

/**
 * Turns any host element into a dropdown trigger.
 * Renders an ng-template in a body-level overlay managed by OverlayService (no CDK).
 * When closeOnSelect is true, any click inside the panel closes the overlay automatically.
 */
@Directive({
	selector: '[hubDropdown]',
	standalone: true,
	exportAs: 'hubDropdown',
	host: {
		'(click)': '_onHostClick()',
		'(mouseenter)': '_onHostEnter()',
		'(mouseleave)': '_onHostLeave()'
	}
})
export class HubDropdownDirective {
	/** The ng-template to render inside the overlay panel. */
	tpl = input.required<TemplateRef<any>>({ alias: 'hubDropdown' });
	placement = input<HubDropdownPlacement>('bottom-start');
	trigger = input<'click' | 'hover'>('click');
	/** When true, any click inside the panel content closes the dropdown. */
	closeOnSelect = input(true);
	disabled = input(false);
	/** Vertical offset in pixels between the trigger and the panel. */
	offsetY = input(4);
	panelClass = input('');
	isOpen = model(false);
	opened = output<void>();
	closed = output<void>();

	private _overlayRef: OverlayRef | null = null;

	private readonly _el = inject(ElementRef<HTMLElement>);
	private readonly _vcr = inject(ViewContainerRef);
	private readonly _overlay = inject(OverlayService);
	private readonly _destroyRef = inject(DestroyRef);

	constructor() {
		fromEvent<KeyboardEvent>(document, 'keydown')
			.pipe(
				filter((e) => e.key === 'Escape' && this.isOpen()),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => this.close());
	}

	/** Open the dropdown and mount the overlay. */
	open(): void {
		if (this.disabled() || this.isOpen()) return;

		const positionStrategy = this._overlay.position().flexibleConnectedTo(this._el).withPositions(this._buildPositions());

		const panelClasses = ['hub-dropdown-overlay'];
		if (this.panelClass()) panelClasses.push(this.panelClass());

		this._overlayRef = this._overlay.create({ positionStrategy, panelClass: panelClasses });

		const panelEl = this._overlayRef.attach(this.tpl(), this._vcr);

		// Close on click-outside via backdrop
		this._overlayRef.onBackdropClick(() => this.close());

		// Close on click-inside when closeOnSelect is true
		if (this.closeOnSelect() && panelEl) {
			fromEvent<MouseEvent>(panelEl, 'click')
				.pipe(take(1), takeUntilDestroyed(this._destroyRef))
				.subscribe(() => this.close());
		}

		this.isOpen.set(true);
		this.opened.emit();

		// Click-outside detection (document-level)
		fromEvent<MouseEvent>(document, 'click')
			.pipe(
				filter((e) => !this._el.nativeElement.contains(e.target as Node) && !!this._overlayRef?.hasAttached()),
				take(1),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => this.close());
	}

	/** Close the dropdown and destroy the overlay. */
	close(): void {
		if (!this.isOpen()) return;
		this._overlayRef?.detach();
		this._overlayRef?.dispose();
		this._overlayRef = null;
		this.isOpen.set(false);
		this.closed.emit();
	}

	/** Toggle between open and closed. */
	toggle(): void {
		this.isOpen() ? this.close() : this.open();
	}

	protected _onHostClick(): void {
		if (this.trigger() === 'click') this.toggle();
	}

	protected _onHostEnter(): void {
		if (this.trigger() === 'hover') this.open();
	}

	protected _onHostLeave(): void {
		if (this.trigger() === 'hover') this.close();
	}

	/**
	 * Translates HubDropdownPlacement tokens to ConnectionPosition arrays.
	 * The OverlayPosition tries each entry in order, using the first that fits.
	 */
	private _buildPositions(): ConnectionPosition[] {
		const o = this.offsetY();
		const map: Record<HubDropdownPlacement, ConnectionPosition[]> = {
			'bottom-start': [{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: o }],
			bottom: [{ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: o }],
			'bottom-end': [{ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: o }],
			'top-start': [{ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -o }],
			top: [{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -o }],
			'top-end': [{ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -o }],
			start: [{ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -o }],
			end: [{ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: o }]
		};
		return map[this.placement()];
	}
}
