import { Address, CreateAddressDTO } from "../features/address/dto/Address"
import { axiosClient } from "./axios-client";

export const createAddressApi = async (request: CreateAddressDTO): Promise<Address> => {
	return await axiosClient.post("/address", request)
		.then(response => response.data)
}
