import React from 'react'
import { AddressForm } from '../forms/AddressForm'
import { Col, Row } from 'antd'
import { UserForm } from '../forms/UserForm'
import PaymentMethodForm from '../forms/PaymentMethodForm'
import { selectCurrentOrder } from '../features/order/orderSlice'
import { useAppSelector } from '../app/hooks'
import { Link } from 'react-router-dom'

export const Checkout = () => {
	const currentOrder = useAppSelector(selectCurrentOrder);
	return (
		<div className='checkout-page'>
			<h2 className='checkout-header'>Checkout Order</h2>
			<Row gutter={[16, 24]}>
				<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}><AddressForm /></Col>
				<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}><UserForm /></Col>
				<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
					<PaymentMethodForm />
				</Col>
				<Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
					<div>
						<h4 className='content-title'>
							<span>Total price:</span>&nbsp;<span>€{currentOrder?.totalPrice}</span>
						</h4>
						<Link to={'/finishorder'}>
							<button className="add-to-card-button checkout-button">Finish the order</button>
						</Link>
						
					</div>
				</Col>
			</Row>
		</div>
	)
}
