import type { CityNote, CreateNoteInput } from '@/features/cityNotes/types';
import { useNotesStore } from '@/features/cityNotes/store/notesStore';
import { mockDelay } from '@/shared/api/mockDelay';

export const createCityNote = async (cityId: string, input: CreateNoteInput): Promise<CityNote> => {
	await mockDelay(120);
	return useNotesStore.getState().addNote(cityId, input);
};
