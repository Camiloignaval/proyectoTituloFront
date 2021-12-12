import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardAdmin } from "../components/admin/DashboardAdmin";
import { Solicitudes } from "../components/admin/Solicitudes";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { WelcomeScreen } from "../components/WelcomeScreen";

export const AppRouter = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<WelcomeScreen />} />
					<Route path='/login' element={<LoginScreen />} />
					<Route path='/register' element={<RegisterScreen />} />
					<Route path='/admin' element={<DashboardAdmin />}>
						<Route path='solicitudes' element={<Solicitudes />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};
