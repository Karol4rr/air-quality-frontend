import type { CityStatRow } from '@/features/airQuality/types';
import { es2026, in2026, pl2026, vn2026 } from './exampleData';

const pl = {
	2026: pl2026,
	2025: pl2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 0.95).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 0.95).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 0.95).toFixed(2),
	})),
	2024: pl2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 2).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 2).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 2).toFixed(2),
	})),
	2023: pl2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 1.5).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 1.5).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 1.5).toFixed(2),
	})),
};

const es = {
	2026: es2026,
	2025: es2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 0.92).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 0.92).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 0.92).toFixed(2),
	})),
	2024: es2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 2).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 2).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 2).toFixed(2),
	})),
	2023: es2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 1.5).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 1.5).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 1.5).toFixed(2),
	})),
};

const vn = {
	2026: vn2026,
	2025: vn2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 0.92).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 0.92).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 0.92).toFixed(2),
	})),
	2024: vn2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 2).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 2).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 2).toFixed(2),
	})),
	2023: vn2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 1.5).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 1.5).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 1.5).toFixed(2),
	})),
};

const ind = {
	2026: in2026,
	2025: in2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 0.92).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 0.92).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 0.92).toFixed(2),
	})),
	2024: in2026.map((r) => ({
		...r,
		maxNO2: (Number.parseFloat(r.maxNO2) * 2).toFixed(2),
		maxCO: (Number.parseFloat(r.maxCO) * 2).toFixed(2),
		maxPM10: (Number.parseFloat(r.maxPM10) * 2).toFixed(2),
	})),
};
export type CityStatsByYear = Record<number, CityStatRow[]>;

export const cityStatsByCountryId: Record<string, CityStatsByYear> = {
	PL: pl,
	ES: es,
	VN: vn,
	IN: ind,
};

const uniqueYearsDesc = (): number[] => {
	const years = new Set<number>();
	for (const byYear of Object.values(cityStatsByCountryId)) {
		for (const k of Object.keys(byYear)) {
			years.add(Number.parseInt(k, 10));
		}
	}
	return [...years].sort((a, b) => b - a);
};

export const availableYears: readonly number[] = uniqueYearsDesc();

export const getFixtureCityStats = (countryId: string, year: number): CityStatRow[] | undefined => {
	return cityStatsByCountryId[countryId]?.[year];
};

const buildCityDisplayNameById = (): Record<string, string> => {
	const acc: Record<string, string> = {};
	for (const byYear of Object.values(cityStatsByCountryId)) {
		for (const rows of Object.values(byYear)) {
			for (const r of rows) {
				acc[r.cityId] = r.city;
			}
		}
	}
	return acc;
};

export const cityDisplayNameById = buildCityDisplayNameById();
