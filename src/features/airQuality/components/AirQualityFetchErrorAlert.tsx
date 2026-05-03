import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { Button } from '@/shared/ui/Button';

type AirQualityFetchErrorAlertProps = {
	error: unknown;
	onRetry: () => void;
	isRetrying: boolean;
};

export const AirQualityFetchErrorAlert = ({ error, onRetry, isRetrying }: AirQualityFetchErrorAlertProps) => {
	return (
		<div className="space-y-3 rounded-md border border-red-200 bg-red-50 p-4" role="alert">
			<p className="text-sm text-red-800">Nie udało się załadować danych: {getErrorMessage(error)}</p>
			<Button type="button" variant="secondary" onClick={onRetry} disabled={isRetrying}>
				{isRetrying ? 'Ponawianie…' : 'Spróbuj ponownie'}
			</Button>
		</div>
	);
};
