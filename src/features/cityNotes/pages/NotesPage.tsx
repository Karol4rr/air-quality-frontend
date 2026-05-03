import { useCityNotes } from '@/features/cityNotes/hooks/useCityNotes';
import type { CityNote, CreateNoteInput } from '@/features/cityNotes/types';
import BackSvg from '@/assets/icons/back.svg?react';
import NotesSvg from '@/assets/icons/notes.svg?react';
import { cityDisplayNameById } from '@/mocks/cityStats';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Button } from '@/shared/ui/Button';
import { LoaderPageOverlay } from '@/shared/ui/Loader';
import { Link, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { NoteCreateModal } from '../components/NoteCreateModal';
import { NoteDetailModal } from '../components/NoteDetailModal';
import { NoteEditModal } from '../components/NoteEditModal';
import { NotesList } from '../components/NotesList';
import { animationStyle } from '@/shared/styles/animationStyle';
import { cn } from '@/shared/lib/cn';

export const NotesPage = () => {
	const { city } = useParams<{ city: string }>();
	const cityId = city ?? '';
	const { notes, isLoading, isError, error, createNote, updateNote, isCreating, isUpdating } = useCityNotes(cityId);

	const [createOpen, setCreateOpen] = useState(false);
	const [detailNoteId, setDetailNoteId] = useState<string | null>(null);
	const [editNote, setEditNote] = useState<CityNote | null>(null);

	const detailNote = useMemo(
		() => (detailNoteId ? (notes.find((n) => n.id === detailNoteId) ?? null) : null),
		[detailNoteId, notes],
	);

	const displayName = cityDisplayNameById[cityId] ?? cityId;

	const handleCreateNote = async (input: CreateNoteInput) => {
		try {
			await createNote(input);
			setCreateOpen(false);
		} catch {
			// błąd wyświetlany w toast
		}
	};

	const handleEditNote = async (noteId: string, body: string) => {
		try {
			await updateNote({ noteId, input: { body } });
			setEditNote(null);
		} catch {
			// błąd wyświetlany w toast
		}
	};

	if (!cityId) {
		return <p className="text-sm text-slate-600">Brak identyfikatora miasta w adresie URL.</p>;
	}

	return (
		<div className="space-y-6">
			<Link
				to="/"
				className="group mb-1 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 hover:underline"
			>
				<BackSvg className={cn('h-4 w-4 shrink-0', animationStyle)} aria-hidden />
				Strona główna
			</Link>
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-slate-900">Notatki — {displayName}</h1>
				</div>
				<Button variant="primary" onClick={() => setCreateOpen(true)}>
					<NotesSvg className="h-6 w-6 pr-2" aria-hidden />
					<span className="text-sm font-medium">Nowa notatka</span>
				</Button>
			</div>

			<LoaderPageOverlay active={isLoading} message="Ładowanie notatek…" />
			{isError && (
				<p className="text-sm text-red-600" role="alert">
					{getErrorMessage(error)}
				</p>
			)}

			{!isLoading && !isError && (
				<NotesList
					notes={notes}
					cityDisplayName={displayName}
					onDetails={(n) => {
						setDetailNoteId(n.id);
					}}
					onEdit={setEditNote}
				/>
			)}
			<NoteCreateModal
				open={createOpen}
				onOpenChange={setCreateOpen}
				isSaving={isCreating}
				onSave={handleCreateNote}
				cityDisplayName={displayName}
			/>
			<NoteDetailModal note={detailNote} onClose={() => setDetailNoteId(null)} />
			<NoteEditModal note={editNote} onClose={() => setEditNote(null)} isSaving={isUpdating} onSave={handleEditNote} />
		</div>
	);
};
