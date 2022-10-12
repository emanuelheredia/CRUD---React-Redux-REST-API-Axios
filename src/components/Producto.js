import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	eliminarProductoAction,
	obtenerProductoEditar,
} from "../action/productosAction";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { nombre, precio, id } = producto;

	const handleEliminarProducto = (id) => {
		Swal.fire({
			title: "¿Estas seguro?",
			text: "Un producto que se elimina no se puede recuperar",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!!",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(eliminarProductoAction(id));
			}
		});
	};
	const redireccionarEdicion = (producto) => {
		dispatch(obtenerProductoEditar(producto));
		navigate(`producto/editar/${producto.id}`);
	};
	return (
		<tr>
			<td>{nombre}</td>
			<td>
				<span className="font-weight-bold">$ {precio}</span>
			</td>
			<td className="acciones">
				<button
					className="btn btn-primary mr-2"
					onClick={(e) => redireccionarEdicion(producto)}
				>
					Editar
				</button>
				<button
					className="btn btn-danger"
					type="button"
					onClick={(e) => handleEliminarProducto(id)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Producto;
