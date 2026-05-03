import { Loader } from '@/shared/ui/Loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const RouteSuspenseLayout = () => {
	return (
		<Suspense
			fallback={
				<div className="flex justify-center py-16" aria-busy="true">
					<Loader message="Ładowanie widoku…" />
				</div>
			}
		>
			<Outlet />
		</Suspense>
	);
};
