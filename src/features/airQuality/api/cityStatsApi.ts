import type { CityStatRow, CityStatsPageResponse, CityStatsQueryParams } from '@/features/airQuality/types';
import { filterCityStatsByName, sortCityStats } from '@/features/airQuality/utils/sortFilterStats';
import { getFixtureCityStats } from '@/mocks/cityStats';
import { countries } from '@/mocks/countries';
import { mockDelay } from '@/shared/api/mockDelay';

export const paginateCityStats = (rows: CityStatRow[], params: CityStatsQueryParams): CityStatsPageResponse => {
	const filtered = filterCityStatsByName(rows, params.cityFilter);
	const ordered =
		params.sortPhase === null
			? filtered
			: sortCityStats(filtered, params.sortKey, params.sortPhase === 'asc' ? 'asc' : 'desc');

	const totalCount = ordered.length;
	const pageSize = Math.max(1, params.pageSize);
	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
	const requestedPage = Math.max(1, params.page);
	const page = Math.min(requestedPage, totalPages);
	const start = (page - 1) * pageSize;
	const items = ordered.slice(start, start + pageSize);

	return {
		items: structuredClone(items),
		totalCount,
	};
};

export const fetchCityStats = async (
	countryId: string,
	year: number,
	params: CityStatsQueryParams,
): Promise<CityStatsPageResponse> => {
	await mockDelay();
	const data = getFixtureCityStats(countryId, year);
	const countryName = countries.find((c) => c.id === countryId)?.name;
	if (!data) {
		throw new Error(`Brak danych dla kraju ${countryName} i roku ${year}`);
	}
	return paginateCityStats(data, params);
};
