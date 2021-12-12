import React from "react";
import { Outlet } from "react-router";
import { SideBar } from "./SideBar";

export const DashboardAdmin = () => {
	return (
		<div>
			<SideBar />
			<Outlet />
		</div>
	);
};
