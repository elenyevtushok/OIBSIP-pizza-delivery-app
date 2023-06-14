import React, { useState } from 'react';
import { Form, RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';

const PaymentMethodForm: React.FC = () => {
	const [form] = Form.useForm();
	const [paymentMethod, setPaymentMethod] = useState('cash');

	const onChangePaymentMethod = (e: RadioChangeEvent) => {
		console.log(e.target.value)
		setPaymentMethod(e.target.value);
	};

	return (
		<div className='checkout-payment-method-form'>
			<h4 className='content-title'>Choose payment method</h4>
		<Form
		
				form={form}
				name="paymentMethod"
				// onFinish={onFinish}
				>
			<Radio.Group onChange={onChangePaymentMethod}>
				<Space direction="vertical">
					<Radio value="cash">Cash</Radio>
					<Radio value="creditCardOnline">Credit card online</Radio>
					<Radio value="creditCardCourier">Credit card to courier</Radio>
				</Space>
			</Radio.Group>
		</Form>
		</div>
	);
};

export default PaymentMethodForm;