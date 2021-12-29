import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const WelcomeScreen = () => {
	return (
		<div className='d-flex'>
			<h1 className='text-center my-5'>
				BIENVENIDO A LA APP DE PEQUEÑOS Y MEDIANOS GIMNASIOS!
			</h1>
		</div>
	);
};
