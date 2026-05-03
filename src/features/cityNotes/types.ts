export type CityNote = {
	id: string;
	title: string;
	body: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateNoteInput = {
	title: string;
	body: string;
};

export type PatchNoteInput = {
	body: string;
};

// Zustand store

export type NotesStoreState = {
	notesByCityId: Record<string, CityNote[]>;
	getNotesForCity: (cityId: string) => CityNote[];
	addNote: (cityId: string, input: CreateNoteInput) => CityNote;
	updateNoteBody: (cityId: string, noteId: string, body: string) => CityNote;
};

export type PatchCityNoteMutationVariables = {
	noteId: string;
	input: PatchNoteInput;
};

export type NotesListProps = {
	notes: CityNote[];
	cityDisplayName: string;
	onDetails: (note: CityNote) => void;
	onEdit: (note: CityNote) => void;
};

export type NoteCreateModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	isSaving: boolean;
	onSave: (input: CreateNoteInput) => Promise<void>;
	cityDisplayName: string;
};

export type NoteDetailModalProps = {
	note: CityNote | null;
	onClose: () => void;
};

export type NoteEditFormProps = {
	note: CityNote;
	onClose: () => void;
	isSaving: boolean;
	onSave: (noteId: string, body: string) => Promise<void>;
};

export type NoteEditModalProps = {
	note: CityNote | null;
	onClose: () => void;
	isSaving: boolean;
	onSave: (noteId: string, body: string) => Promise<void>;
};
