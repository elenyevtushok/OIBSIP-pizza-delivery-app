import React from 'react';
import { Table, Image, InputNumber } from 'antd';
import { Order, OrderItem } from '../features/order/dto/Order';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectPizzasByProductIds } from '../features/pizzas/pizzasSlice';
import { addOrderItemApi } from '../api/order-api';
import { setOrder } from '../features/order/orderSlice';
import { Pizza } from '../features/pizzas/dto/Pizza';


interface CartTableProps {
	order: Order;
}

interface OrderItemData {
	orderItem: OrderItem;
	pizza: Pizza | undefined;
}

const CartTable: React.FC<CartTableProps> = ({ order }) => {
	const dispatch = useAppDispatch();
	const pizzaProductIds = order.items.map((item) => item.productId);
	const pizzas = useAppSelector((state) => selectPizzasByProductIds(state, pizzaProductIds))

	const orderItemsData: OrderItemData[] = order.items.map((item) => {
		const pizza = pizzas.find(pizza => pizza._id == item.productId);
		return {
			orderItem: item,
			pizza: pizza
		};
	})

	const increaseOrderItem = async (orderItemData: OrderItemData) => {
		const updatedOrder = await addOrderItemApi(order!._id, orderItemData.orderItem.productId, orderItemData.orderItem.size);
		dispatch(setOrder(updatedOrder));
	};

	const onStepHandler = (orderItem: OrderItemData, type: 'up' | 'down') => {
		if (type == 'up') {
			increaseOrderItem(orderItem);
		}
	}


	const columns = [
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			render: (image: string, record: OrderItemData) => {
				return (
					<Image
						src={record.pizza?.imageUrls[0] || ''}
						alt={record.pizza?.name || ''}
						width={100}
						height={100}
					/>
				)
			}
		},
		{
			title: 'Pizza',
			dataIndex: 'pizza',
			key: 'pizza',
			render: (pizza: string, record: OrderItemData) => {
				return (
					<div>
						<p>{record.pizza?.name}</p>
						<p>{record.orderItem.size}</p>
					</div>
				)
			}
		},
		{
			title: 'Quantity',
			dataIndex: 'amount',
			key: 'amount',
			render: (amount: number, record: OrderItemData) => {
				return (
					<InputNumber
						min={0}
						defaultValue={record.orderItem.amount}
						onStep={(value, info) => onStepHandler(record, info.type)}
					/>
				);
			},
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price: number, record: OrderItemData) => {
				const totalPrice = record.orderItem.price * record.orderItem.amount; // Calculate the total price based on quantity
				return `€ ${totalPrice.toFixed(2)}`; // Display the formatted total price
			},
		},
	];

	return (
		<Table columns={columns} dataSource={orderItemsData} pagination={false} />
	);
};


export default CartTable;