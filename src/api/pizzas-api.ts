import { Pizza, PageRequest, Page } from "../features/pizzas/dto/Pizza";
import { axiosClient } from "./axios-client";

export const getPizzasApi = async (pageRequest: PageRequest): Promise<Page<Pizza>> => {
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
		.then(response => response.data)
		
}

export const getOnePizzaApi = async (id: string): Promise<Pizza> => {
	return await axiosClient.get(`/pizza/${id}`)
		.then(response => response.data)
}