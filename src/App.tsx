import './App.css'

import { Footer } from './pages/Footer'
import { MainContent } from './pages/MainContent'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom"
import { PizzaPage } from './features/pizzas/PizzaPage'
import { Pizzas } from './features/pizzas/Pizzas'
import { PizzaCustom } from './features/pizzas/PizzaCustom'
import Navbar from './pages/Navbar'

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<Router>
				<Provider store={store}>
					<Navbar />
					<QueryClientProvider client={queryClient}>
						<Routes>
							<Route path="/" element={<MainContent />} />
							<Route path="/pizzas" element={<Pizzas />} />
							<Route path="/pizza/:id" element={<PizzaPage />} />
							<Route path="/pizza/custom" element={<PizzaCustom />} />
						</Routes>
					</QueryClientProvider>
					<Footer />
				</Provider>
			</Router>
		</>
	)
}

export default App