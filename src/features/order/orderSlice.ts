import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store';
import { Order, UpdateOrder } from './dto/Order';
import { getCurrentOrderApi, updateOrderApi } from '../../api/order-api';


const orderAdapter = createEntityAdapter<Order>({
	selectId: order => order._id,
})

export const orderSlice = createSlice({
	name: 'order',
	initialState: orderAdapter.getInitialState,
	reducers: {
		setOrder: orderAdapter.setOne,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCurrentOrder.fulfilled, (state, action) => {
				console.log(`setOrder:  ${JSON.stringify(action.payload)}`)
				if (action.payload != null) {
					orderAdapter.setOne(state, action.payload)
				}
			})
	},
})

export const loadCurrentOrder = createAsyncThunk.withTypes<{ state: RootState }>()(
	'order/loadCurrentOrder',
	async () => {
		return await getCurrentOrderApi();
	}
);

export const updateOrder = createAsyncThunk(
	'order/updateOrder',
	async ({ orderId, updateOrder }: { orderId: string, updateOrder: UpdateOrder }) => {
		return await updateOrderApi(orderId, updateOrder);
	}
);

export const {
	selectById: selectOrderById,
	selectAll: selectOrder
} = orderAdapter.getSelectors((state: RootState) => state.order)

export const selectCurrentOrder = (state: RootState) => {
	const orders = selectOrder(state);
	console.log(`selectCurrentOrder:  ${JSON.stringify(orders)}`)
	return orders.find(order => order?._id != null);
};

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer