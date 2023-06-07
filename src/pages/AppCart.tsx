import React, { useState } from 'react';
import { Badge, Button, Drawer, InputNumber, Table } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { loadCurrentOrder, selectCurrentOrder } from '../features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { store } from '../app/store';
import CartTable from './CartTable';
import { selectPizzaById } from '../features/pizzas/pizzasSlice';

store.dispatch(loadCurrentOrder())

export const AppCart = () => {
	const order = useAppSelector(selectCurrentOrder);

	const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

	return (
		<div>
			<Badge
				count={order?.totalAmount}
			>
				<ShoppingCartOutlined
					onClick={() => {
						setCartDrawerOpen(true);
					}}
					className="ant-menu-item ant-menu-submenu-title app-cart-icon" />
			</Badge>
			<Drawer
				open={cartDrawerOpen}
				onClose={() => {
					setCartDrawerOpen(false);
				}}
				title="Your Cart"
				contentWrapperStyle={{ width: 700 }}
			>
				<CartTable order={order} />
				<Link to={"/checkout"}><Button onClick={() => {
					setCartDrawerOpen(false);
				}}
					type="primary"
				>
					Proceed to Checkout
				</Button>
				</Link>

			</Drawer>
		</div>
	);
};
