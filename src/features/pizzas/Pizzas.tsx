import { Row, Col } from 'antd';
import { PizzaItem } from './PizzaItem';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectHasMorePages, loadMorePizzas, selectPizza } from './pizzasSlice';
import { store } from '../../app/store';
import { useEffect, useState } from 'react';

const FIRST_PAGE = 1;


store.dispatch(loadMorePizzas(FIRST_PAGE))

export const Pizzas = () => {
	const [page, setPage] = useState(FIRST_PAGE);
	const pizzas = useAppSelector(selectPizza);
	const dispatch = useAppDispatch();
	const hasMorePages = useAppSelector(selectHasMorePages)

	console.log(page)
	console.log(pizzas)


	const handleLoadMore = () => {
		setPage(prevPage => prevPage + 1)
		dispatch(loadMorePizzas(page + 1))
	}


	return (
		<main>
			<div className='content-title'>
				<h1>Try our exclusive pizzas</h1>
				<p>Swipe to chose and order</p>
			</div>
			{
				(pizzas?.length > 0) &&
				(
					<>
						<Row gutter={[24, 24]}>{pizzas?.map(pizza => {
							return (
								<Col key={pizza._id} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }} >
									<PizzaItem key={pizza._id} pizza={pizza} />
								</Col>
							)
						})}
						</Row>
						{hasMorePages &&
							<button className="load-more-button" data-testid="load-more-button" onClick={() => handleLoadMore()}>Show me more</button>}
					</>
				)
			}
		</main>
	)
}
