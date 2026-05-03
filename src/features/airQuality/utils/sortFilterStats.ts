import type { CityStatRow, CityStatsSortKey, SortDirection } from '@/features/airQuality/types';

const compareStrings = (a: string, b: string, dir: SortDirection): number => {
	const cmp = a.localeCompare(b, 'pl', { sensitivity: 'base' });
	return dir === 'asc' ? cmp : -cmp;
};

const compareNumericStrings = (a: string, b: string, dir: SortDirection): number => {
	const na = Number.parseFloat(a);
	const nb = Number.parseFloat(b);
	const cmp = na - nb;
	return dir === 'asc' ? cmp : -cmp;
};

export const sortCityStats = (
	rows: CityStatRow[],
	sortKey: CityStatsSortKey,
	direction: SortDirection,
): CityStatRow[] => {
	const copy = [...rows];
	copy.sort((x, y) => {
		if (sortKey === 'city') {
			return compareStrings(x.city, y.city, direction);
		}
		return compareNumericStrings(x[sortKey], y[sortKey], direction);
	});
	return copy;
};

export const filterCityStatsByName = (rows: CityStatRow[], query: string): CityStatRow[] => {
	const q = query.trim().toLocaleLowerCase('pl');
	if (!q) return rows;
	return rows.filter((r) => r.city.toLocaleLowerCase('pl').includes(q));
};

export const defaultSortedByCity = (rows: CityStatRow[]): CityStatRow[] => {
	return sortCityStats(rows, 'city', 'asc');
};
