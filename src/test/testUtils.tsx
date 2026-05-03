import { AppProviders } from '@/app/providers';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithApp = (ui: ReactElement, { route = '/' } = {}) => {
	return render(
		<MemoryRouter initialEntries={[route]}>
			<AppProviders>
				<Suspense fallback={null}>{ui}</Suspense>
			</AppProviders>
		</MemoryRouter>,
	);
};
