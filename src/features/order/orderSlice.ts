import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store';
import { CreateOrderDTO, Order } from './dto/Order';
import { createOrderApi } from '../../api/order-api';


const orderAdapter = createEntityAdapter<Order>({
	selectId: order => order._id,
})

// export const createOrder = createAsyncThunk.withTypes<{ state: RootState }>()(
// 	'order/createOrder',
// 	async (productId: string, size: string) => {
// 		const request: CreateOrderDTO = {
// 			orderItem: {
// 				productId: productId,
// 				size: size
// 			}
// 		}
// 		return await createOrderApi(request);
// 	}
// );

export const orderSlice = createSlice({
	name: 'order',
	initialState: orderAdapter.getInitialState,
	reducers: {
		orderAdd: orderAdapter.addOne,
	},
	extraReducers: (builder) => {
		// builder
		// 	.addCase(createOrder.fulfilled, (state, action) => {
		// 		orderAdapter.addOne(state, action.payload)
		// 	})
	},
})

export const {
	selectById: selectOrderById,
	selectAll: selectOrder
} = orderAdapter.getSelectors((state: RootState) => state.order)
export const { orderAdd } = orderSlice.actions
export default orderSlice.reducer