import { types } from "../types/types";

const initialState = { registro: false, info: {
	id_usuario:93,
nombre:null,
apellido:null,
fecha_nacimiento:null,
email:null,
rut:null,
id_cargo:null,
}, active: false };

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.sendRequest:
			return {
				...state,
				registro: true,
			};
		case types.resetRegister:
			return {
				...state,
				registro: false,
			};
		case types.login: {
			return {
				...state,
				info: action.payload,
				active: true,
			};
		}

		default:
			return state;
	}
};
