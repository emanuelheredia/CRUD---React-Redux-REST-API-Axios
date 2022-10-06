import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Header />
				<div className="container mt-5">
					<Routes>
						<Route path="/" element={<Productos />} />
						<Route
							path="/producto/nuevo"
							element={<NuevoProducto />}
						/>
						<Route
							path="/producto/editar/:id"
							element={<EditarProducto />}
						/>
					</Routes>
				</div>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
