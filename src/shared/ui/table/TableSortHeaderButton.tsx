import { cn } from '@/shared/lib/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { TableSortIndicator } from './TableSortIndicator';
import type { SortPhase } from '@/features/airQuality/types';

type TableSortHeaderButtonProps = {
	children: ReactNode;
	isSortColumn: boolean;
	sortPhase: SortPhase;
	onSort: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'children'>;

export const TableSortHeaderButton = ({
	children,
	isSortColumn,
	sortPhase,
	onSort,
	className,
	...props
}: TableSortHeaderButtonProps) => {
	return (
		<button
			type="button"
			className={cn(
				'inline-flex cursor-pointer items-center gap-0.5 rounded hover:text-slate-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500',
				className,
			)}
			onClick={onSort}
			{...props}
		>
			{children}
			<TableSortIndicator isSortColumn={isSortColumn} phase={sortPhase} />
		</button>
	);
};
