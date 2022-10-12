import clienteAxios from "../config/axios";
import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_ERROR,
	DESCARGA_PRODUCTOS_EXITO,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_ELIMINADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	PRODUCTO_EDITADO_ERROR,
	PRODUCTO_EDITADO_EXITO,
	OBTENER_PRODUCTO_EDITAR,
	COMENZAR_EDICION_PRODUCTO,
} from "../types";
import Swal from "sweetalert2";

//CREAR NUEVOS PRODUCTOS

export const crearNuevoProductoAction = (producto) => {
	return async (dispatch) => {
		dispatch(agregarProducto());
		try {
			await clienteAxios.post("/productos", producto);
			dispatch(agregarProductoExito(producto));
			Swal.fire(
				"Correcto",
				"El producto se agregó correctamente",
				"success",
			);
		} catch (error) {
			dispatch(agregarProductoError(true));
			Swal.fire({
				icon: "error",
				title: "Hubo un error",
				text: "Hubo un error, intenta de nuevo",
			});
		}
	};
};
const agregarProducto = () => ({
	type: AGREGAR_PRODUCTO,
	payload: true,
});
const agregarProductoExito = (producto) => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto,
});
const agregarProductoError = (error) => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: error,
});

//OBTENER TODOS LOS PRODUCTOS

export const obtenerProductosAction = () => {
	return async (dispatch) => {
		dispatch(descargarProductos());
		try {
			const { data } = await clienteAxios("/productos");
			dispatch(descargarProductosExitosa(data));
			console.log(data);
		} catch (error) {
			dispatch(descargarProductosError(true));
		}
	};
};
const descargarProductos = () => ({
	type: COMENZAR_DESCARGA_PRODUCTOS,
	payload: true,
});
const descargarProductosExitosa = (productos) => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload: productos,
});
const descargarProductosError = (error) => ({
	type: DESCARGA_PRODUCTOS_ERROR,
	payload: error,
});

//Eliminar un producto
export const eliminarProductoAction = (id) => {
	return async (dispatch) => {
		dispatch(obtenerProductoEliminar(id));
		try {
			await clienteAxios.delete(`productos/${id}`);
			dispatch(eliminarProductoExitoso());
			Swal.fire(
				"ELiminado!",
				"El producto se eliminó correctamente",
				"success",
			);
		} catch (error) {
			dispatch(eliminarProductoError(true));
		}
	};
};
const obtenerProductoEliminar = (id) => ({
	type: OBTENER_PRODUCTO_ELIMINAR,
	payload: id,
});
const eliminarProductoExitoso = () => ({
	type: PRODUCTO_ELIMINADO_EXITO,
});
const eliminarProductoError = (error) => ({
	type: PRODUCTO_ELIMINADO_ERROR,
	payload: error,
});

//COLOCAR PRODUCTO EN EDICION

export function obtenerProductoEditar(producto) {
	return (dispatch) => {
		dispatch(obtenerProductoEditarAction(producto));
	};
}

const obtenerProductoEditarAction = (producto) => ({
	type: OBTENER_PRODUCTO_EDITAR,
	payload: producto,
});

export function editarProductoAction(producto) {
	return async (dispatch) => {
		dispatch(editarProducto());
		try {
			await clienteAxios.put(`productos/${producto.id}`, producto);
			dispatch(editarProductoExito(producto));
		} catch (error) {
			dispatch(editarProductoError(true));
		}
	};
}
const editarProducto = () => ({
	type: COMENZAR_EDICION_PRODUCTO,
});
const editarProductoExito = (producto) => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload: producto,
});
const editarProductoError = (error) => ({
	type: PRODUCTO_EDITADO_ERROR,
	payload: error,
});
