import React, { useState } from 'react'
import { AddressForm } from '../forms/AddressForm'
import { Button, Col, Form, Input, Radio, Row, Space } from 'antd'
import { UserForm } from '../forms/UserForm'
import PaymentMethodForm from '../forms/PaymentMethodForm'
import { selectCurrentOrder, updateOrder } from '../features/order/orderSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Link } from 'react-router-dom'
import { createAddress } from '../features/address/addressSlice'
import { Address, CreateAddressDTO } from '../features/address/dto/Address'
import { CreateUserDTO, User } from '../features/user/dto/User'
import { createUser, selectUser } from '../features/user/userSlice'
import { UpdateOrder } from '../features/order/dto/Order'
import { getOnePizzaApi } from '../api/pizzas-api'
import { createUserApi } from '../api/user-api'
import { useQuery } from '@tanstack/react-query';


interface CheckoutForm extends CreateAddressDTO, CreateUserDTO {
	paymentMethod: string;
}

export const Checkout = () => {
	const currentOrder = useAppSelector(selectCurrentOrder);
	const dispatch = useAppDispatch();
	const [checkoutForm] = Form.useForm();
	// const [currentUser, setCurrentUser] = useState<User | null>(null);
	

	const onFinishCheckoutForm = (formValues: CheckoutForm) => {
		console.log('Success:', formValues);
		const createAddressDto: CreateAddressDTO = {
			city: formValues.city,
			street: formValues.street,
			houseNumber: formValues.houseNumber,
			apartment: formValues.apartment
		};

		dispatch(createAddress(createAddressDto));

		const createUserDTO: CreateUserDTO = {
			firstName: formValues.firstName,
			secondName: formValues.secondName,
			email: formValues.email,
			phone: formValues.phone
		};
		dispatch(createUser(createUserDTO));

		// const user = useAppSelector(selectUser);

		// const updatedOrder: UpdateOrder = {
		// 	userId: user.user?._id,
		// };


	};
	return (
		<div className='checkout-page'>
			<h2 className='checkout-header'>Checkout Order</h2>
			
				<Form
					className='checkout-form address-form'
					form={checkoutForm}
					name="address"
					labelCol={{ span: 12 }}
					wrapperCol={{ span: 24 }}
					// style={{ maxWidth: 600, margin: "auto" }}
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={onFinishCheckoutForm}
					autoComplete="off"
				>
				<Row gutter={[16, 24]}>
					<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						{/* <AddressForm /> */}
						<h4 className='content-title'>Delivery address</h4>

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
							{/* <Button type="primary" htmlType="submit">
								Submit
							</Button> */}
						</Form.Item>

					</Col>
					<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<h4 className='content-title'>User Information</h4>
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
					</Col>
					<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<div className='checkout-payment-method-form'>
							<h4 className='content-title'>Choose payment method</h4>
							<Radio.Group defaultValue={"cash"}>
								<Space direction="vertical">
									<Radio value="cash">Cash to courier</Radio>
									<Radio value="creditCardCourier">Credit card to courier</Radio>
								</Space>
							</Radio.Group>
						</div>
					</Col>
					<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<div>
							<h4 className='content-title'>
								<span>Total price:</span>&nbsp;<span>€{currentOrder?.totalPrice}</span>
							</h4>
							{/* <Link to={'/finishorder'}> */}
							<button type="submit" className="add-to-card-button checkout-button" onClick={() => {
								onFinishCheckoutForm;
							}}>Finish the order</button>
							{/* </Link> */}

						</div>
					</Col>
				</Row>
				</Form>
			
		</div>
	)
}
