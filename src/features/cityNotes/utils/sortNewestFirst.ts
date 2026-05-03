import type { CityNote } from '../types';

export const sortNewestFirst = (notes: CityNote[]): CityNote[] => {
	return [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
