const tailwindClassForPm10Values = (pm10Value: number): string => {
	if (pm10Value < 41) return 'text-emerald-500';
	if (pm10Value < 64) return 'text-amber-500';
	if (pm10Value < 87) return 'text-red-500';
	return 'text-red-700';
};

export const pm10ValueTextClass = (textFromCell: string): string => {
	const pm10 = Number.parseFloat(textFromCell);
	if (!Number.isFinite(pm10)) {
		return 'text-slate-900';
	}
	return tailwindClassForPm10Values(pm10);
};
