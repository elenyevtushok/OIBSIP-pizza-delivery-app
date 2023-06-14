import { Address, CreateAddressDTO } from "../features/address/dto/Address"
import { axiosClient } from "./axios-client";

export const createAddressApi = async (address:Address): Promise<Address> => {
	const request: CreateAddressDTO = {
		city: address.city,
		street: address.street,
		houseNumber: address.houseNumber,
		apartment: address.apartment
	}
	return await axiosClient.post("/address", request)
		.then(response => response.data)
}
