import React from 'react';
import { Button, Form, Input } from 'antd';
import { createAddress } from '../features/address/addressSlice';
import { Address } from '../features/address/dto/Address';
import { useAppDispatch } from '../app/hooks';


export const AddressForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const[form] = Form.useForm();

	const onFinish = (values: Address) => {
		console.log('Success:', values);
		dispatch(createAddress(values));
	};

	// const onFinishFailed = (errorInfo: any) => {
	// 	console.log('Failed:', errorInfo);
	// };


return(
	<>
		<h4 className='content-title'>Delivery address</h4>
		<Form
		className='checkout-form address-form'
			form={form}
			name="address"
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
				label="City"
				name="city"
				rules={[{ required: true, message: 'Please input your city' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Street"
				name="street"
				rules={[{ required: true, message: 'Please input your street!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="House"
				name="houseNumber"
				rules={[{ required: true, message: 'Please input your house number!' }]}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				label="Apartment"
				name="apartment"
				rules={[{ required: false }]}
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

