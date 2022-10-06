import clienteAxios from "../config/axios";
import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_ERROR,
	DESCARGA_PRODUCTOS_EXITO,
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
			console.log(data);
			dispatch(descargarProductosExitosa(data));
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
	type: AGREGAR_PRODUCTO_EXITO,
	payload: productos,
});
const descargarProductosError = (error) => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: error,
});
