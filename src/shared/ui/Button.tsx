import { cn } from '@/shared/lib/cn';
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'ghost';
};

export const Button = ({ className, variant = 'secondary', type = 'button', ...props }: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(
				'cursor-pointer inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500 disabled:pointer-events-none disabled:opacity-50',
				variant === 'primary' &&
					'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200',
				variant === 'secondary' &&
					'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
				variant === 'ghost' && 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
				className,
			)}
			{...props}
		/>
	);
};
