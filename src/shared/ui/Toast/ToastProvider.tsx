import { cn } from '@/shared/lib/cn';
import { ToastContext, type ToastVariant } from '@/shared/ui/Toast/toastContext';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ToastItem = {
	id: string;
	message: string;
	variant: ToastVariant;
};

const AUTO_DISMISS_MS = 5_000;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [items, setItems] = useState<ToastItem[]>([]);
	const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

	const dismiss = useCallback((id: string) => {
		const t = timeoutsRef.current.get(id);
		if (t) {
			clearTimeout(t);
		}
		timeoutsRef.current.delete(id);
		setItems((prev) => prev.filter((x) => x.id !== id));
	}, []);

	const show = useCallback(
		(message: string, variant: ToastVariant) => {
			const id = crypto.randomUUID();
			setItems((prev) => [...prev, { id, message, variant }]);
			const tid = setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
			timeoutsRef.current.set(id, tid);
		},
		[dismiss],
	);

	const value = useMemo(
		() => ({
			show,
			success: (message: string) => {
				show(message, 'success');
			},
			error: (message: string) => {
				show(message, 'error');
			},
		}),
		[show],
	);

	useEffect(() => {
		const timeouts = timeoutsRef.current;
		return () => {
			for (const t of timeouts.values()) {
				clearTimeout(t);
			}
			timeouts.clear();
		};
	}, []);

	const viewport =
		items.length === 0 ? null : (
			<div
				className="pointer-events-none fixed bottom-4 right-4 z-160 flex max-w-sm flex-col gap-2 p-0 sm:max-w-md"
				aria-label="Powiadomienia"
			>
				{items.map((toast) => (
					<div
						key={toast.id}
						className={cn(
							'pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg',
							toast.variant === 'success' && 'border-emerald-200 bg-white text-emerald-950 ring-1 ring-emerald-100',
							toast.variant === 'error' && 'border-red-200 bg-white text-red-950 ring-1 ring-red-100',
						)}
						role={toast.variant === 'error' ? 'alert' : 'status'}
						aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
					>
						<p className="min-w-0 flex-1 leading-snug">{toast.message}</p>
						<button
							type="button"
							className={cn(
								'shrink-0 rounded px-1.5 py-0.5 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500',
							)}
							onClick={() => dismiss(toast.id)}
							aria-label="Zamknij powiadomienie"
						>
							×
						</button>
					</div>
				))}
			</div>
		);

	return (
		<ToastContext.Provider value={value}>
			{children}
			{typeof document !== 'undefined' ? createPortal(viewport, document.body) : null}
		</ToastContext.Provider>
	);
};
