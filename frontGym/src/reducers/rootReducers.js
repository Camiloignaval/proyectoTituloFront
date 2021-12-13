import { combineReducers } from "redux";
import { adminReducer } from "./authReducer";

export const rootReducer = combineReducers({
	admin: adminReducer,
});
