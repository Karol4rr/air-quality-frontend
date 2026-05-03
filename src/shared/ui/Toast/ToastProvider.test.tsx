import { ToastProvider, useToast } from '@/shared/ui/Toast';
import { render, screen, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';

const ToastTrigger = ({ message }: { message: string }) => {
	const { success } = useToast();
	useEffect(() => {
		success(message);
	}, [message, success]);
	return null;
};

describe('shared -> ui -> ToastProvider', () => {
	it('shows success toast', async () => {
		render(
			<ToastProvider>
				<ToastTrigger message="Zapisano." />
			</ToastProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText('Zapisano.')).toBeInTheDocument();
		});
		expect(screen.getByRole('status')).toHaveTextContent('Zapisano.');
	});
});
