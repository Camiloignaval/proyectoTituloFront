import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { startCheking } from "../actions/auth";
import { Clientes } from "../components/admin/Clientes";
import { DashboardAdmin } from "../components/admin/DashboardAdmin";
import { Solicitudes } from "../components/admin/Solicitudes";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { WelcomeScreen } from "../components/auth/WelcomeScreen";
import { DashboardCliente } from "../components/cliente/DashboardCliente";
import { DashboardAuth } from "../components/DashboardAuth";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const {
		active,
		info: { id_cargo },
	} = useSelector((state) => state.user);
	useEffect(() => {
		dispatch(startCheking());
		if (active) {
			if (id_cargo == 1) {
				console.log("admin encontrado");
			} else if (id_cargo == 3) {
				console.log("cliente encontrado");
			}
		}
	}, [active, dispatch]);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<DashboardAuth />}>
						<Route path='' element={<WelcomeScreen />} />
						<Route path='login' element={<LoginScreen />} />
						<Route path='register' element={<RegisterScreen />} />
					</Route>

					<Route path='/user' element={<DashboardCliente />} />

					<Route path='/admin' element={<DashboardAdmin />}>
						<Route path='solicitudes' element={<Solicitudes />} />
						<Route path='clientes' element={<Clientes />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};
