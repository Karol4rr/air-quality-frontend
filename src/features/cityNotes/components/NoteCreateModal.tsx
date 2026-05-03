import type { NoteCreateModalProps } from '@/features/cityNotes/types';
import { noteFormFieldLabelClass } from '@/features/cityNotes/styles/noteFormStyles';
import { NoteFormActionBar } from '@/features/cityNotes/components/NoteFormActionBar';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { Textarea } from '@/shared/ui/Textarea';
import { useId, useState, type SubmitEvent } from 'react';

export const NoteCreateModal = ({ open, onOpenChange, isSaving, onSave, cityDisplayName }: NoteCreateModalProps) => {
	const titleId = useId();
	const bodyId = useId();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const resetFields = () => {
		setTitle('');
		setBody('');
	};

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			resetFields();
		}
		onOpenChange(nextOpen);
	};

	const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await onSave({ title: title.trim(), body: body.trim() });
			resetFields();
		} catch {
			// błąd wyświetlany w toast
		}
	};

	return (
		<Modal
			open={open}
			onOpenChange={handleOpenChange}
			title="Nowa notatka"
			description={`Wprowadź tytuł i treść dla miasta ${cityDisplayName}.`}
		>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<label htmlFor={titleId} className={noteFormFieldLabelClass}>
					Tytuł
				</label>
				<Input id={titleId} value={title} onChange={(e) => setTitle(e.target.value)} required />
				<label htmlFor={bodyId} className={noteFormFieldLabelClass}>
					Treść
				</label>
				<Textarea id={bodyId} value={body} onChange={(e) => setBody(e.target.value)} required />
				<NoteFormActionBar
					onCancel={() => handleOpenChange(false)}
					isSaving={isSaving}
					cancelVariant="primary"
					saveVariant="secondary"
				/>
			</form>
		</Modal>
	);
};
