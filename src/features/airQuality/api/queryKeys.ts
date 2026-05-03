import type { CityStatsQueryParams } from '@/features/airQuality/types';

export const cityStatsKeys = {
	all: () => ['cityStats'] as const,
	list: (countryId: string, year: number, params: CityStatsQueryParams) =>
		[...cityStatsKeys.all(), countryId, year, params] as const,
};
