import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Pizza, PageRequest } from './dto/Pizza';
import { RootState } from '../../app/store';
import { getPizzasApi } from '../../api/pizzas-api';

const pizzasAdapter = createEntityAdapter<Pizza>({
	selectId: pizza => pizza._id,
})

const DEFAULT_PAGE_SIZE = 10;

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
	initialState: pizzasAdapter.getInitialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadMorePizzas.fulfilled, (state, action) => {
				pizzasAdapter.addMany(state, action.payload)
			})
	},
})

export const selectPizzaByProductId = (state: RootState, productId: string) => {
	return selectPizza(state).find((pizza) => pizza._id === productId);
};

export const selectPizzasByProductIds = (state: RootState, productIds: string[]) => {
	return selectPizza(state).filter((pizza) => productIds.includes(pizza._id));
};


export const {
	selectById: selectPizzaById,
	selectAll: selectPizza
} = pizzasAdapter.getSelectors((state: RootState) => state.pizzas)

export default pizzasSlice.reducer