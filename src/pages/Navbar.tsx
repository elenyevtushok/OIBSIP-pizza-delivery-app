import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
	{
		label: <Link to='/' > Home</Link> ,
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
		label: 'Login',
		key: 'login',
	},
	{
		label: 'Your order',
		key: 'order',
	},
];

const Navbar: React.FC = () => {
	const [current, setCurrent] = useState('');

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Navbar;