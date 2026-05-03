import { useEffect, useState } from 'react';

const CITY_FILTER_DEBOUNCE_MS = 300;

export const useDebounce = <T>(value: T, delayMs = CITY_FILTER_DEBOUNCE_MS): T => {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const id = window.setTimeout(() => {
			setDebounced(value);
		}, delayMs);
		return () => {
			window.clearTimeout(id);
		};
	}, [value, delayMs]);

	return debounced;
};
