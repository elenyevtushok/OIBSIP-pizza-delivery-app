import React from 'react';
import { Button, Form, Input } from 'antd';
import { useAppDispatch } from '../app/hooks';
import { User } from '../features/user/dto/User';
import { createUser } from '../features/user/userSlice';

export const UserForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const[form] = Form.useForm();

	const onFinish = (values:User) => {
		console.log('Success:', values);
		dispatch(createUser(values));
	};

	// const onFinishFailed = (errorInfo: any) => {
	// 	console.log('Failed:', errorInfo);
	// };


return(
	<>
		<h4 className='content-title'>User Information</h4>
		<Form
			form={form}
			name="user"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 24 }}
			style={{ maxWidth: 600, margin: "auto" }}
			layout="vertical"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			// onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="First Name"
				name="firstName"
				rules={[{ required: true, message: 'Please input first name' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Second Name"
				name="secondName"
				rules={[{ required: true, message: 'Please input your second name' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Phone number"
				name="phone"
				rules={[{ required: true, message: "Please input your phone number" }]}
			>
				<Input />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	</>
)
};

