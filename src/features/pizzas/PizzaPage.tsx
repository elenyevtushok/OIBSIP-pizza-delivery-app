import { useQuery } from '@tanstack/react-query';
import { getOnePizzaApi } from '../../api/pizzas-api';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Pizza } from './dto/Pizza';
import { Col, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { addOrderItemApi, createOrderApi } from '../../api/order-api';
import { selectCurrentOrder, setOrder } from '../order/orderSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


export const PizzaPage = () => {

	const [sizeOption, setSizeOption] = useState('standard');

	const onChangeSize = ({ target: { value } }: RadioChangeEvent) => {
		setSizeOption(value);
	};

	const { id } = useParams();
	const dispatch = useAppDispatch();

	const [currentPizza, setCurrentPizza] = useState<Pizza | null>(null);
	useQuery(['one-pizza', id], () => getOnePizzaApi(id!), {
		onSuccess: ((pizza) => {
			setCurrentPizza(pizza);
		})
	});

	const getCurrentPizzaPrice = () => {
		return currentPizza?.sizes.find(size => size.size == sizeOption)?.price;
	};
	const getCurrentPizzaWeight = () => {
		return currentPizza?.sizes.find(size => size.size == sizeOption)?.weight;
	};

	const currentOrder = useAppSelector(selectCurrentOrder);

	const addToCartHandler = async () => {

		if (currentOrder) {
			// Order already exists
			console.log('Order already exists:');
			const updatedOrder = await addOrderItemApi(currentOrder._id, currentPizza!._id, sizeOption);

			dispatch(setOrder(updatedOrder));
			console.log(`order id is ${updatedOrder._id}`)
		} else {
			// Order doesn't exist, create a new one
			console.log('Create a new order');
			const order = await createOrderApi(currentPizza!._id, sizeOption);
			dispatch(setOrder(order));
			console.log(`order id is ${order._id}`)
		}
	};

	return (
			<main>
				<div className='content-title'>
				<h1 data-test={`pizza-page-header-${currentPizza?.name.replace(/ /g, "-") }`}>{`Try amazing ${currentPizza?.name} pizza`}</h1>
				</div>
				<Row>
					<Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<img src={currentPizza?.imageUrls[0]} alt={currentPizza?.name} height={300} />
					</Col>
					<Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<div className='pizza-page-details'>
							<div className="pizza-card-description">{currentPizza?.description}</div>
							<div className='pizza-card-ingredients'>
								<p className='pizza-card-ingredients-header'> Ingredients:</p>
								<ul >
									{currentPizza?.ingredients?.map(ingredient => {
										return <li key={ingredient}>{ingredient}</li>
									})}
								</ul>
							</div>
							<div>
								<h4 className='content-title'>Choose the size</h4>
								<div className='radio-button-group'>
									<Radio.Group onChange={onChangeSize} optionType="button" className='radio-button-group'>
										<Radio.Button className='radio-button' value="standard">Standard</Radio.Button>
										<Radio.Button className='radio-button' value="large">Large</Radio.Button>
										<Radio.Button className='radio-button' value="extralarge">Extralarge</Radio.Button>
									</Radio.Group>
								</div>
								<p className='pizza-weight'>Approximate weight: {getCurrentPizzaWeight()}g</p>
								<h4 className='content-title'>Price: €{getCurrentPizzaPrice()}</h4>
							</div>
						<button onClick={() => addToCartHandler()} className="add-to-card-button" data-test= "add-to-cart-button">Add to cart
							</button>
						</div>
					</Col>
				</Row>
			</main>
	)
}