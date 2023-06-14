import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from './dto/User';
import { createUserApi } from '../../api/user-api';

export const createUser = createAsyncThunk(
	'user/createUser',
	async (user: User) => {
		const response = await createUserApi(user);
		return response;
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
	}
});

export default userSlice.reducer;
