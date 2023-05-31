import { Row, Col } from 'antd';
import { PizzaItem } from './PizzaItem';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loadMorePizzas, selectPizza } from './pizzasSlice';
import { store } from '../../app/store';
import { useState } from 'react';

const FIRST_PAGE = 1;

store.dispatch(loadMorePizzas(FIRST_PAGE))

export const Pizzas = () => {
	const [page, setPage] = useState(FIRST_PAGE);
	const pizzas = useAppSelector(selectPizza);
	const dispatch = useAppDispatch();

	const handleLoadMore = () => {
		setPage(prevPage => prevPage + 1)
		dispatch(loadMorePizzas(page + 1))
	}


	return (
		<div>
			{
				(pizzas.length > 0) &&
				(
					<>
						<Row gutter={[24, 24]}>{pizzas?.map(pizza => {
							return (
								<Col key={pizza._id} xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} >
									<PizzaItem key={pizza._id} pizza={pizza} />
								</Col>
							)
						})}
						</Row>
						<button className="load-more-button" data-testid="load-more-button" onClick={() => handleLoadMore()}>Show me more</button>
					</>
				)
			}
		</div>
	)
}
