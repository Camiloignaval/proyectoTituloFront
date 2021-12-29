import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import { startCheking } from "../actions/auth";
import { DashboardCliente } from "../components/cliente/DashboardCliente";
import { AdminRoutes } from "./AdminRoutes";
import { PrivateRouteUser, PrivateRouteAdmin } from "./PrivateRoutes";
import { PublicRoute } from "./PublicRoute";
import { WelcomeRoutes } from "./WelcomeRoutes";
import { SpinnerDotted } from "spinners-react";
import { UserRoutes } from "./UserRoutes";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const {
		checking,
		active,
		info: { id_cargo },
	} = useSelector((state) => state.user);
	useEffect(() => {
		dispatch(startCheking());
	}, [checking, dispatch]);

	if (checking) {
		setTimeout(() => {
			<SpinnerDotted
				size={64}
				thickness={180}
				speed={97}
				color='rgba(170, 172, 57, 1)'
			/>;
		}, 5000);
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/*'
						element={
							<PublicRoute auth={active} cargo={id_cargo}>
								<WelcomeRoutes />
							</PublicRoute>
						}
					/>
					<Route
						path='/user/*'
						element={
							<PrivateRouteUser auth={active} cargo={id_cargo}>
								<UserRoutes />
							</PrivateRouteUser>
						}
					/>
					<Route
						path='/admin/*'
						element={
							<PrivateRouteAdmin auth={active} cargo={id_cargo}>
								<AdminRoutes />
							</PrivateRouteAdmin>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};
