import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, inject, input, model, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HubFabPosition, HubFabSize, HubSemanticColor } from '../../models/button.types';
import { HubSpeedDialItemComponent } from './speed-dial-item/speed-dial-item.component';

/**
 * FAB that expands a stack of HubSpeedDialItemComponent children on click or hover.
 * Supports 4 expansion directions and all 9 FAB viewport positions.
 * Closes automatically on Escape key press.
 */
@Component({
	selector: 'hub-speed-dial',
	standalone: true,
	imports: [HubSpeedDialItemComponent],
	templateUrl: './speed-dial.component.html',
	styleUrl: './speed-dial.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'hub-speed-dial' }
})
export class HubSpeedDialComponent {
	color = input<HubSemanticColor>('primary');
	size = input<HubFabSize>('standard');
	position = input<HubFabPosition>('bottom-end');
	direction = input<'up' | 'down' | 'left' | 'right'>('up');
	trigger = input<'click' | 'hover'>('click');
	isOpen = model(false);
	opened = output<void>();
	closed = output<void>();

	private readonly _destroyRef = inject(DestroyRef);

	@HostBinding('class')
	protected get _hostClass(): string {
		return [
			`hub-speed-dial-${this.color()}`,
			`hub-speed-dial-${this.position()}`,
			`hub-speed-dial-${this.direction()}`,
			this.isOpen() ? 'hub-speed-dial-open' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	constructor() {
		fromEvent<KeyboardEvent>(document, 'keydown')
			.pipe(
				filter((e) => e.key === 'Escape' && this.isOpen()),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => this.close());
	}

	/** Toggle the speed dial open/closed. */
	toggle(): void {
		this.isOpen() ? this.close() : this.open();
	}

	/** Open the speed dial and emit the opened event. */
	open(): void {
		this.isOpen.set(true);
		this.opened.emit();
	}

	/** Close the speed dial and emit the closed event. */
	close(): void {
		this.isOpen.set(false);
		this.closed.emit();
	}
}
