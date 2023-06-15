import React, { useEffect, useState } from 'react';
import { Badge, Button, Drawer, InputNumber, Table } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { loadCurrentOrder, selectCurrentOrder } from '../features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { store } from '../app/store';
import CartTable from './CartTable';


store.dispatch(loadCurrentOrder())

export const AppCart = () => {
	const order = useAppSelector(selectCurrentOrder);
	const dispatch = useAppDispatch();

	const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

	useEffect(() => {
		// Dispatch the loadCurrentOrder action whenever the component mounts or the order state changes
		dispatch(loadCurrentOrder());
	}, [dispatch]);

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
			{order &&
				<Drawer
					open={cartDrawerOpen}
					onClose={() => {
						setCartDrawerOpen(false);
					}}
					title="Your Cart"
					contentWrapperStyle={{ width: 800 }}
				>
					<CartTable order={order} />
					<Link to={"/checkout"}><button className='add-to-card-button' onClick={() => {
						setCartDrawerOpen(false);
					}}
					>
						Proceed to Checkout
					</button>
					</Link>
				</Drawer>
			}

		</div>
	);
};
