import { types } from "../types/types";

const initialState = {
	registro: false,
	info: {
		id_usuario: null,
		nombre: null,
		apellido: null,
		fecha_nacimiento: null,
		email: null,
		rut: null,
		id_cargo: null,
		foto: null,
		telefono: null,
	},
	active: false,
	editMode: false,
};

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
		case types.logout: {
			return initialState;
		}
		case types.editProfileOn: {
			return {
				...state,
				editMode: true,
			};
		}
		case types.uploadImg: {
			return {
				...state,
				foto: action.payload,
			};
		}
		case types.updateProfile: {
			return {
				...state,
				info: {
					...state.info,
					telefono: action.payload.telefono,
					email: action.payload.email,
					foto: action.payload.foto,
				},
				editMode: false,
			};
		}
		case types.cancelUpdate: {
			return {
				...state,
				editMode: false,
			};
		}

		default:
			return state;
	}
};
