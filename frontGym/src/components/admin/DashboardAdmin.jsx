import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { startViewClients, startViewPending } from "../../actions/admin";
import { SideBarAdmin } from "./SideBarAdmin";

export const DashboardAdmin = () => {
	const dispatch = useDispatch();
	// apenas abra el dashboard cargasd solicitudes en state
	useEffect(() => {
		dispatch(startViewPending());
		dispatch(startViewClients());
	}, []);

	return (
		<div>
			<SideBarAdmin />
			<Outlet />
		</div>
	);
};
