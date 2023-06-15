import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAddressApi } from '../../api/address-api';
import { Address, CreateAddressDTO } from '../address/dto/Address';

export const createAddress = createAsyncThunk(
	'address/createAddress',
	async (address: CreateAddressDTO) => {
		const response = await createAddressApi(address);
		return response;
	}
);

const addressSlice = createSlice({
	name: 'address',
	initialState: {},
	reducers: {
	}
});

export default addressSlice.reducer;
