import { CreateUserDTO, User } from "../features/user/dto/User";
import { axiosClient } from "./axios-client";

export const createUserApi = async (request:CreateUserDTO): Promise<User> => {
	return await axiosClient.post("/user", request)
		.then(response => response.data)
}
