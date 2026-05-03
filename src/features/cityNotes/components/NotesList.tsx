import type { NotesListProps } from '@/features/cityNotes/types';
import { NoteTimestamps } from './NoteTimestamps';
import { Button } from '@/shared/ui/Button';
import DetailsIcon from '@/assets/icons/details.svg?react';
import EditIcon from '@/assets/icons/edit.svg?react';

export const NotesList = ({ notes, cityDisplayName, onDetails, onEdit }: NotesListProps) => {
	if (notes.length === 0) {
		return <NoNotesMessage cityDisplayName={cityDisplayName} />;
	}

	return (
		<ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
			{notes.map((note) => (
				<li key={note.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="min-w-0 flex-1 space-y-1">
						<p className="font-medium text-slate-900">{note.title}</p>
						<NoteTimestamps createdAt={note.createdAt} updatedAt={note.updatedAt} variant="compact" />
					</div>
					<div className="flex shrink-0 gap-2">
						<Button variant="secondary" onClick={() => onDetails(note)}>
							<DetailsIcon className="mr-2 h-4 w-4 shrink-0" aria-hidden />
							Szczegóły
						</Button>
						<Button variant="secondary" onClick={() => onEdit(note)}>
							<EditIcon className="mr-2 h-4 w-4 shrink-0" aria-hidden />
							Edytuj
						</Button>
					</div>
				</li>
			))}
		</ul>
	);
};

const NoNotesMessage = ({ cityDisplayName }: { cityDisplayName: string }) => (
	<p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
		Brak notatek dla miasta <strong>{cityDisplayName}</strong>.
	</p>
);
