import { types } from "../types/types";

const initialState = { registro: false, info: null };

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
			};
		}

		default:
			return state;
	}
};
