import React from 'react';
import { Table, Image, InputNumber } from 'antd';
import { Order } from '../features/order/dto/Order';
import { useAppSelector } from '../app/hooks';
import { selectPizzaById } from '../features/pizzas/pizzasSlice';


interface CartTableProps {
	order: Order | null;
}

interface PizzaData {
	pizza: string;
	image: string;
	size: string;
	amount: number;
	price: number;
	onChangeQuantity: (value: number | null) => void;
}

const CartTable: React.FC<CartTableProps> = ({ order }) => {

	const columns = [
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
		},
		{
			title: 'Pizza',
			dataIndex: 'pizza',
			key: 'pizza',
			render: (pizza: string, record: PizzaData) => {
				return (
					<div>
						<p>{pizza}</p>
						<p>{record.size}</p>
					</div>
				)
			}
		},
		{
			title: 'Quantity',
			dataIndex: 'amount',
			key: 'amount',
			render: (amount: number, record: PizzaData) => {
				return (
					<InputNumber
						min={0}
						defaultValue={amount}
						onChange={(value) => record.onChangeQuantity(value)}
					/>
				);
			},
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price: number, record: PizzaData) => {
				const totalPrice = price * record.amount; // Calculate the total price based on quantity
				return `€ ${totalPrice.toFixed(2)}`; // Display the formatted total price
			},
		},
	];

	const pizzaData = useAppSelector((state) =>
		order?.items.map((item) => {
			const pizza = selectPizzaById(state, item.productId);
			return {
				...item,
				pizza: pizza?.name || '',
				image: (
					<Image
						src={pizza?.imageUrls[0] || ''}
						alt={pizza?.name || ''}
						width={100}
						height={100}
					/>
				),
				onChangeQuantity: (value: number) => {
					console.log(`New quantity: ${value}`);
				},
			};
		})
	);

	return (
		<Table columns={columns} dataSource={pizzaData} pagination={false} />
	);
};


export default CartTable;