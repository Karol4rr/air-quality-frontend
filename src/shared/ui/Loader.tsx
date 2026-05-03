import InlineSpinnerSvg from '@/assets/icons/inline-spinner.svg?react';
import { cn } from '@/shared/lib/cn';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const chipClassName =
	'inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm';

const spinnerClassName = 'h-4 w-4 shrink-0 animate-spin text-slate-500';

export type LoaderProps = {
	message: string;
	className?: string;
};

export const Loader = ({ message, className }: LoaderProps) => {
	return (
		<span className={cn(chipClassName, className)} role="status" aria-live="polite">
			<InlineSpinnerSvg className={spinnerClassName} aria-hidden />
			{message}
		</span>
	);
};

export type LoaderOverlayProps = {
	active: boolean;
	message: string;
	className?: string;
};

export const LoaderOverlay = ({ active, message, className }: LoaderOverlayProps) => {
	if (!active) {
		return null;
	}
	return (
		<div
			className={cn(
				'absolute inset-0 z-10 flex items-start justify-center bg-white/70 pt-10 backdrop-blur-[1px]',
				className,
			)}
		>
			<Loader message={message} />
		</div>
	);
};

export type LoaderPageOverlayProps = {
	active: boolean;
	message: string;
	className?: string;
};

export const LoaderPageOverlay = ({ active, message, className }: LoaderPageOverlayProps) => {
	useEffect(() => {
		if (!active) {
			return;
		}
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [active]);

	if (!active) {
		return null;
	}

	return createPortal(
		<div
			className={cn(
				'fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]',
				className,
			)}
			aria-busy="true"
		>
			<Loader message={message} className="shadow-lg" />
		</div>,
		document.body,
	);
};
