import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store';
import { Order } from './dto/Order';
import { getCurrentOrderApi } from '../../api/order-api';


const orderAdapter = createEntityAdapter<Order>({
	selectId: order => order._id,
})

export const orderSlice = createSlice({
	name: 'order',
	initialState: orderAdapter.getInitialState,
	reducers: {
		orderAdd: orderAdapter.addOne,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCurrentOrder.fulfilled, (state, action) => {
				orderAdapter.addOne(state, action.payload)
			})
	},
})

export const loadCurrentOrder = createAsyncThunk.withTypes<{ state: RootState }>()(
	'order/loadCurrentOrder',
	async () => {
		return await getCurrentOrderApi();
	}
);

export const {
	selectById: selectOrderById,
	selectAll: selectOrder
} = orderAdapter.getSelectors((state: RootState) => state.order)

export const selectCurrentOrder = (state: RootState) => {
	const orders = selectOrder(state);
	return orders.length > 0 ? orders[0] : null;
};

export const { orderAdd } = orderSlice.actions
export default orderSlice.reducer