import React from 'react';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { loadCurrentOrder, selectCurrentOrder } from '../features/order/orderSlice';
import { useAppSelector } from '../app/hooks';
import { store } from '../app/store';

store.dispatch(loadCurrentOrder())

export const AppCart = () => {
	const order = useAppSelector(selectCurrentOrder);
	return (
		<Link to='/cart'>
			<Badge count={order?.totalAmount}>
				<ShoppingCartOutlined className="ant-menu-item ant-menu-submenu-title app-cart-icon" />
			</Badge>
		</Link>
	);
};
