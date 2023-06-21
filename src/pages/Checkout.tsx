import { Col, Form, Input, Radio, Row, Space } from 'antd'
import { selectCurrentOrder } from '../features/order/orderSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { createAddress } from '../features/address/addressSlice'
import { CreateAddressDTO } from '../features/address/dto/Address'
import { CreateUserDTO } from '../features/user/dto/User'
import { createUser } from '../features/user/userSlice'
import { useState } from 'react'
import { useEffect } from 'react'
import { completeCheckout } from '../features/order/orderSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


interface CheckoutForm extends CreateAddressDTO, CreateUserDTO {
	paymentMethod: string;
}

export const Checkout = () => {
	const currentOrder = useAppSelector(selectCurrentOrder);
	const dispatch = useAppDispatch();
	const [checkoutForm] = Form.useForm();
	const navigate = useNavigate();

	const [createdUserId, setCreatedUserId] = useState<string | null>(null);
	const [createdAddressId, setCreatedAddressId] = useState<string | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

	const onFinishCheckoutForm = async (formValues: CheckoutForm) => {
		console.log('Success:', formValues);
		const createAddressDto: CreateAddressDTO = {
			city: formValues.city,
			street: formValues.street,
			houseNumber: formValues.houseNumber,
			apartment: formValues.apartment
		};

		const addressAction = await dispatch(createAddress(createAddressDto));
		if (createAddress.fulfilled.match(addressAction)) {
			const addressId = addressAction.payload._id;
			setCreatedAddressId(addressId);
		}

		const createUserDTO: CreateUserDTO = {
			firstName: formValues.firstName,
			secondName: formValues.secondName,
			email: formValues.email,
			phone: formValues.phone,
		};
		const userAction = await dispatch(createUser(createUserDTO));
		if (createUser.fulfilled.match(userAction)) {
			const userId = userAction.payload._id;
			setCreatedUserId(userId);
		}
	};

	useEffect(() => {
		if (createdUserId && createdAddressId && currentOrder) {
			const request = {
				orderId: currentOrder._id,
				body: {
					userId: createdUserId,
					addressId: createdAddressId,
					paymentMethod: paymentMethod
				}
			};
			dispatch(completeCheckout(request));
			navigate('/finishorder')
		}
	}, [createdUserId, createdAddressId, currentOrder, paymentMethod, dispatch, navigate]);


	return (
		<div className='checkout-page'>
			<h2 className='checkout-header'>Checkout Order</h2>

			<Form
				className='checkout-form address-form'
				form={checkoutForm}
				name="address"
				labelCol={{ span: 12 }}
				wrapperCol={{ span: 24 }}
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
							<Radio.Group defaultValue={"cash"} onChange={(e) => setPaymentMethod(e.target.value)}>
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
							
							<button type="submit" className="add-to-card-button checkout-button" onClick={() => onFinishCheckoutForm(checkoutForm.getFieldsValue())}>Finish the order</button>
						</div>
					</Col>
				</Row>
			</Form>

		</div>
	)
}
