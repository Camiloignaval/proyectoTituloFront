import React from "react";
import { Nav } from "./ui/Nav";

export const WelcomeScreen = () => {
	return (
		<>
			<Nav />
			<div className='d-flex'>
				<h1 className='text-center my-5'>
					BIENVENIDO A LA APP DE PEQUEÑOS Y MEDIANOS GIMNASIOS!
				</h1>
			</div>
		</>
	);
};
