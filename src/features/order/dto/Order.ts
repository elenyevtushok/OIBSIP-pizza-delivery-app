export interface Order {
	_id: string;
	items: OrderItem[];
	delivery: string;
	status: string;
	totalPrice: number;
	totalAmount: number;
}

export interface OrderItem {
	productId: string;
	additionals: string[];
	price: number;
	amount: number;
}

export interface CreateOrderDTO {
	orderItem: CreateOrderItemDTO;
}

export interface CreateOrderItemDTO {
	productId: string;
	size: string;
}