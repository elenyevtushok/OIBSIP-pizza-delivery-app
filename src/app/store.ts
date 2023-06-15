import { configureStore } from '@reduxjs/toolkit';
import pizzasReducer from '../features/pizzas/pizzasSlice';
import orderReducer from '../features/order/orderSlice';
import addressReducer from '../features/address/addressSlice';
import userReducer from '../features/user/userSlice'

export const store = configureStore({
	reducer: {
		pizzas: pizzasReducer,
		order: orderReducer,
		address: addressReducer,
		user: userReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


