import type { CityNote } from '@/features/cityNotes/types';

export const initialNotesByCityId: Record<string, CityNote[]> = {
	warszawa: [
		{
			id: 'n-waw-1',
			title: 'Sezon grzewczy',
			body: 'Wzrost stężeń PM10 w okolicy stacji śródmiejskiej.',
			createdAt: '2026-03-10T09:00:00.000Z',
			updatedAt: '2026-03-12T14:30:00.000Z',
		},
		{
			id: 'n-waw-2',
			title: 'Kalibracja czujnika',
			body: 'Planowana wymiana filtra referencyjnego.',
			createdAt: '2026-03-01T08:15:00.000Z',
			updatedAt: '2026-03-01T08:15:00.000Z',
		},
	],
	krakow: [
		{
			id: 'n-krk-1',
			title: 'Inwersja temperatury',
			body: 'Dni z ograniczoną mieszaniem warstw powietrza — obserwacja jakości.',
			createdAt: '2026-03-20T11:00:00.000Z',
			updatedAt: '2026-03-22T09:45:00.000Z',
		},
	],
};
