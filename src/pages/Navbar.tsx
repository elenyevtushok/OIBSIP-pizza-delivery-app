import React, { useState } from 'react';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppCart } from './AppCart';
import { useCookies } from 'react-cookie';
import cryptoRandomString from 'crypto-random-string';

const items: MenuProps['items'] = [
	{
		label: <Link to='/' > Home</Link>,
		key: 'homepage',
	},
	{
		label: <Link to='/pizzas' >Choose Pizza</Link>,
		key: 'choosepizza',
	}
	// {
	// 	label: <Link to='/pizza/custom' >Make your Pizza</Link>,
	// 	key: 'custompizza',
	// },
	// {
	// 	label: <Link to='/login'>Login</Link>,
	// 	key: 'login',
	// },
	// {
	// 	label: <Link to='/register'>Register</Link>,
	// 	key: 'register',
	// }
];

const Navbar: React.FC = () => {
	const [cookies, setCookie] = useCookies(["sessionId"]);
	if (cookies.sessionId == null) {
		const randomSessionId = cryptoRandomString({ length: 10 });
		setCookie("sessionId", randomSessionId, { path: "/" });
	}

	const [current, setCurrent] = useState('');

	const onClick: MenuProps['onClick'] = (e) => {
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