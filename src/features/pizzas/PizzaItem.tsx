import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Pizza } from './dto/Pizza'
import { useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';


export const PizzaItem = ({ pizza }: { pizza: Pizza }) => {

	return (
		<div className="pizza-card" data-testid='course-card'>
			<div className="pizza-card-top">
				<img className="pizza-card-image" src={pizza.imageUrls[0]} alt={pizza.name} />
					<h3 className="pizza-card-title">{pizza.name}</h3>
				<p className="pizza-card-description">{pizza.description}</p>
				<div className='pizza-card-ingredients'>
					<p className='pizza-card-ingredients-header'> Ingredients:</p>
					<ul >
						{pizza.ingredients?.map(ingredient => {
							return <li key={ingredient}>{ingredient}</li>
						})}
					</ul>
				</div>
			</div>
			<Link to={`pizza/${pizza._id}`} className="button">I want it
			</Link>
		</div>
		// <div className="post-in">
		// 	<h4 data-testid={`post-title-${pizza._id}`}>{pizza.name}</h4>
		// 	<div className="content-seperator"></div>
		// 	<p>{pizza.description}</p>
		// 	<div>
		// 		<button className="delete-post-button" data-testid={`post-delete-button-${pizza._id}`}>
		// 			<ShoppingCartOutlined />
		// 		</button>

		// 		<Link to={`pizza/${pizza._id}`}><button className="edit-post-button"><EditOutlined /></button>
		// 		</Link>



		// 	</div>
		// </div>
	)
}