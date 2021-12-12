import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { Nav } from "../components/ui/Nav";
import { WelcomeScreen } from "../components/WelcomeScreen";

export const AppRouter = () => {
	return (
		<>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path='/' element={<WelcomeScreen />} />
					<Route path='/login' element={<LoginScreen />} />
					<Route path='/register' element={<RegisterScreen />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};
