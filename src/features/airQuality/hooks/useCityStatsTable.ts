import type { CityStatsQueryParams, CityStatsSortKey, SortPhase } from '@/features/airQuality/types';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';

export const CITY_STATS_PAGE_SIZE = 10;

export const useCityStatsTable = () => {
	const [cityFilter, setCityFilterState] = useState('');
	const debouncedCityFilter = useDebounce(cityFilter, 280);

	const [sortKey, setSortKey] = useState<CityStatsSortKey>('city');
	const [sortPhase, setSortPhase] = useState<SortPhase>('asc');
	const sortKeyRef = useRef(sortKey);

	const [page, setPage] = useState(1);

	useEffect(() => {
		sortKeyRef.current = sortKey;
	}, [sortKey]);

	useEffect(() => {
		startTransition(() => {
			setPage(1);
		});
	}, [debouncedCityFilter, setPage]);

	const setCityFilter = useCallback((value: string) => {
		setCityFilterState(value);
	}, []);

	const setSort = useCallback((key: CityStatsSortKey) => {
		setPage(1);
		const prev = sortKeyRef.current;
		if (prev === key) {
			setSortPhase((p) => {
				if (p === 'asc') return 'desc';
				if (p === 'desc') return null;
				return 'asc';
			});
		} else {
			setSortPhase('asc');
		}
		setSortKey(key);
	}, []);

	const queryParams = useMemo<CityStatsQueryParams>(
		() => ({
			page,
			pageSize: CITY_STATS_PAGE_SIZE,
			cityFilter: debouncedCityFilter,
			sortKey,
			sortPhase,
		}),
		[page, debouncedCityFilter, sortKey, sortPhase],
	);

	return {
		cityFilter,
		setCityFilter,
		debouncedCityFilter,
		sortKey,
		sortPhase,
		setSort,
		page,
		setPage,
		pageSize: CITY_STATS_PAGE_SIZE,
		queryParams,
	};
};
