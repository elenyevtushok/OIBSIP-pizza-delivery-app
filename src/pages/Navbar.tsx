import React, { useState } from 'react';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { selectPizza } from '../features/pizzas/pizzasSlice';
import { AppCart } from './AppCart';

const items: MenuProps['items'] = [
	{
		label: <Link to='/' > Home</Link>,
		key: 'homepage',
	},
	{
		label: <Link to='/pizzas' >Choose Pizza</Link>,
		key: 'choosepizza',
	},
	{
		label: <Link to='/pizza/custom' >Make your Pizza</Link>,
		key: 'custompizza',
	},
	{
		label: <Link to='/login'>Login</Link>,
		key: 'login',
	},
	{
		label: <Link to='/register'>Register</Link>,
		key: 'register',
	}
];

const Navbar: React.FC = () => {
	const [current, setCurrent] = useState('');

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};


	return (
		<div className="app-header">
			<Menu className='app-menu' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
			<AppCart />
		</div>
	)


};
export default Navbar;