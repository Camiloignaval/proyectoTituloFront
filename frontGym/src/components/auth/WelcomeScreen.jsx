import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const WelcomeScreen = () => {
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
	return (
		<div className='d-flex'>
			<h1 className='text-center my-5'>
				BIENVENIDO A LA APP DE PEQUEÑOS Y MEDIANOS GIMNASIOS!
			</h1>
		</div>
	);
};
