import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../hooks/fetch";
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

export const startCheking = () => {
	return async (dispatch) => {
		const resp = await fetchConToken("http://localhost:4000/api/auth/renew/");
		const body = await resp.json();

		if (body.ok) {
			localStorage.setItem("token", body.token);
			// console.log("SI HAY TOKEN");
			// console.log(body.data);
			dispatch(
				// corregir esto
				login(body.data),
			);
		} else {
			// dispatch(checkingFinish());
			// console.log("NO HAY TOKEN");
		}
	};
};

const login = (datos) => ({
	type: types.login,
	payload: datos,
});

export const startLogout = () => {
	return (dispatch) => {
		localStorage.clear();
		dispatch(logout());
	};
};

const logout = () => ({
	type: types.logout,
});
