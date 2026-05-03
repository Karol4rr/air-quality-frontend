import type { PollutantKey } from '@/features/airQuality/types';
import type { ChartOptions } from 'chart.js';

export const POLLUTANT_ORDER: PollutantKey[] = ['maxPM10', 'maxCO', 'maxNO2'];

export const INITIALLY_HIDDEN: ReadonlySet<PollutantKey> = new Set(['maxCO', 'maxNO2']);

export const POLLUTANT_LABELS: Record<PollutantKey, string> = {
	maxPM10: 'PM10 (max)',
	maxCO: 'CO (max)',
	maxNO2: 'NO₂ (max)',
};

export const POLLUTANT_UNITS: Record<PollutantKey, string> = {
	maxPM10: 'µg/m³',
	maxCO: 'mg/m³',
	maxNO2: 'µg/m³',
};

export const COLORS: Record<PollutantKey, string> = {
	maxPM10: 'rgba(14, 165, 233, 0.85)',
	maxCO: 'rgba(249, 115, 22, 0.85)',
	maxNO2: 'rgba(168, 85, 247, 0.85)',
};

export const CHART_OPTIONS = {
	responsive: true,
	maintainAspectRatio: false,
	interaction: {
		mode: 'index',
		intersect: false,
	},
	animation: {
		duration: 900,
		easing: 'easeOutQuart',
	},
	plugins: {
		legend: {
			position: 'top',
			onHover(evt) {
				const el = evt.native?.target;
				if (el instanceof HTMLElement) {
					el.style.cursor = 'pointer';
				}
			},
			onLeave(evt) {
				const el = evt.native?.target;
				if (el instanceof HTMLElement) {
					el.style.cursor = 'default';
				}
			},
			labels: {
				color: '#334155',
				boxWidth: 12,
			},
		},
		tooltip: {
			callbacks: {
				label(ctx) {
					const key = POLLUTANT_ORDER[ctx.datasetIndex];
					const unit = key ? POLLUTANT_UNITS[key] : '';
					const v = ctx.parsed.y;
					const n = typeof v === 'number' && !Number.isNaN(v) ? v.toFixed(2) : String(v);
					const suffix = unit ? ` ${unit}` : '';
					return `${ctx.dataset.label ?? ''}: ${n}${suffix}`;
				},
			},
		},
	},
	scales: {
		x: {
			ticks: {
				color: '#64748b',
				maxRotation: 45,
				minRotation: 35,
				autoSkip: false,
			},
			grid: {
				color: 'rgba(226, 232, 240, 0.9)',
			},
		},
		y: {
			ticks: { color: '#64748b' },
			grid: {
				color: 'rgba(226, 232, 240, 0.9)',
			},
		},
	},
} satisfies ChartOptions<'bar'>;
