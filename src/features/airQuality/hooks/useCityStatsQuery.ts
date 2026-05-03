import { fetchCityStats } from '@/features/airQuality/api/cityStatsApi';
import type { CityStatsPageResponse, CityStatsQueryParams } from '@/features/airQuality/types';
import { cityStatsKeys } from '@/features/airQuality/api/queryKeys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useCityStatsQuery = (countryId: string, year: number, params: CityStatsQueryParams) => {
	return useQuery<CityStatsPageResponse>({
		queryKey: cityStatsKeys.list(countryId, year, params),
		queryFn: () => fetchCityStats(countryId, year, params),
		placeholderData: keepPreviousData,
	});
};
