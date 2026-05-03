import { CITY_STATS_POLLUTANT_COLUMNS } from '../../lib/cityStatsTableConfig';
import type { CityStatRow } from '../../types';
import { pm10ValueTextClass } from '../../utils/pm10ValueTextClass';
import { cn } from '@/shared/lib/cn';

export const NumericWithUnit = ({ displayValue, valueKey }: { displayValue: string; valueKey: keyof CityStatRow }) => {
	const column = CITY_STATS_POLLUTANT_COLUMNS.find((col) => col.valueKey === valueKey);
	const unit = column?.unit;
	const colorForNumber = valueKey === 'maxPM10' ? pm10ValueTextClass(displayValue) : 'text-slate-900';

	return (
		<span className="whitespace-nowrap">
			<span className={cn('font-medium', colorForNumber)}>{displayValue}</span>
			<span className="ml-1 text-xs font-normal text-slate-500">{unit}</span>
		</span>
	);
};
