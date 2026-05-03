import { AirQualityPage } from '@/features/airQuality/pages/AirQualityPage';
import { renderWithApp } from '@/test/testUtils';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/shared/api/mockDelay', () => ({
	mockDelay: () => Promise.resolve(),
}));

vi.mock('@/features/airQuality/components/PollutantBarChart', () => ({
	PollutantBarChart: () => null,
}));

describe('airQuality -> pages -> AirQualityPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('loads stats and filters table by city name', async () => {
		const user = userEvent.setup();
		renderWithApp(<AirQualityPage />);

		await waitFor(() => {
			expect(screen.getByRole('columnheader', { name: /Miasto/i })).toBeInTheDocument();
		});

		expect(screen.getByText('Białystok')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: /Otwórz filtr miasta/i }));
		const filter = screen.getByLabelText(/Filtruj po nazwie miasta/i);
		await user.type(filter, 'kra');

		await waitFor(
			() => {
				expect(screen.queryByText('Warszawa')).not.toBeInTheDocument();
				expect(screen.getByText('Kraków')).toBeInTheDocument();
			},
			{ timeout: 2000 },
		);
	});

	it('sorts rows when clicking column header', async () => {
		const user = userEvent.setup();
		renderWithApp(<AirQualityPage />);

		await waitFor(() => {
			expect(screen.getByText('Białystok')).toBeInTheDocument();
		});

		const pmHeader = screen.getByRole('columnheader', { name: /PM10/i });
		const sortBtn = within(pmHeader).getByRole('button');
		await user.click(sortBtn);

		await waitFor(() => {
			const bodyRows = screen.getAllByRole('row').slice(1);
			const firstCityCell = within(bodyRows[0]!).getAllByRole('cell')[0];
			expect(firstCityCell).toHaveTextContent('Białystok');
		});
	});
});
