import type { CityNote, PatchNoteInput } from '@/features/cityNotes/types';
import { useNotesStore } from '@/features/cityNotes/store/notesStore';
import { mockDelay } from '@/shared/api/mockDelay';

export const patchCityNote = async (cityId: string, noteId: string, input: PatchNoteInput): Promise<CityNote> => {
	await mockDelay(120);
	return useNotesStore.getState().updateNoteBody(cityId, noteId, input.body);
};
