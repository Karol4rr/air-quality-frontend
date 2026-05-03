import { cn } from '@/shared/lib/cn';
import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import DropdownIcon from '@/assets/icons/dropdown.svg?react';

export const Select = ({
	className,
	label,
	id: idProp,
	name: nameProp,
	children,
	...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) => {
	const autoId = useId();
	const selectId = idProp ?? autoId;
	const selectName = nameProp ?? `select-${selectId.replace(/:/g, '')}`;

	return (
		<label className="flex min-w-0 flex-col gap-1 text-sm font-medium text-slate-700">
			{label}
			<div className="relative min-w-0">
				<select
					id={selectId}
					name={selectName}
					className={cn(
						'w-full min-w-0 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-9 text-sm text-slate-900 shadow-sm',
						'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500',
						'disabled:cursor-not-allowed disabled:opacity-50',
						className,
					)}
					{...props}
				>
					{children}
				</select>
				<DropdownIcon
					className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
					aria-hidden
				/>
			</div>
		</label>
	);
};
