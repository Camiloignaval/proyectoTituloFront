import Swal from "sweetalert2";
import { fetchSinToken } from "../hooks/fetch";
import { types } from "../types/types";

export const startRegister = (datos) => {
	return async (dispatch) => {
		const resp = await fetchSinToken(
			"http://localhost:4000/api/auth/register",
			datos,
			"POST",
		);
		const body = await resp.json();
		if (body.ok) {
			dispatch(enviarSolicitud());
			await Swal.fire("Bien!", body.msg, "success");
		} else {
			Swal.fire("Error!", body.msg, "error");
		}
	};
};

export const cambiarRegistroFalse = () => ({
	type: types.resetRegister,
});

const enviarSolicitud = () => ({
	type: types.sendRequest,
});

export const startLogin = (datos) => {
	return async (dispatch) => {
		const resp = await fetchSinToken(
			"http://localhost:4000/api/auth/",
			datos,
			"POST",
		);
		const body = await resp.json();
		if (body.ok) {
			dispatch(login(body.data));
			localStorage.setItem("token", body.token);
			
		} else {
			Swal.fire("Error!", body.msg, "error");
		}
	};
};

const login = (datos) => ({
	type: types.login,
	payload: datos,
});
