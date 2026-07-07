import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, inject, input, model, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { resolveHubAccent } from 'ng-hub-ui-utils';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HubFabPosition, HubFabSize, HubSemanticColor } from '../../models/button.types';

/**
 * FAB that expands a stack of HubSpeedDialItemComponent children on click or hover.
 * Supports 4 expansion directions and all 9 FAB viewport positions.
 * Closes automatically on Escape key press.
 */
@Component({
	selector: 'hub-speed-dial',
	standalone: true,
	templateUrl: './speed-dial.component.html',
	styleUrl: './speed-dial.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'hub-speed-dial',
		'[class]': '_hostClass'
	}
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

	/**
	 * The semantic accent painted on the inner `.hub-fab` trigger button through its
	 * `--hub-fab-accent` slot. Accepts ANY colour: a bareword (a built-in semantic
	 * name, a host-registered accent or a CSS named colour) resolves to its
	 * `--hub-sys-color-<name>` token with the bareword as the raw fallback, so
	 * unregistered names still paint; a literal (`#hex`, `rgb()`, `oklch()`,
	 * `var(...)`) is passed through unchanged. Built-in `hub-fab-<color>` classes on
	 * the trigger keep overriding the background, so this slot only paints custom /
	 * literal colours.
	 */
	protected get _accent(): string | null {
		return resolveHubAccent(this.color());
	}

	constructor() {
		// Escape-to-close relies on DOM events; inert on the server (SSR/prerender).
		if (isPlatformBrowser(inject(PLATFORM_ID))) {
			fromEvent<KeyboardEvent>(inject(DOCUMENT), 'keydown')
				.pipe(
					filter((e) => e.key === 'Escape' && this.isOpen()),
					takeUntilDestroyed(this._destroyRef)
				)
				.subscribe(() => this.close());
		}
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
