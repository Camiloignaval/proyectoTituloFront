import Swal from "sweetalert2";
import { fetchSinToken } from "../hooks/fetch";
import { types } from "../types/types";

export const startViewPending = () => {
	return async (dispatch) => {
		const resp = await fetch("http://localhost:4000/api/admin/requests");
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
		const resp = await fetchSinToken(
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
		const resp = await fetchSinToken(
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
		const resp = await fetch("http://localhost:4000/api/admin/user");
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
		const resp = await fetchSinToken(
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

// export const startLogin = (email, password) => {
//     return async (dispatch) => {
//         const resp = await fetchSinToken('auth', { email, password }, 'POST')
//         const body = await resp.json();

//         if (body.ok) {
//             localStorage.setItem('token', body.token)
//             localStorage.setItem('token-init-date', new Date().getTime())

//             dispatch(login({
//                 uid: body.uid,
//                 name: body.name
//             }))
//         } else {
//             Swal.fire('Error', body.msg, 'error')
//         }
//     }
// }

// export const startRegister = (email, password, name) => {
// 	return async (dispatch) => {
// 		const resp = await fetchSinToken(
// 			"auth/new",
// 			{ email, password, name },
// 			"POST",
// 		);
// 		const body = await resp.json();

// 		if (body.ok) {
// 			localStorage.setItem("token", body.token);
// 			localStorage.setItem("token-init-date", new Date().getTime());

// 			dispatch(
// 				login({
// 					uid: body.uid,
// 					name: body.name,
// 				}),
// 			);
// 		} else {
// 			Swal.fire("Error", body.msg, "error");
// 		}
// 	};
// };

// export const startCheking = () => {
//     return async (dispatch) => {
//         const resp = await fetchConToken('auth/renew')
//         const body = await resp.json();

//         if (body.ok) {
//             localStorage.setItem('token', body.token)
//             localStorage.setItem('token-init-date', new Date().getTime())

//             dispatch(login({
//                 uid: body.uid,
//                 name: body.name
//             }))
//         } else {
//             dispatch(checkingFinish())
//         }
//     }
// }

// export const startLogout = () => {
//     return (dispatch) => {
//         localStorage.clear()
//         dispatch(logout());
//         dispatch(eventLogout())
//     }
// }

// const checkingFinish = () => ({
//     type: types.authChekingFinish
// })

// const login = (user) => ({
//     type: types.authLogin,
//     payload: user
// })

// const logout = () => ({
//     type: types.authLogout,
// })
