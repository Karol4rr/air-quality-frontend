import type { CityNote, CreateNoteInput, PatchCityNoteMutationVariables } from '@/features/cityNotes/types';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { useToast } from '@/shared/ui/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCityNote, getCityNotes, notesKeys, patchCityNote } from '../api';

export const useCityNotes = (cityId: string) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	const enabled = cityId.length > 0;

	const query = useQuery({
		queryKey: notesKeys.list(cityId),
		queryFn: () => getCityNotes(cityId),
		enabled,
	});

	const createMutation = useMutation({
		mutationFn: (input: CreateNoteInput) => {
			if (!cityId) {
				throw new Error('Brak identyfikatora miasta.');
			}
			return createCityNote(cityId, input);
		},
		onSuccess: () => {
			toast.success('Notatka została utworzona.');
			void queryClient.invalidateQueries({ queryKey: notesKeys.all() });
		},
		onError: (err) => {
			toast.error(getErrorMessage(err));
		},
	});

	const patchMutation = useMutation({
		mutationFn: ({ noteId, input }: PatchCityNoteMutationVariables) => {
			if (!cityId) {
				throw new Error('Brak identyfikatora miasta.');
			}
			return patchCityNote(cityId, noteId, input);
		},
		onSuccess: () => {
			toast.success('Notatka została zaktualizowana.');
			void queryClient.invalidateQueries({ queryKey: notesKeys.all() });
		},
		onError: (err) => {
			toast.error(getErrorMessage(err));
		},
	});

	return {
		notes: (query.data ?? []) as CityNote[],
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refetch: query.refetch,
		createNote: createMutation.mutateAsync,
		updateNote: patchMutation.mutateAsync,
		isCreating: createMutation.isPending,
		isUpdating: patchMutation.isPending,
	};
};
