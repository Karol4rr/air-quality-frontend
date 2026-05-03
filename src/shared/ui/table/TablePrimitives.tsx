import { cn } from '@/shared/lib/cn';
import type { ComponentPropsWithoutRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export const TableScrollArea = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn('relative my-0 overflow-x-auto border border-slate-200 bg-white', className)} {...props} />;
};

export const Table = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => {
	return <table className={cn('min-w-full border-collapse text-sm', className)} {...props} />;
};

export const TableHeader = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
	return <thead {...props} className={cn(className)} />;
};

export const TableBody = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
	return <tbody {...props} className={cn(className)} />;
};

export const TableRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => {
	return (
		<tr
			className={cn('border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-100', className)}
			{...props}
		/>
	);
};

export const TableHead = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => {
	return <th className={cn('px-3 py-2 text-left font-medium text-slate-700', className)} {...props} />;
};

export const TableHeadNumeric = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => {
	return <th className={cn('px-3 py-2 text-right  font-medium text-slate-700', className)} {...props} />;
};

export const TableCell = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => {
	return <td className={cn('px-3 py-2 text-slate-900', className)} {...props} />;
};

export const TableCellNumeric = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => {
	return <td className={cn('px-3 py-2 text-right tabular-nums text-slate-900', className)} {...props} />;
};

export const TableHeaderRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => {
	return <tr className={cn('border-b border-slate-200 bg-slate-50', className)} {...props} />;
};
