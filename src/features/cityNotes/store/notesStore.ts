import type { NotesStoreState } from '@/features/cityNotes/types';
import {
	cloneInitialNotesByCityId,
	mergePersistedNotesOverInitial,
	sanitizeNotesByCityId,
} from '@/features/cityNotes/utils/notesPersistUtils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useNotesStore = create<NotesStoreState>()(
	persist(
		(set, get) => ({
			notesByCityId: cloneInitialNotesByCityId(),

			getNotesForCity: (cityId) => {
				return get().notesByCityId[cityId] ?? [];
			},

			addNote: (cityId, input) => {
				const now = new Date().toISOString();
				const note = {
					id: crypto.randomUUID(),
					title: input.title,
					body: input.body,
					createdAt: now,
					updatedAt: now,
				};
				set((state) => ({
					notesByCityId: {
						...state.notesByCityId,
						[cityId]: [...(state.notesByCityId[cityId] ?? []), note],
					},
				}));
				return note;
			},

			updateNoteBody: (cityId, noteId, body) => {
				const now = new Date().toISOString();
				const list = get().notesByCityId[cityId];
				if (!list) {
					throw new Error(`Brak notatek dla miasta ${cityId}`);
				}
				const idx = list.findIndex((n) => n.id === noteId);
				if (idx === -1) {
					throw new Error(`Nie znaleziono notatki ${noteId}`);
				}
				const prev = list[idx];
				if (!prev) {
					throw new Error(`Nie znaleziono notatki ${noteId}`);
				}
				const updated = {
					...prev,
					body,
					updatedAt: now,
				};
				const nextList = [...list];
				nextList[idx] = updated;
				set((state) => ({
					notesByCityId: {
						...state.notesByCityId,
						[cityId]: nextList,
					},
				}));
				return updated;
			},
		}),
		{
			name: 'cityNotes',
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({ notesByCityId: state.notesByCityId }),
			merge: (persistedState, currentState) => {
				const p = persistedState as { notesByCityId?: unknown } | null | undefined;
				if (!p || p.notesByCityId === undefined) {
					return currentState;
				}
				const sanitized = sanitizeNotesByCityId(p.notesByCityId);
				if (sanitized === null) {
					return currentState;
				}
				return {
					...currentState,
					notesByCityId: mergePersistedNotesOverInitial(cloneInitialNotesByCityId(), sanitized),
				};
			},
		},
	),
);
