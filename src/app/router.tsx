import { RouteSuspenseLayout } from '@/app/RouteSuspenseLayout';
import { airQualityRoutes } from '@/features/airQuality/routing';
import { cityNotesRoutes } from '@/features/cityNotes/routing';
import { AppLayout } from '@/shared/ui/AppLayout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const layoutRoutes = [...airQualityRoutes, ...cityNotesRoutes];

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route element={<RouteSuspenseLayout />}>
						{layoutRoutes.map(({ path, component: Page }) => (
							<Route key={path} path={path} element={<Page />} />
						))}
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};
