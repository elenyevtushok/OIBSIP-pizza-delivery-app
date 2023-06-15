export interface User extends CreateUserDTO{
	_id: string;
}

export interface CreateUserDTO {
	firstName: string;
	secondName: string;
	email: string;
	phone: string;
}