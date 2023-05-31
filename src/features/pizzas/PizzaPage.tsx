import { useQuery } from '@tanstack/react-query';
import { getOnePizzaApi } from '../../api/pizzas-api';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Pizza } from './dto/Pizza';
import { ArrowLeftOutlined } from '@ant-design/icons';


export const PizzaPage = () => {

	const { id } = useParams();

	const [currentPizza, setCurrentPizza] = useState<Pizza | null>(null);
	const { data: pizza } = useQuery(['one-pizza', id], () => getOnePizzaApi(id!), {
		onSuccess: ((pizza) => {
			setCurrentPizza(pizza);
			console.log(pizza)
		})
	});

	return (
		<>
			<header className='header-post-details'>
				<Link className='header-post-details-link' to={'/'}><ArrowLeftOutlined /> All pizzas</Link>
			</header>
			<main>
				<div className='content-title'>
					<div className="content-seperator"></div>
					<h1>Pizza Details</h1>
					<div className="content-seperator"></div>
				</div>
				<div className="post">
					<div className="post-in">
						<h4 data-testid={`post-title-${pizza?._id}`}>{pizza?.name}</h4>
						<div className="content-seperator"></div>
						<p>{currentPizza?.description}</p>
					</div>
					<div className='content-title'>
						<div className="content-seperator"></div>
						<h1>Comments</h1>
						<div className="content-seperator"></div>
					</div>
				</div>
			</main>
		</>
	)
}


