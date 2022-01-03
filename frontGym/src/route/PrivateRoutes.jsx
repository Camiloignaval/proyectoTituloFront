import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRouteUser = ({ auth, children, cargo }) => {
	return auth && cargo === 3 ? children : <Navigate to='/' />;
};

export const PrivateRouteAdmin = ({ auth, children, cargo }) => {
	return auth && cargo === 1 ? children : <Navigate to='/' />;
};

export const PrivateRoutePersonal = ({ auth, children, cargo }) => {
	return auth && cargo === 2 ? children : <Navigate to='/' />;
};
