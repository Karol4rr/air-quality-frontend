import type { CityStatsCityColumnHeaderProps } from '@/features/airQuality/types';
import SearchSvg from '@/assets/icons/search.svg?react';
import { TableHead, TableSortHeaderButton } from '@/shared/ui/table';
import { cn } from '@/shared/lib/cn';
import * as Popover from '@radix-ui/react-popover';
import { useRef, type ChangeEvent } from 'react';

export const CityStatsCityColumnHeader = ({
	sortKey,
	sortPhase,
	onSort,
	cityFilter,
	onCityFilterChange,
}: CityStatsCityColumnHeaderProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSort = () => {
		onSort('city');
	};

	const handleCityFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		onCityFilterChange(e.target.value);
	};

	const handleOpenAutoFocus = (event: Event) => {
		event.preventDefault();
		inputRef.current?.focus();
	};

	return (
		<TableHead
			scope="col"
			aria-label="Miasto — sortowanie i filtr"
			className="min-w-48 px-3 py-2 text-left font-medium text-slate-700"
		>
			<div className="flex flex-wrap items-center gap-1">
				<TableSortHeaderButton isSortColumn={sortKey === 'city'} sortPhase={sortPhase} onSort={handleSort}>
					Miasto
				</TableSortHeaderButton>
				<Popover.Root modal={false}>
					<Popover.Trigger asChild>
						<button
							type="button"
							className={cn(
								'cursor-pointer rounded-md p-1.5 text-slate-600 hover:bg-slate-200/80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500 data-[state=open]:bg-slate-200/90',
							)}
							aria-label="Otwórz filtr miasta"
							title="Filtruj po nazwie miasta"
						>
							<SearchSvg className="h-4 w-4 shrink-0" aria-hidden />
						</button>
					</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content
							side="bottom"
							align="start"
							sideOffset={6}
							onOpenAutoFocus={handleOpenAutoFocus}
							className={cn(
								'z-50 w-[min(100vw-2rem,18rem)] rounded-md border border-slate-200 bg-white p-2 shadow-md outline-none',
							)}
						>
							<input
								ref={inputRef}
								type="search"
								enterKeyHint="search"
								value={cityFilter}
								onChange={handleCityFilterChange}
								placeholder="Filtruj miasta…"
								aria-label="Filtruj po nazwie miasta"
								className={cn(
									'city-stats-filter-search',
									'min-h-10 w-full min-w-0 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500',
								)}
							/>
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			</div>
		</TableHead>
	);
};
