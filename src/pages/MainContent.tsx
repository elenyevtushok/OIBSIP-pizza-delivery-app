import { Pizzas } from "../features/pizzas/Pizzas"
import SiteHeader from "./SiteHeader"
import { HeaderHero } from "./HeaderHero"

export const MainContent = () => {

	return (
		<>
		<SiteHeader/>
		<HeaderHero />
		<main>
			<div className='content-title'>
				<h1>Try our exclusive pizzas</h1>
				<p>Swipe to chose and order</p>
			</div>
			<Pizzas />
		</main>
		</>
	)
}
