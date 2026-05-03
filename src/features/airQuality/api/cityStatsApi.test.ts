import { paginateCityStats } from '@/features/airQuality/api/cityStatsApi';
import type { CityStatRow } from '@/features/airQuality/types';
import { describe, expect, it } from 'vitest';

const rows: CityStatRow[] = Array.from({ length: 25 }, (_, i) => ({
	cityId: `c${i}`,
	city: `Miasto ${String(i).padStart(2, '0')}`,
	maxNO2: '1',
	maxCO: '1',
	maxPM10: String(i),
}));

describe('paginateCityStats', () => {
	it('returns totalCount and paginates page', () => {
		const r = paginateCityStats(rows, {
			page: 1,
			pageSize: 10,
			cityFilter: '',
			sortKey: 'city',
			sortPhase: 'asc',
		});
		expect(r.totalCount).toBe(25);
		expect(r.items).toHaveLength(10);
	});

	it('changes page to last page when requested page is too high', () => {
		const r = paginateCityStats(rows, {
			page: 99,
			pageSize: 10,
			cityFilter: '',
			sortKey: 'city',
			sortPhase: 'asc',
		});
		expect(r.items).toHaveLength(5);
		expect(r.items[0]?.city).toBe('Miasto 20');
	});
});
