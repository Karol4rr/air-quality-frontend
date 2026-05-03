import type { CityStatRow } from '@/features/airQuality/types';
import { defaultSortedByCity, filterCityStatsByName, sortCityStats } from '@/features/airQuality/utils/sortFilterStats';
import { describe, expect, it } from 'vitest';

const rows: CityStatRow[] = [
	{
		cityId: 'b',
		city: 'Białystok',
		maxNO2: '10',
		maxCO: '5',
		maxPM10: '1',
	},
	{
		cityId: 'a',
		city: 'Augustów',
		maxNO2: '20',
		maxCO: '15',
		maxPM10: '3',
	},
	{
		cityId: 'c',
		city: 'Częstochowa',
		maxNO2: '15',
		maxCO: '10',
		maxPM10: '2',
	},
];

describe('airQuality -> utils -> filterCityStatsByName', () => {
	it('returns all rows for empty query', () => {
		expect(filterCityStatsByName(rows, '')).toHaveLength(3);
	});

	it('filters by substring case-insensitive', () => {
		expect(filterCityStatsByName(rows, 'August')).toEqual([rows[1]]);
	});
});

describe('airQuality -> utils -> sortCityStats', () => {
	it('sorts by city ascending', () => {
		const sorted = sortCityStats(rows, 'city', 'asc');
		expect(sorted.map((r) => r.city)).toEqual(['Augustów', 'Białystok', 'Częstochowa']);
	});

	it('sorts by maxPM10 descending', () => {
		const sorted = sortCityStats(rows, 'maxPM10', 'desc');
		expect(sorted.map((r) => r.city)).toEqual(['Augustów', 'Częstochowa', 'Białystok']);
	});
});

describe('airQuality -> utils -> defaultSortedByCity', () => {
	it('returns alphabetical city order', () => {
		const sorted = defaultSortedByCity(rows);
		expect(sorted.map((r) => r.city)).toEqual(['Augustów', 'Białystok', 'Częstochowa']);
	});
});
