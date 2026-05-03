import InlineSpinnerSvg from '@/assets/icons/inline-spinner.svg?react';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib/cn';
import type { ReactNode } from 'react';

export type TablePaginationLabels = {
	navAriaLabel: string;
	prev: string;
	next: string;
	loadingScreenReader: string;
	summary: ReactNode;
};

type TablePaginationProps = {
	page: number;
	totalCount: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isFetching?: boolean;
	labels: TablePaginationLabels;
	className?: string;
};

export const TablePagination = ({
	page,
	totalCount,
	totalPages,
	onPageChange,
	isFetching = false,
	labels,
	className,
}: TablePaginationProps) => {
	if (totalCount <= 0) {
		return null;
	}

	return (
		<nav
			className={cn(
				'flex flex-col gap-3 border-x border-b border-slate-200 rounded-b-md px-3 py-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between',
				className,
			)}
			aria-label={labels.navAriaLabel}
			aria-busy={isFetching}
		>
			<p className="flex flex-wrap items-center gap-2 tabular-nums">
				<span>{labels.summary}</span>
				{isFetching ? (
					<span className="inline-flex items-center gap-1.5 text-slate-500">
						<InlineSpinnerSvg className="h-3.5 w-3.5 shrink-0 animate-spin text-slate-500" aria-hidden />
						<span className="sr-only">{labels.loadingScreenReader}</span>
					</span>
				) : null}
			</p>
			<div className="flex flex-wrap items-center gap-2">
				<Button
					type="button"
					variant="secondary"
					className="cursor-pointer"
					disabled={page <= 1 || isFetching}
					onClick={() => {
						onPageChange(Math.max(1, page - 1));
					}}
				>
					{labels.prev}
				</Button>
				<Button
					type="button"
					variant="secondary"
					className="cursor-pointer"
					disabled={page >= totalPages || isFetching}
					onClick={() => {
						onPageChange(Math.min(totalPages, page + 1));
					}}
				>
					{labels.next}
				</Button>
			</div>
		</nav>
	);
};
