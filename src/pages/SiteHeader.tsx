import React, { useState } from 'react';
import { AppstoreOutlined, HeartOutlined, HomeOutlined, MailOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
	{
		label: 'Home',
		key: 'homepage',
	},
	{
		label: 'Choose Pizza',
		key: 'choosepizza',
	},
	{
		label: 'Make custom pizza',
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

const SiteHeader: React.FC = () => {
	const [current, setCurrent] = useState('homepage');

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default SiteHeader;