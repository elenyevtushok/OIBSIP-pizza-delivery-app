import { configureStore } from '@reduxjs/toolkit';
import pizzasReducer from '../features/pizzas/pizzasSlice';
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
	reducer: {
		pizzas: pizzasReducer,
		order: orderReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


