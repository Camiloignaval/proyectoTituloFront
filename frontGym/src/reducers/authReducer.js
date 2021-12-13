import { types } from "../types/types";

const initialState = {
	cheking: true,
	solicitudes: [],
};

export const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.viewRequest:
			return {
				...state,
				cheking: false,
				solicitudes: action.payload,
			};
		default:
			return state;
	}
};
