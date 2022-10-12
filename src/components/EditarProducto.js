import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editarProductoAction } from "../action/productosAction";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [producto, setProducto] = useState({
		nombre: "",
		precio: "",
	});
	const productoEditar = useSelector(
		(state) => state.productos.productoEditar,
	);
	useEffect(() => {
		if (productoEditar) {
			setProducto(productoEditar);
		}
	}, [productoEditar]);
	const onChangeFormulario = (e) => {
		setProducto({ ...producto, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(editarProductoAction(producto));
		navigate("/");
	};
	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Editar Producto
						</h2>
						<form onSubmit={(e) => handleSubmit(e)}>
							<div className="form-group">
								<label>Nombre del Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="nombre"
									value={producto.nombre}
									onChange={onChangeFormulario}
								/>
							</div>
							<div className="form-group">
								<label>Precio del Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="precio"
									value={producto.precio}
									onChange={onChangeFormulario}
								/>
							</div>
							<button className="btn btn-primary font-weight-bold text-uppercase d-blok w-100 mt-3">
								Guardar Cambios
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditarProducto;
