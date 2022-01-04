import { types } from "../types/types";

const initialState = {
	clientes: [],
	solicitudes: [],
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
		case types.aceptRequest: {
			return {
				...state,
				clientes: [
					...state.clientes,
					state.solicitudes.find((sol) => sol.id_usuario === action.payload),
				],
				solicitudes: state.solicitudes.filter(
					(sol) => sol.id_usuario !== action.payload,
				),
			};
		}
		case types.rejectRequest: {
			return {
				...state,
				solicitudes: state.solicitudes.filter(
					(sol) => sol.id_usuario !== action.payload,
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
