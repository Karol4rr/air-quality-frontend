export const notesKeys = {
	all: () => ['cityNotes'] as const,
	list: (cityId: string) => [...notesKeys.all(), cityId] as const,
};
