export interface Address extends CreateAddressDTO{
	_id: string;

}

export interface CreateAddressDTO{
	city: string;
	street: string;
	houseNumber: string;
	apartment?: string;
}