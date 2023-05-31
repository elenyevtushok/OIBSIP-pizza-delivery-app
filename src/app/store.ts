import { configureStore } from '@reduxjs/toolkit';
import pizzasReducer from '../features/pizzas/pizzasSlice';

export const store = configureStore({
	reducer: {
		pizzas: pizzasReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


