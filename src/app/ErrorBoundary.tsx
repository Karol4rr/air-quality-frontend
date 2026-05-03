import { Button } from '@/shared/ui/Button';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };

type State = {
	error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
	public state: State = { error: null };

	public static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	public componentDidCatch(error: Error, info: ErrorInfo): void {
		console.error('[ErrorBoundary]', error, info.componentStack);
	}

	private handleReset = (): void => {
		this.setState({ error: null });
	};

	public render(): ReactNode {
		const { error } = this.state;
		if (error) {
			return (
				<div className="mx-auto max-w-lg px-4 py-16 text-left" role="alert">
					<h1 className="text-lg font-semibold text-slate-900">Wystąpił nieoczekiwany błąd</h1>
					<p className="mt-2 text-sm text-slate-600">{getErrorMessage(error)}</p>
					<div className="mt-6">
						<Button type="button" variant="primary" onClick={this.handleReset}>
							Spróbuj ponownie
						</Button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}
