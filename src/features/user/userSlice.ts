import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUserDTO, User } from './dto/User';
import { createUserApi } from '../../api/user-api';
import { RootState } from '../../app/store';

interface UserState {
	user: User | null;
}

const initialState: UserState = {
	user: null,
};

export const createUser = createAsyncThunk(
	'user/createUser',
	async (user: CreateUserDTO) => {
		return await createUserApi(user);
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.fulfilled, (state, action) => {
				setUser(action.payload)
			})
	}
})

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
