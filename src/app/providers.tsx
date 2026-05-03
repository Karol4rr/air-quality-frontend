import { TooltipProvider } from '@/shared/ui/Tooltip';
import { ToastProvider } from '@/shared/ui/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { useState } from 'react';

export const AppProviders = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 30_000,
						retry: 1,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<TooltipProvider delayDuration={100}>{children}</TooltipProvider>
			</ToastProvider>
			{import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" /> : null}
		</QueryClientProvider>
	);
};
