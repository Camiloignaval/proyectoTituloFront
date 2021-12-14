import { types } from "../types/types";

const initialState = {
	solicitudes: [],
};

export const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.viewRequest:
			return {
				...state,
				solicitudes: action.payload,
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
					(sol) => sol.rut !== action.payload.rut,
				),
			};
		}
		default:
			return state;
	}
};
