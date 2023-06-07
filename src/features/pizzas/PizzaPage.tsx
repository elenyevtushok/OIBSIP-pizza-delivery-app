import { useQuery } from '@tanstack/react-query';
import { getOnePizzaApi } from '../../api/pizzas-api';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Pizza } from './dto/Pizza';
import { Col, Row } from 'antd';
import { addOrderItemApi, createOrderApi } from '../../api/order-api';
import { loadCurrentOrder, selectCurrentOrder, selectOrder, setOrder } from '../order/orderSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


export const PizzaPage = () => {

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const [currentPizza, setCurrentPizza] = useState<Pizza | null>(null);
	const { data: pizza } = useQuery(['one-pizza', id], () => getOnePizzaApi(id!), {
		onSuccess: ((pizza) => {
			setCurrentPizza(pizza);
			console.log(pizza)
		})
	});

	const currentOrder = useAppSelector(selectCurrentOrder);

	const addToCartHandler = async () => {

		if (currentOrder) {
			// Order already exists
			console.log('Order already exists:');
			const updatedOrder = await addOrderItemApi(currentOrder._id, currentPizza!._id, 'large');

			dispatch(setOrder(updatedOrder));
			dispatch(loadCurrentOrder());
			console.log(`order id is ${updatedOrder._id}`)
		} else {
			// Order doesn't exist, create a new one
				const order = await createOrderApi(currentPizza!._id, 'standard');
				dispatch(setOrder(order));
				dispatch(loadCurrentOrder());
				console.log(`order id is ${order._id}`)
		}
	};

	return (
		<>
			<main>
				<div className='content-title'>
					<h1>{`Try amazing ${pizza?.name} pizza`}</h1>
				</div>
				<Row>
					<Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<img src={pizza?.imageUrls[0]} alt={pizza?.name} height={300} />
					</Col>
					<Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<div className='pizza-page-details'>
							<div className="pizza-card-description">{currentPizza?.description}</div>
							<div className='pizza-card-ingredients'>
								<p className='pizza-card-ingredients-header'> Ingredients:</p>
								<ul >
									{pizza?.ingredients?.map(ingredient => {
										return <li key={ingredient}>{ingredient}</li>
									})}
								</ul>
							</div>
							<div>
								<h4 className='content-title'>Size</h4>
								<h4 className='content-title'>Crust</h4>
								<h4 className='content-title'>Additionals</h4>
							</div>
							<button onClick={() => addToCartHandler()} className="add-to-card-button">Add to cart
							</button>
						</div>
					</Col>
				</Row>
			</main>
		</>
	)
}