import AscendingFilterSvg from '@/assets/icons/ascending-filter.svg?react';
import DescendingFilterSvg from '@/assets/icons/descending-filter.svg?react';
import NeutralFilterSvg from '@/assets/icons/neutral-filter.svg?react';
import type { SortPhase } from '@/features/airQuality/types';

type TableSortIndicatorProps = {
	isSortColumn: boolean;
	phase: SortPhase;
};

export const TableSortIndicator = ({ isSortColumn, phase }: TableSortIndicatorProps) => {
	if (!isSortColumn || phase === null) {
		return <NeutralFilterSvg className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />;
	}
	if (phase === 'asc') {
		return <AscendingFilterSvg className="h-4 w-4 shrink-0 text-slate-700" aria-hidden />;
	}
	return <DescendingFilterSvg className="h-4 w-4 shrink-0 text-slate-700" aria-hidden />;
};
