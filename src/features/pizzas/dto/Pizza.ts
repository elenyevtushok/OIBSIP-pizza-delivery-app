export interface Pizza {
	_id: string;
	name: string;
	description: string;
	ingredients: string[];
	price: number;
	imageUrls: string[];
}

export interface PageRequest {
	page: number;
	size: number;
}