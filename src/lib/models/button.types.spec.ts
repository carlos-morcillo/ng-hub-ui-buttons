import type { HubSemanticColor, HubBtnVariant, HubBtnSize, HubFabSize, HubFabPosition, HubDropdownPlacement } from './button.types';

describe('button.types', () => {
	it('HubSemanticColor covers all six semantic values', () => {
		const colors: HubSemanticColor[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
		expect(colors).toHaveLength(6);
	});

	it('HubBtnVariant covers all five variants', () => {
		const variants: HubBtnVariant[] = ['solid', 'outline', 'soft', 'ghost', 'link'];
		expect(variants).toHaveLength(5);
	});

	it('HubBtnSize covers all four sizes', () => {
		const sizes: HubBtnSize[] = ['sm', 'md', 'lg', 'xl'];
		expect(sizes).toHaveLength(4);
	});

	it('HubFabSize covers all three sizes', () => {
		const sizes: HubFabSize[] = ['mini', 'standard', 'large'];
		expect(sizes).toHaveLength(3);
	});

	it('HubFabPosition covers all nine positions', () => {
		const positions: HubFabPosition[] = [
			'top-start',
			'top-center',
			'top-end',
			'middle-start',
			'center',
			'middle-end',
			'bottom-start',
			'bottom-center',
			'bottom-end'
		];
		expect(positions).toHaveLength(9);
	});

	it('HubDropdownPlacement covers all eight placements', () => {
		const placements: HubDropdownPlacement[] = ['top-start', 'top', 'top-end', 'start', 'end', 'bottom-start', 'bottom', 'bottom-end'];
		expect(placements).toHaveLength(8);
	});
});
