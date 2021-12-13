import Swal from "sweetalert2";
import { types } from "../types/types";
import { eventLogout } from "./events";


export const viewRequest=() => {
  
}

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
