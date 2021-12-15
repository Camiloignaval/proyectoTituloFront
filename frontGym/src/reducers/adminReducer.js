import { types } from "../types/types";

const initialState = {
	solicitudes: [],
	clientes: [],
};

export const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.viewRequest:
			return {
				...state,
				solicitudes: action.payload,
			};
		case types.viewClients:
			return {
				...state,
				clientes: action.payload,
			};
		case types.aceptUser: {
			return {
				...state,
				solicitudes: state.solicitudes.filter(
					(sol) => sol.rut !== action.payload.rut,
				),
			};
		}
		case types.rejectUser: {
			return {
				...state,
				solicitudes: state.solicitudes.filter(
					(sol) => sol.id_solicitud !== action.payload,
				),
			};
		}
		case types.blockUser:
			return {
				...state,
				clientes: state.clientes.map((c) => {
					if (c.id_usuario == action.payload.id_usuario) {
						c.bloqueado = true;
						return c;
					}
					return c;
				}),
			};
		case types.unblockUser:
			return {
				...state,
				clientes: state.clientes.map((c) => {
					if (c.id_usuario == action.payload.id_usuario) {
						c.bloqueado = false;
						return c;
					}
					return c;
				}),
			};
		default:
			return state;
	}
};
