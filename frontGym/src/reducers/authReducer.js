import { types } from "../types/types";

const initialState = { registro: false };

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

		default:
			return state;
	}
};
