import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types/index";

export function mostrarAlerta(alerta) {
	return (dispatch) => {
		dispatch(crearAlerta(alerta));
	};
}
const crearAlerta = (alerta) => ({
	type: MOSTRAR_ALERTA,
	payload: alerta,
});
export function ocultarAlerta() {
	return (dispatch) => {
		dispatch(borrarAlerta());
	};
}
const borrarAlerta = () => ({
	type: OCULTAR_ALERTA,
});
