import DetailsSvg from '@/assets/icons/details.svg?react';
import { Tooltip as HintTooltip } from '@/shared/ui/Tooltip';

export const AirQualityChartTooltip = () => {
	return (
		<HintTooltip
			side="left"
			align="start"
			content={
				<span>
					Serie <strong>CO</strong> i <strong>NO₂</strong> są domyślnie ukryte. Kliknij wpisy <strong>legendy</strong>{' '}
					nad wykresem, żeby włączyć lub wyłączyć dane na wykresie.
				</span>
			}
		>
			<button
				type="button"
				className="inline-flex rounded-md border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-500"
				aria-label="Jak pokazać ukryte serie na wykresie"
			>
				<DetailsSvg className="h-4 w-4 shrink-0" aria-hidden />
			</button>
		</HintTooltip>
	);
};
