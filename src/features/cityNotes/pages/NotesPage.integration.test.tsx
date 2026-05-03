import { NotesPage } from '@/features/cityNotes/pages/NotesPage';
import { AppLayout } from '@/shared/ui/AppLayout';
import { renderWithApp } from '@/test/testUtils';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/shared/api/mockDelay', () => ({
	mockDelay: () => Promise.resolve(),
}));

const NotesRoute = () => {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route path="/notes/:city" element={<NotesPage />} />
			</Route>
		</Routes>
	);
};

describe('cityNotes -> pages -> NotesPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('opens detail modal with note body', async () => {
		const user = userEvent.setup();
		renderWithApp(<NotesRoute />, { route: '/notes/warszawa' });

		await waitFor(() => {
			expect(screen.getByText('Sezon grzewczy')).toBeInTheDocument();
		});

		const detailButtons = screen.getAllByRole('button', { name: 'Szczegóły' });
		await user.click(detailButtons[0]!);

		await waitFor(() => {
			expect(screen.getByRole('heading', { name: /Tytuł:\s*Sezon grzewczy/, level: 2 })).toBeInTheDocument();
		});

		expect(screen.getByText(/Wzrost stężeń PM10/)).toBeInTheDocument();
	});

	it('edits note body and updates modified date label', async () => {
		const user = userEvent.setup();
		renderWithApp(<NotesRoute />, { route: '/notes/warszawa' });

		await waitFor(() => {
			expect(screen.getByText('Kalibracja czujnika')).toBeInTheDocument();
		});

		const rows = screen.getAllByText('Kalibracja czujnika');
		const row = rows[0]!.closest('li');
		expect(row).toBeTruthy();
		const editBtn = within(row as HTMLElement).getByRole('button', { name: 'Edytuj' });
		await user.click(editBtn);

		const textarea = await screen.findByLabelText(/Treść/i);
		await user.clear(textarea);
		await user.type(textarea, 'Zaktualizowany opis prac.');

		await user.click(screen.getByRole('button', { name: 'Zapisz' }));

		await waitFor(() => {
			expect(screen.queryByRole('heading', { name: 'Edytuj notatkę', level: 2 })).not.toBeInTheDocument();
		});

		const kalibracjaRow = screen.getByText('Kalibracja czujnika').closest('li');
		expect(kalibracjaRow).toBeTruthy();
		await user.click(within(kalibracjaRow as HTMLElement).getByRole('button', { name: 'Szczegóły' }));

		expect(await screen.findByText('Zaktualizowany opis prac.')).toBeInTheDocument();
	});
});
