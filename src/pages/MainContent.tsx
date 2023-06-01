import { Pizzas } from "../features/pizzas/Pizzas"
import { HeaderHero } from "./HeaderHero"

export const MainContent = () => {

	return (
		<>
			<HeaderHero />
			<main>
				<Pizzas />
			</main>
		</>
	)
}
