import React, { useState } from "react";
import { crearNuevoProductoAction } from "../action/productosAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mostrarAlerta, ocultarAlerta } from "../action/alertaAction";

const NuevoProducto = () => {
	const navigate = useNavigate();
	const [nombre, setNombre] = useState("");
	const [precio, setPrecio] = useState("");
	const dispatch = useDispatch();
	const agregarProducto = (producto) => {
		dispatch(crearNuevoProductoAction(producto));
	};
	const cargando = useSelector((state) => state.productos.loading);
	const error = useSelector((state) => state.productos.error);
	const alerta = useSelector((state) => state.alerta.alerta);
	const submitNuevoProducto = (e) => {
		e.preventDefault();
		if (nombre.trim() === "" || precio <= 0) {
			const alerta = {
				msg: "Ambos capos son obligatorios",
				classes: "alert alert-danger text-center text-uppercase p-3",
			};
			console.log("error");
			dispatch(mostrarAlerta(alerta));
			return;
		}
		agregarProducto({ nombre, precio });
		dispatch(ocultarAlerta());
		//Redireccionar
		navigate("/");
	};
	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Agregar Nuevo Producto
						</h2>
						{alerta && (
							<p className={alerta.classes}>{alerta.msg}</p>
						)}
						<form onSubmit={submitNuevoProducto}>
							<div className="form-group">
								<label>Nombre del Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="nombre"
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label>Precio del Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="precio"
									value={precio}
									onChange={(e) =>
										setPrecio(Number(e.target.value))
									}
								/>
							</div>
							<button className="btn btn-primary font-weight-bold text-uppercase d-blok w-100 mt-3">
								Agregar
							</button>
						</form>
						{cargando ? <p>Cargando...</p> : null}
						{error ? (
							<p className="alert alert-danger p-2 mt-4 text-center">
								Hubo un error
							</p>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NuevoProducto;
