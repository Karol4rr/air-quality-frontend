import raw from '@/mocks/countries.json';

export type Country = {
	id: string;
	name: string;
};

export const countries: Country[] = raw as Country[];
