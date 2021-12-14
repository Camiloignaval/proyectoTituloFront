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
		default:
			return state;
	}
};
