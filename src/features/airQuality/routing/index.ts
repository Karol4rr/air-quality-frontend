import type { FeatureRoute } from '@/shared/types/routes';
import { lazy } from 'react';

const AirQualityPage = lazy(() =>
	import('@/features/airQuality/pages/AirQualityPage').then((m) => ({
		default: m.AirQualityPage,
	})),
);

export const airQualityRoutes: FeatureRoute[] = [
	{
		path: '/',
		component: AirQualityPage,
	},
];
