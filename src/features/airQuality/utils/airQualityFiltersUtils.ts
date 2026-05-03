import { availableYears } from '@/mocks/cityStats';
import { countries } from '@/mocks/countries';

export const defaultCountryId = (): string => countries[0]?.id ?? '';

export const defaultYear = (): number => availableYears[0] ?? new Date().getFullYear();

export const sanitizeCountryId = (id: unknown): string =>
	typeof id === 'string' && countries.some((c) => c.id === id) ? id : defaultCountryId();

export const sanitizeYear = (y: unknown): number => {
	if (typeof y === 'number' && Number.isFinite(y) && availableYears.some((yy) => yy === y)) {
		return y;
	}
	if (typeof y === 'string') {
		const n = Number.parseInt(y, 10);
		if (Number.isFinite(n) && availableYears.some((yy) => yy === n)) {
			return n;
		}
	}
	return defaultYear();
};
