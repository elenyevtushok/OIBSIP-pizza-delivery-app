import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store';
import { Order, CompleteCheckoutDTO } from './dto/Order';
import { getCurrentOrderApi, completeCheckoutApi } from '../../api/order-api';


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
			.addCase(completeCheckout.fulfilled, (state, action) => {
				orderAdapter.removeAll(state)
			})
	},
})

export const loadCurrentOrder = createAsyncThunk.withTypes<{ state: RootState }>()(
	'order/loadCurrentOrder',
	async () => {
		return await getCurrentOrderApi();
	}
);

export const completeCheckout = createAsyncThunk(
	'order/completeCheckout',
	async ({ orderId, body: completeCheckoutRequest }: { orderId: string, body: CompleteCheckoutDTO }) => {
		return await completeCheckoutApi(orderId, completeCheckoutRequest);
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