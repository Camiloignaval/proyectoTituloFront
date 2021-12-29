import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { startViewClients, startViewPending } from "../../actions/admin";
import { SideBar } from "../ui/SideBar";

export const DashboardAdmin = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startViewPending());
		dispatch(startViewClients());
	}, []);

	// listaParaSidebar
	const itemsSidebar = [
		{ nombre: "Perfil", to: "perfil", icon: "fas fa-address-card" },
		{ nombre: "Clientes", to: "clientes", icon: "fas fa-users" },
		{ nombre: "Solicitudes", to: "solicitudes", icon: "fas fa-bell" },
	];

	return (
		<div>
			<SideBar items={itemsSidebar} />
			<Outlet />
		</div>
	);
};
