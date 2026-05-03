import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/shared/lib/cn';
import { useId, type ReactNode } from 'react';

type ModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	children: ReactNode;
	className?: string;
};

export const Modal = ({ open, onOpenChange, title, description, children, className }: ModalProps) => {
	const descriptionId = useId();

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
				<Dialog.Content
					className={cn(
						'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white p-6 text-left shadow-lg',
						className,
					)}
					{...(description ? { 'aria-describedby': descriptionId } : {})}
				>
					<Dialog.Title className="text-lg font-semibold text-slate-900">{title}</Dialog.Title>
					{description ? (
						<Dialog.Description id={descriptionId} className="mt-1 text-sm text-slate-600">
							{description}
						</Dialog.Description>
					) : null}
					<div className="mt-4">{children}</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
