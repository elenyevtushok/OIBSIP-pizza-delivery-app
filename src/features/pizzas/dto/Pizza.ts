export interface Pizza {
	_id: string;
	name: string;
	description: string;
	ingredients: string[];
	sizes: PizzaSize[];
	imageUrls: string[];
}

export interface PizzaSize {
	size: string,
	price: number,
	weight: number,
}

export interface PageRequest {
	page: number;
	size: number;
}

export interface Page<T> {
	docs: T[];
	totalDocs: number;
	limit: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	page?: number | undefined;
	totalPages: number;
	pagingCounter: number;
}