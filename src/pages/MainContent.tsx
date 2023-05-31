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
				<div className="content-seperator"></div>
				<h1>Try our exclusive pizzas</h1>
				<div className="content-seperator"></div>
				<p>Swipe to chose and order</p>
			</div>
			<Pizzas />
		</main>
		</>
	)
}
