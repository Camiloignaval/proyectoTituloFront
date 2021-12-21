import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { startViewClients, startViewPending } from "../../actions/admin";
import { SideBarAdmin } from "../ui/SideBar";

export const DashboardAdmin = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const { info } = useSelector((state) => state.user);

	useEffect(() => {
		if (info !== null) {
			if (info.id_cargo === 3) {
				navigate("/user");
			} else if (info.id_cargo === 1) {
				navigate("/admin");
			}
		}
	}, [info]);
	// apenas abra el dashboard cargar solicitudes en state
	useEffect(() => {
		dispatch(startViewPending());
		dispatch(startViewClients());
	}, []);

	// listaParaSidebar
	const itemsSidebar = [
		{ nombre: "Perfil", to: "", icon: "fas fa-address-card" },
		{ nombre: "Clientes", to: "clientes", icon: "fas fa-users" },
		{ nombre: "Solicitudes", to: "solicitudes", icon: "fas fa-bell" },
	];

	return (
		<div>
			<SideBarAdmin items={itemsSidebar} />
			<Outlet />
		</div>
	);
};
