import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	OnInit,
	ViewEncapsulation,
	inject,
	input,
	output,
	signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { resolveHubAccent } from 'ng-hub-ui-utils';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HubFabPosition, HubFabSize, HubSemanticColor } from '../../models/button.types';

/**
 * Floating Action Button component. Renders fixed in the viewport at the given position.
 * Supports circular and extended (pill with label) variants.
 * When collapseOnScroll is true, an extended FAB collapses to icon-only after 50px scroll.
 * Uses inset-inline-* / inset-block-* CSS logical properties for RTL support.
 */
@Component({
	selector: 'hub-fab',
	standalone: true,
	templateUrl: './fab.component.html',
	styleUrl: './fab.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'hub-fab',
		'[class]': '_hostClass',
		'[style.--hub-fab-accent]': '_accent'
	},
	encapsulation: ViewEncapsulation.None
})
export class HubFabComponent implements OnInit {
	color = input<HubSemanticColor>('primary');
	size = input<HubFabSize>('standard');
	extended = input(false);
	/** Fixed viewport position. 9-slot grid including center. */
	position = input<HubFabPosition>('bottom-end');
	/** When true, collapses an extended FAB to icon-only on page scroll. */
	collapseOnScroll = input(false);
	disabled = input(false);
	fabClick = output<void>();

	/** Collapse state driven by scroll — only active when extended + collapseOnScroll. */
	protected readonly _collapsed = signal(false);

	private readonly _destroyRef = inject(DestroyRef);

	protected get _hostClass(): string {
		return [
			`hub-fab-${this.color()}`,
			`hub-fab-${this.size()}`,
			`hub-fab-${this.position()}`,
			this.extended() && !this._collapsed() ? 'hub-fab-extended' : '',
			this.disabled() ? 'hub-fab-disabled' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	/**
	 * The semantic accent consumed by the base `.hub-fab` background slot
	 * (`--hub-fab-accent`). Accepts ANY colour: a bareword (a built-in semantic
	 * name, a host-registered accent or a CSS named colour) resolves to its
	 * `--hub-sys-color-<name>` token with the bareword as the raw fallback, so
	 * unregistered names still paint; a literal (`#hex`, `rgb()`, `oklch()`,
	 * `var(...)`) is passed through unchanged. Built-in `hub-fab-<color>` classes
	 * keep overriding the background, so this slot only paints custom / literal
	 * colours.
	 */
	protected get _accent(): string | null {
		return resolveHubAccent(this.color());
	}

	ngOnInit(): void {
		if (!this.collapseOnScroll()) return;

		fromEvent(window, 'scroll', { passive: true })
			.pipe(debounceTime(50), takeUntilDestroyed(this._destroyRef))
			.subscribe(() => {
				this._collapsed.set(window.scrollY > 50);
			});
	}
}
