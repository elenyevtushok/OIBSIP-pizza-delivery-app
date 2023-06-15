export interface Order {
	_id: string;
	items: OrderItem[];
	delivery: string;
	status: string;
	totalPrice: number;
	totalAmount: number;
}

export interface OrderItem {
	_id: string;
	productId: string;
	price: number;
	amount: number;
	size: string;
}

export interface UpdateOrder{
	userId?: string;
	addressId?: string;
	paymentMethod?: string;
}

export interface CreateOrderDTO {
	orderItem: CreateOrderItemDTO;
}

export interface CreateOrderItemDTO {
	productId: string;
	size: string;
}