import React from "react";
import { Outlet } from "react-router";
import Swal from "sweetalert2";
import { SideBar } from "./SideBar";

export const DashboardAdmin = () => {
	return (
		<div>
			<SideBar />
			<Outlet />
		</div>
	);
};
