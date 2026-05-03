import type { CityNote } from '@/features/cityNotes/types';
import { initialNotesByCityId } from '@/mocks/initialNotes';

export const cloneInitialNotesByCityId = (): Record<string, CityNote[]> => {
	const out: Record<string, CityNote[]> = {};
	for (const [cityId, notes] of Object.entries(initialNotesByCityId)) {
		out[cityId] = notes.map((n) => ({ ...n }));
	}
	return out;
};

export const isCityNote = (value: unknown): value is CityNote => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const object = value as Record<string, unknown>;

	return (
		typeof object.id === 'string' &&
		typeof object.title === 'string' &&
		typeof object.body === 'string' &&
		typeof object.createdAt === 'string' &&
		typeof object.updatedAt === 'string'
	);
};

export const sanitizeNotesByCityId = (raw: unknown): Record<string, CityNote[]> | null => {
	if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
		return null;
	}

	const out: Record<string, CityNote[]> = {};

	for (const [cityId, notes] of Object.entries(raw as Record<string, unknown>)) {
		if (!Array.isArray(notes)) {
			continue;
		}

		const valid: CityNote[] = [];

		for (const item of notes) {
			if (isCityNote(item)) {
				valid.push({ ...item });
			}
		}

		out[cityId] = valid;
	}

	return out;
};

export const mergePersistedNotesOverInitial = (
	initial: Record<string, CityNote[]>,
	persisted: Record<string, CityNote[]>,
): Record<string, CityNote[]> => {
	const keys = new Set([...Object.keys(initial), ...Object.keys(persisted)]);
	const out: Record<string, CityNote[]> = {};

	for (const cityId of keys) {
		if (Object.hasOwn(persisted, cityId)) {
			out[cityId] = persisted[cityId]!.map((n) => ({ ...n }));
		} else {
			const fromInitial = initial[cityId];

			if (fromInitial) {
				out[cityId] = fromInitial.map((n) => ({ ...n }));
			}
		}
	}
	return out;
};
