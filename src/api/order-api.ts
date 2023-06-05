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

// export const getOnePizzaApi = async (id: string): Promise<Pizza> => {
// 	return await axiosClient.get(`/pizza/${id}`)
// 		.then(response => response.data)
// }