import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store';
import { Order, CompleteCheckoutDTO } from './dto/Order';
import { getCurrentOrderApi, completeCheckoutApi } from '../../api/order-api';


interface OrderState {
	currentOrder: Order | null;
}

const initialState: OrderState = {
	currentOrder: null,
};


export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action) => {
			state.currentOrder = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCurrentOrder.fulfilled, (state, action) => {
				console.log(`setOrder:  ${JSON.stringify(action.payload)}`);
				if (action.payload != undefined) {
					console.log("Set current order = null");
					state.currentOrder = null;
					return;
				}
				if (action.payload != null) {
					state.currentOrder = action.payload;
				}
			})
			.addCase(completeCheckout.fulfilled, (state, action) => {
				state.currentOrder = null;
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

export const selectCurrentOrder = (state: RootState) => state.order.currentOrder;

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer