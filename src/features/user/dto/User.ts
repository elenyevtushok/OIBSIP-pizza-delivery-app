export interface User{
	_id: string;
	firstName: string;
	secondName: string;
	email: string;
	phone: string;
}

export interface CreateUserDTO {
	firstName: string;
	secondName: string;
	email: string;
	phone: string;
}