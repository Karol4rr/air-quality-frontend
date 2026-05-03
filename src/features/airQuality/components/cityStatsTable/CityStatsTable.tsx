import type { CityStatsTableProps } from '@/features/airQuality/types';
import { CityStatsCityColumnHeader } from '@/features/airQuality/components/cityStatsTable/CityStatsCityColumnHeader';
import { CITY_STATS_NOTES_COLUMN, CITY_STATS_POLLUTANT_COLUMNS } from '@/features/airQuality/lib/cityStatsTableConfig';
import { cn } from '@/shared/lib/cn';
import {
	Table,
	TableBody,
	TableCell,
	TableCellNumeric,
	TableFetchOverlay,
	TableHeadNumeric,
	TableHeader,
	TableHeaderRow,
	TablePagination,
	TableRow,
	TableScrollArea,
	TableSortHeaderButton,
} from '@/shared/ui/table';
import { tablePaginationRange } from '@/shared/utils';
import { Link } from 'react-router-dom';
import NotesSvg from '@/assets/icons/notes.svg?react';
import { NumericWithUnit } from './NumericWithUnit';

export const CityStatsTable = ({
	rows,
	sortKey,
	sortPhase,
	onSort,
	cityFilter,
	onCityFilterChange,
	page,
	pageSize,
	totalCount,
	totalPages,
	onPageChange,
	isFetching = false,
}: CityStatsTableProps) => {
	const { from, to } = tablePaginationRange(page, pageSize, totalCount);

	return (
		<div>
			<h2 className="text-base border-x border-t rounded-t-md border-slate-200 px-4 py-5 font-semibold text-slate-900 bg-white">
				Tabela miast
			</h2>
			<TableScrollArea>
				<TableFetchOverlay active={isFetching} message="Aktualizowanie danych…" />
				<Table className={cn(isFetching && 'pointer-events-none')} aria-busy={isFetching}>
					<TableHeader>
						<TableHeaderRow>
							<CityStatsCityColumnHeader
								sortKey={sortKey}
								sortPhase={sortPhase}
								onSort={onSort}
								cityFilter={cityFilter}
								onCityFilterChange={onCityFilterChange}
							/>
							{CITY_STATS_POLLUTANT_COLUMNS.map((col) => (
								<TableHeadNumeric key={col.sortKey} scope="col">
									<TableSortHeaderButton
										isSortColumn={sortKey === col.sortKey}
										sortPhase={sortPhase}
										onSort={() => {
											onSort(col.sortKey);
										}}
									>
										{col.label}
									</TableSortHeaderButton>
								</TableHeadNumeric>
							))}
							<TableHeadNumeric scope="col">{CITY_STATS_NOTES_COLUMN.headerLabel}</TableHeadNumeric>
						</TableHeaderRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.cityId}>
								<TableCell className="font-medium">{row.city}</TableCell>
								{CITY_STATS_POLLUTANT_COLUMNS.map((col) => (
									<TableCellNumeric key={col.sortKey}>
										<NumericWithUnit displayValue={row[col.valueKey]} valueKey={col.valueKey} />
									</TableCellNumeric>
								))}
								<TableCellNumeric>
									<Link
										to={CITY_STATS_NOTES_COLUMN.notesPath(row.cityId)}
										className={cn(
											'inline-flex cursor-pointer rounded-md px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500',
										)}
										aria-label="Otwórz notatki"
									>
										<NotesSvg className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
									</Link>
								</TableCellNumeric>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{rows.length === 0 ? (
					<p className="p-6 text-center text-slate-500">Brak wierszy spełniających kryteria.</p>
				) : null}
			</TableScrollArea>
			<TablePagination
				page={page}
				totalCount={totalCount}
				totalPages={totalPages}
				onPageChange={onPageChange}
				isFetching={isFetching}
				labels={{
					navAriaLabel: 'Paginacja tabeli miast',
					prev: 'Poprzednia',
					next: 'Następna',
					loadingScreenReader: 'Trwa ładowanie strony.',
					summary: (
						<>
							Miasta {from}–{to} z {totalCount} · strona {page} z {totalPages}
						</>
					),
				}}
			/>
		</div>
	);
};
