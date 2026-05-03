import { useCityStatsQuery } from '@/features/airQuality/hooks/useCityStatsQuery';
import { useCityStatsTable } from '@/features/airQuality/hooks/useCityStatsTable';
import { useAirQualityFiltersStore } from '@/features/airQuality/store/airQualityFiltersStore';
import { availableYears } from '@/mocks/cityStats';
import { countries } from '@/mocks/countries';
import { LoaderPageOverlay } from '@/shared/ui/Loader';
import { Select } from '@/shared/ui/Select';
import { useEffect, useMemo } from 'react';
import { AirQualityFetchErrorAlert } from '../components/AirQualityFetchErrorAlert';
import { CityStatsTable } from '../components/cityStatsTable/CityStatsTable';
import { PollutantBarChart } from '../components/PollutantBarChart';
import { AirQualityChartTooltip } from '../components/AirQualityChartTooltip';

export const AirQualityPage = () => {
	const countryId = useAirQualityFiltersStore((s) => s.countryId);
	const year = useAirQualityFiltersStore((s) => s.year);
	const setCountryId = useAirQualityFiltersStore((s) => s.setCountryId);
	const setYear = useAirQualityFiltersStore((s) => s.setYear);

	const { queryParams, page, setPage, pageSize, cityFilter, setCityFilter, sortKey, sortPhase, setSort } =
		useCityStatsTable();

	const { data, isLoading, isError, isFetching, error, refetch, isRefetching } = useCityStatsQuery(
		countryId,
		year,
		queryParams,
	);

	useEffect(() => {
		setPage(1);
	}, [countryId, year, setPage]);

	const totalPages = useMemo(() => {
		if (!data) return 1;
		return Math.max(1, Math.ceil(data.totalCount / pageSize));
	}, [data, pageSize]);

	const handleRefetch = () => {
		void refetch();
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight text-slate-900">Statystyki roczne — Miasta</h1>
			</div>
			<div className="flex flex-wrap items-end gap-4">
				<Select
					className="min-w-[180px]"
					id="air-quality-country"
					name="country"
					label="Kraj"
					value={countryId}
					onChange={(e) => {
						setCountryId(e.target.value);
					}}
				>
					{countries.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</Select>
				<Select
					className="min-w-[130px]"
					id="air-quality-measurement-year"
					name="measurement-year"
					label="Rok pomiarów"
					value={year}
					onChange={(e) => {
						setYear(Number(e.target.value));
					}}
				>
					{availableYears.map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</Select>
			</div>

			<LoaderPageOverlay active={isLoading} message="Ładowanie danych…" />
			{isError && (
				<AirQualityFetchErrorAlert error={error} onRetry={handleRefetch} isRetrying={isRefetching} />
			)}

			{data && (
				<>
					<section
						className={`space-y-3 rounded-lg border border-slate-200 bg-white p-4 transition-opacity relative ${isFetching ? 'opacity-60' : ''}`}
						aria-busy={isFetching}
					>
						<div>
							<div className="absolute right-3 top-3 z-10">
								<AirQualityChartTooltip />
							</div>
							<h2 className="text-base font-semibold text-slate-900">Wykres słupkowy</h2>
						</div>
						<PollutantBarChart rows={data.items} />
					</section>

					<section>
						<CityStatsTable
							rows={data.items}
							sortKey={sortKey}
							sortPhase={sortPhase}
							onSort={setSort}
							cityFilter={cityFilter}
							onCityFilterChange={setCityFilter}
							page={page}
							pageSize={pageSize}
							totalCount={data.totalCount}
							totalPages={totalPages}
							onPageChange={setPage}
							isFetching={isFetching}
						/>
					</section>
				</>
			)}
		</div>
	);
};
