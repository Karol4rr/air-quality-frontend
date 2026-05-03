import type { FeatureRoute } from '@/shared/types/routes';
import { lazy } from 'react';

const NotesPage = lazy(() => import('@/features/cityNotes/pages/NotesPage').then((m) => ({ default: m.NotesPage })));

export const cityNotesRoutes: FeatureRoute[] = [
	{
		path: '/notes/:city',
		component: NotesPage,
	},
];
