import { CreateOrderDTO, CreateOrderItemDTO, Order } from "../features/order/dto/Order";
import { axiosClient } from "./axios-client";

export const createOrderApi = async (productId: string, size: string): Promise<Order> => {
	const request: CreateOrderDTO = {
		orderItem: {
			productId: productId,
			size: size
		}
	}
	return await axiosClient.post("/order", request)
		.then(response => response.data)
}

export const getCurrentOrderApi = async (): Promise<Order> => {
	return await axiosClient.get(`/order/current`)
		.then(response => response.data)
}