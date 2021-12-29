import React from "react";
import { Outlet } from "react-router";
import { Nav } from "../ui/Nav";

export const DashboardAuth = () => {
	return (
		<>
			<Nav />
			<Outlet />
		</>
	);
};
