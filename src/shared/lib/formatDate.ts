const formatter = new Intl.DateTimeFormat('pl-PL', {
	dateStyle: 'short',
	timeStyle: 'short',
});

export const formatDateTime = (iso: string): string => {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) {
		return '--';
	}
	return formatter.format(date);
};

export const isDateDifferent = (date1: string, date2: string) => {
	return formatDateTime(date1) !== formatDateTime(date2);
};
