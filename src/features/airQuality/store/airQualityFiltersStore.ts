import {
	defaultCountryId,
	defaultYear,
	sanitizeCountryId,
	sanitizeYear,
} from '@/features/airQuality/utils/airQualityFiltersUtils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AirQualityFiltersState = {
	countryId: string;
	year: number;
	setCountryId: (countryId: string) => void;
	setYear: (year: number) => void;
};

export const useAirQualityFiltersStore = create<AirQualityFiltersState>()(
	persist(
		(set) => ({
			countryId: defaultCountryId(),
			year: defaultYear(),
			setCountryId: (countryId) => set({ countryId: sanitizeCountryId(countryId) }),
			setYear: (year) => set({ year: sanitizeYear(year) }),
		}),
		{
			name: 'airQualityFilters',
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				countryId: state.countryId,
				year: state.year,
			}),
			merge: (persistedState, currentState) => {
				const p = persistedState as Partial<Pick<AirQualityFiltersState, 'countryId' | 'year'>> | null | undefined;
				if (!p) {
					return currentState;
				}
				return {
					...currentState,
					countryId: sanitizeCountryId(p.countryId ?? currentState.countryId),
					year: sanitizeYear(p.year ?? currentState.year),
				};
			},
		},
	),
);
