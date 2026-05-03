import type { NoteEditFormProps } from '@/features/cityNotes/types';
import { noteFormFieldLabelClass } from '@/features/cityNotes/styles/noteFormStyles';
import { NoteFormActionBar } from '@/features/cityNotes/components/NoteFormActionBar';
import { NoteTimestamps } from './NoteTimestamps';
import { Textarea } from '@/shared/ui/Textarea';
import { Tooltip as HintTooltip } from '@/shared/ui/Tooltip';
import { useId, useState, type SubmitEvent } from 'react';
import DetailsSvg from '@/assets/icons/details.svg?react';

export const NoteEditForm = ({ note, onClose, isSaving, onSave }: NoteEditFormProps) => {
	const bodyFieldId = useId();
	const [body, setBody] = useState(note.body);

	const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await onSave(note.id, body);
		} catch {
			// błąd wyświetlany w toast
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<p className="flex items-center gap-2 text-sm text-slate-600">
				<span className="font-medium text-slate-900">Tytuł: {note.title}</span>
				<HintTooltip side="left" align="start" content={<span>Możesz zmienić wyłącznie treść notatki.</span>}>
					<DetailsSvg className="h-3 w-3 shrink-0" aria-hidden />
				</HintTooltip>
			</p>
			<label htmlFor={bodyFieldId} className={noteFormFieldLabelClass}>
				Treść
			</label>
			<Textarea id={bodyFieldId} value={body} onChange={(e) => setBody(e.target.value)} required />
			<NoteTimestamps createdAt={note.createdAt} updatedAt={note.updatedAt} variant="compact" />
			<NoteFormActionBar onCancel={onClose} isSaving={isSaving} cancelVariant="ghost" saveVariant="primary" />
		</form>
	);
};
