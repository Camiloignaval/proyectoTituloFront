import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardAdmin } from "../components/admin/DashboardAdmin";
import { TablaInfo } from "../components/admin/TablaInfo";
import { Profile } from "../components/ui/Profile";

export const AdminRoutes = () => {
	return (
		<Routes>
			<Route path='' element={<DashboardAdmin />}>
				<Route path='perfil' element={<Profile />} />
				<Route
					path='/solicitudes'
					element={<TablaInfo necesarios='solicitudes' />}
				/>
				<Route path='clientes' element={<TablaInfo necesarios='clientes' />} />
			</Route>
		</Routes>
	);
};
