import type { PollutantBarChartProps } from '@/features/airQuality/types';
import {
	CHART_OPTIONS,
	COLORS,
	INITIALLY_HIDDEN,
	POLLUTANT_LABELS,
	POLLUTANT_ORDER,
} from '@/features/airQuality/lib/pollutantBarChartConfig';
import { ensureChartJsRegistered } from '@/shared/lib/chartRegister';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

ensureChartJsRegistered();

const chartAreaClass = 'h-[320px] w-full min-h-[280px] min-w-0';

export const PollutantBarChart = ({ rows }: PollutantBarChartProps) => {
	const chartData = useMemo(() => {
		return {
			labels: rows.map((r) => r.city),
			datasets: POLLUTANT_ORDER.map((k) => ({
				label: POLLUTANT_LABELS[k],
				data: rows.map((r) => Number.parseFloat(r[k])),
				backgroundColor: COLORS[k],
				borderRadius: 4,
				maxBarThickness: 40,
				hidden: INITIALLY_HIDDEN.has(k),
			})),
		};
	}, [rows]);

	if (rows.length === 0) {
		return <NoDataMessage />;
	}

	return (
		<div className={chartAreaClass}>
			<Bar data={chartData} options={CHART_OPTIONS} />
		</div>
	);
};

const NoDataMessage = () => (
	<div className={chartAreaClass}>
		<div className="flex h-full items-center justify-center text-sm text-slate-500">
			Brak danych do wykresu dla wybranych filtrów.
		</div>
	</div>
);
