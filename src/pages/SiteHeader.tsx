import React, { useState } from 'react';
import { AppstoreOutlined, HeartOutlined, HomeOutlined, MailOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
	{
		label: 'Home',
		key: 'homepage',
		icon: <HomeOutlined />,
	},
	{
		label: 'Choose Pizza',
		key: 'choosepizza',
		icon: <AppstoreOutlined />
	},
	{
		label: 'Make custom pizza',
		key: 'custompizza',
		icon: <HeartOutlined />
	},
	{
		label: 'Login',
		key: 'login',
		icon: <UserOutlined />,
		children: [
					{
						label: 'Log In',
						key: 'setting:1',
					},
					{
						label: 'Create an account',
						key: 'setting:2',
					},
		],
	},
	{
		label: 'Order',
		key: 'order',
		icon: <ShoppingCartOutlined />
	},
];

const SiteHeader: React.FC = () => {
	const [current, setCurrent] = useState('homepage');

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default SiteHeader;