import { useQuery } from '@tanstack/react-query';
import { getOnePizzaApi } from '../../api/pizzas-api';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Pizza } from './dto/Pizza';
import { Col, Row } from 'antd';


export const PizzaCustom = () => {

	// const { id } = useParams();

	// const [currentPizza, setCurrentPizza] = useState<Pizza | null>(null);
	// const { data: pizza } = useQuery(['one-pizza', id], () => getOnePizzaApi(id!), {
	// 	onSuccess: ((pizza) => {
	// 		setCurrentPizza(pizza);
	// 		console.log(pizza)
	// 	})
	// });

	return (
		<>
			<main>
				<div className='content-title'>
					<h1>Cannot find your dream pizza?</h1>
					<h3>Not a problem!</h3>
					<p></p>
				</div>
				<Row>
					<Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<img src="https://cdn.loveandlemons.com/wp-content/uploads/2019/06/homemade-pizza.jpg" alt="Custom pizza" height={500} />
					</Col>
					<Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<div className='pizza-page-details'>
							<div className="pizza-card-description">You can make it by yourself. Just choose all the ingredients you want for your pizza and we'll make it! It never was so simple. Feel yourself as a Master Chef!</div>
							<div>
								<h4 className='content-title'>Size</h4>
								<h4 className='content-title'>Crust</h4>
								<h4 className='content-title'>Sauce</h4>
								<h4 className='content-title'>Additionals</h4>
							</div>
							<div>Price: </div>
							<Link to={`/card`} className="add-to-card-button">Add to card
							</Link>
						</div>
					</Col>
				</Row>
			</main>
		</>
	)
}


