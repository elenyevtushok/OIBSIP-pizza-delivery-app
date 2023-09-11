import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Pizza, PageRequest } from './dto/Pizza';
import { RootState } from '../../app/store';
import { getPizzasApi } from '../../api/pizzas-api';

interface PizzasState {
	currentPizzas: Pizza[];
	totalCount: number
}

const initialState: PizzasState = {
	currentPizzas: [],
	totalCount: 0
};

const DEFAULT_PAGE_SIZE = 6;


export const loadMorePizzas = createAsyncThunk.withTypes<{ state: RootState }>()(
	'pizzas/loadPage',
	async (page: number) => {
		const request: PageRequest = {
			page: page,
			size: DEFAULT_PAGE_SIZE
		}
		return await getPizzasApi(request);
	}
);

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadMorePizzas.fulfilled, (state, action) => {
				state.currentPizzas = state.currentPizzas.concat(action.payload.docs);
				state.totalCount = action.payload.totalDocs
			})
	},
})


export const selectPizzaByProductId = (state: RootState, productId: string) => {
	return selectPizza(state)?.filter((pizza) => pizza._id === productId);
};

export const selectPizzasByProductIds = (state: RootState, productIds: string[]) => {
	return selectPizza(state)?.filter((pizza) => productIds.includes(pizza._id));
};

export const selectHasMorePages = (state: RootState) => {
	return state.pizzas.currentPizzas.length < state.pizzas.totalCount;
};

export const selectPizzaById = (state: RootState) => state.pizzas.currentPizzas;
export const selectPizza = (state: RootState) => state.pizzas.currentPizzas;


export default pizzasSlice.reducer