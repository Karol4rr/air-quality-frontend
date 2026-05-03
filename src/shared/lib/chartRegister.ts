import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';

let registered = false;

export const ensureChartJsRegistered = (): void => {
	if (registered) {
		return;
	}
	ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);
	registered = true;
};
