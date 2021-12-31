import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardCliente } from "../components/cliente/DashboardCliente";
import { Profile } from "../components/ui/Profile";

export const UserRoutes = () => {
	return (
		<Routes>
			<Route path='' element={<DashboardCliente />}>
				<Route path='perfil' element={<Profile />} />
			</Route>
		</Routes>
	);
};
