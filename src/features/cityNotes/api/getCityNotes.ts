import type { CityNote } from '@/features/cityNotes/types';
import { useNotesStore } from '@/features/cityNotes/store/notesStore';
import { mockDelay } from '@/shared/api/mockDelay';
import { sortNewestFirst } from '../utils/sortNewestFirst';

export const getCityNotes = async (cityId: string): Promise<CityNote[]> => {
	await mockDelay();
	const notes = useNotesStore.getState().getNotesForCity(cityId);
	return sortNewestFirst(notes);
};
