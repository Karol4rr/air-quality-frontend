import type { NoteDetailModalProps } from '@/features/cityNotes/types';
import { NoteTimestamps } from './NoteTimestamps';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

export const NoteDetailModal = ({ note, onClose }: NoteDetailModalProps) => {
	const open = Boolean(note);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) onClose();
	};

	const title = note?.title ? `Tytuł: ${note.title}` : 'Szczegóły';

	return (
		<Modal open={open} onOpenChange={handleOpenChange} title={title}>
			{note ? (
				<div className="space-y-3 text-sm text-slate-700">
					<div>
						<p className="font-medium text-slate-900">Treść</p>
						<p className="mt-1 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-slate-800">{note.body}</p>
					</div>
					<NoteTimestamps createdAt={note.createdAt} updatedAt={note.updatedAt} variant="detail" />
					<div className="flex justify-end pt-2">
						<Button variant="secondary" onClick={onClose}>
							Zamknij
						</Button>
					</div>
				</div>
			) : null}
		</Modal>
	);
};
