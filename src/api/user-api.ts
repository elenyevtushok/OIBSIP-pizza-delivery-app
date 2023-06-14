import { CreateUserDTO, User } from "../features/user/dto/User";
import { axiosClient } from "./axios-client";

export const createUserApi = async (user:User): Promise<User> => {
	const request: CreateUserDTO = {
		firstName: user.firstName,
		secondName: user.secondName,
		email: user.email,
		phone: user.email
	}
	return await axiosClient.post("/user", request)
		.then(response => response.data)
}
