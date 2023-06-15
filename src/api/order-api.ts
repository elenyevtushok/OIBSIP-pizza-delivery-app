import { CreateOrderDTO, CreateOrderItemDTO, Order, UpdateOrder } from "../features/order/dto/Order";
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

export const addOrderItemApi = async (orderId: string, productId: string, size: string): Promise<Order> => {
	const request: CreateOrderItemDTO = {
		productId: productId,
		size: size
	}
	return await axiosClient.put(`/order/${orderId}/item`, request)
		.then(response => response.data)
}

export const updateOrderApi = async (orderId: string, request: UpdateOrder ): Promise<Order> => {
	return await axiosClient.put(`/order/${orderId}`, request)
		.then(response => response.data)
}

export const deleteOrderItemApi = async (orderId: string, orderItemId: string, deleteOrderItemCompletely?: boolean): Promise<Order> => {
	return await axiosClient.delete(`/order/${orderId}/item/${orderItemId}`,
		{
			params: {
				deleteOrderItemCompletely: deleteOrderItemCompletely
			}
		})
		.then(response => response.data)
}