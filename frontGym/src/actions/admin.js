import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../hooks/fetch";
import { types } from "../types/types";

export const startViewPending = () => {
	return async (dispatch) => {
		const resp = await fetchConToken(
			"http://localhost:4000/api/admin/requests",
		);
		const data = await resp.json();
		dispatch(viewPending(data.datos));
	};
};

const viewPending = (datos) => ({
	type: types.viewRequest,
	payload: datos,
});

export const startAccept = (datos) => {
	return async (dispatch) => {
		const resp = await fetchConToken(
			"http://localhost:4000/api/admin/user",
			datos,
			"POST",
		);
		const body = await resp.json();
		if (body.ok) {
			dispatch(aceptUser(datos));
			await Swal.fire("Listo!", body.msg, "success");
		} else {
			Swal.fire("Error!", body.msg, "error");
		}
	};
};

const aceptUser = (datos) => ({
	type: types.aceptUser,
	payload: datos,
});

export const startReject = (id_solicitud) => {
	return async (dispatch) => {
		const resp = await fetchConToken(
			"http://localhost:4000/api/admin/requests",
			{ id_solicitud },
			"DELETE",
		);
		const body = await resp.json();
		if (body.ok) {
			dispatch(deleteRequests(id_solicitud));
			await Swal.fire("Listo!", body.msg, "success");
		} else {
			Swal.fire("Error!", body.msg, "error");
		}
	};
};

const deleteRequests = (id) => ({
	type: types.rejectUser,
	payload: id,
});

export const startViewClients = () => {
	return async (dispatch) => {
		const resp = await fetchConToken("http://localhost:4000/api/admin/user");
		const data = await resp.json();
		dispatch(viewClients(data.datos));
	};
};

const viewClients = (clients) => ({
	type: types.viewClients,
	payload: clients,
});

export const startToggleBlock = (datos) => {
	return async (dispatch) => {
		const resp = await fetchConToken(
			"http://localhost:4000/api/admin/block",
			datos,
			"PUT",
		);
		const body = await resp.json();
		if (body.ok) {
			if (datos.bloquear) {
				dispatch(blockUser(datos));
			} else {
				dispatch(unblockUser(datos));
			}
		} else {
			Swal.fire("Error!", body.msg, "error");
		}
	};
};

const blockUser = (datos) => ({
	type: types.blockUser,
	payload: datos,
});

const unblockUser = (datos) => ({
	type: types.unblockUser,
	payload: datos,
});
