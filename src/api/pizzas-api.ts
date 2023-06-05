import { Pizza, PageRequest } from "../features/pizzas/dto/Pizza";
import { axiosClient } from "./axios-client";

export const getPizzasApi = async (pageRequest: PageRequest): Promise<Pizza[]> => {
	return await axiosClient.post("/pizza/search", {
		"query": {
		},
		"options": {
			"page": pageRequest.page,
			"limit": pageRequest.size,
			"sort": {
				"createdAt": "asc"
			}
		}
	})
		.then(response => response.data.docs)
}

export const getOnePizzaApi = async (id: string): Promise<Pizza> => {
	return await axiosClient.get(`/pizza/${id}`)
		.then(response => response.data)
}