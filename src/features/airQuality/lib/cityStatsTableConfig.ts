import type { CityStatRow, PollutantKey } from '@/features/airQuality/types';

export type CityStatsPollutantColumnConfig = {
	sortKey: PollutantKey;
	label: string;
	unit: string;
	valueKey: keyof Pick<CityStatRow, PollutantKey>;
};

export const CITY_STATS_POLLUTANT_COLUMNS: CityStatsPollutantColumnConfig[] = [
	{ sortKey: 'maxPM10', label: 'PM10 (max)', unit: 'µg/m³', valueKey: 'maxPM10' },
	{ sortKey: 'maxCO', label: 'CO (max)', unit: 'mg/m³', valueKey: 'maxCO' },
	{ sortKey: 'maxNO2', label: 'NO₂ (max)', unit: 'µg/m³', valueKey: 'maxNO2' },
];

export const CITY_STATS_NOTES_COLUMN = {
	headerLabel: 'Notatki',
	notesPath: (cityId: string) => `/notes/${cityId}`,
} as const;
