import type { NoteEditModalProps } from '@/features/cityNotes/types';
import { Modal } from '@/shared/ui/Modal';
import { NoteEditForm } from './NoteEditForm';

export const NoteEditModal = ({ note, onClose, isSaving, onSave }: NoteEditModalProps) => {
	const open = Boolean(note);

	return (
		<Modal
			open={open}
			onOpenChange={(nextOpen) => {
				if (!nextOpen) onClose();
			}}
			title="Edytuj notatkę"
		>
			{note && <NoteEditForm key={note.id} note={note} onClose={onClose} isSaving={isSaving} onSave={onSave} />}
		</Modal>
	);
};
