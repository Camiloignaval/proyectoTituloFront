import React from "react";
import { Outlet } from "react-router";
import { SideBar } from "./SideBar";

export const DashboardAdmin = () => {
	const hola = "chao";
	return (
		<div>
			<SideBar />
			<Outlet />
		</div>
	);
};
