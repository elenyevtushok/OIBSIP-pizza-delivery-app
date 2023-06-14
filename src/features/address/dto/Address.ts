export interface Address{
	_id: string;
	city: string;
	street: string;
	houseNumber: string;
	apartment?: string;
}

export interface CreateAddressDTO{
	city: string;
	street: string;
	houseNumber: string;
	apartment?: string;
}