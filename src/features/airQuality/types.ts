export type PollutantKey = 'maxPM10' | 'maxCO' | 'maxNO2';

export type CityStatRow = {
	cityId: string;
	city: string;
	maxNO2: string;
	maxCO: string;
	maxPM10: string;
};

export type CityStatsSortKey = 'city' | PollutantKey;

export type SortDirection = 'asc' | 'desc';

export type SortPhase = 'asc' | 'desc' | null;

export type CityStatsQueryParams = {
	page: number;
	pageSize: number;
	cityFilter: string;
	sortKey: CityStatsSortKey;
	sortPhase: SortPhase;
};

export type CityStatsPageResponse = {
	items: CityStatRow[];
	totalCount: number;
};

export type PollutantBarChartProps = {
	rows: CityStatRow[];
};

export type CityStatsTableProps = {
	rows: CityStatRow[];
	sortKey: CityStatsSortKey;
	sortPhase: SortPhase;
	onSort: (key: CityStatsSortKey) => void;
	cityFilter: string;
	onCityFilterChange: (value: string) => void;
	page: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isFetching?: boolean;
};

export type CityStatsCityColumnHeaderProps = {
	sortKey: CityStatsSortKey;
	sortPhase: SortPhase;
	onSort: (key: CityStatsSortKey) => void;
	cityFilter: string;
	onCityFilterChange: (value: string) => void;
};
