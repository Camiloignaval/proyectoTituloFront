import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Solicitud } from "./Solicitud";
import "./solicitudes.css";

export const Solicitudes = () => {
	const navigate = useNavigate();
	const { solicitudes } = useSelector((state) => state.admin);
	const {
		info: { id_cargo },
	} = useSelector((state) => state.user);
	useEffect(() => {
		if (solicitudes.length === 0 && id_cargo === 1) {
			Swal.fire("Lo sentimos", "No tiene solicitudes pendientes", "info");
			navigate("/admin");
		}
	}, [solicitudes]);
	return (
		<>
			{solicitudes.length > 0 && (
				<table className='table table-striped table-dark tabla'>
					<thead>
						<tr>
							<th scope='col'>id</th>
							<th scope='col'>Nombre</th>
							<th scope='col'>Apellido</th>
							<th scope='col'>Rut</th>
							<th scope='col'>Correo</th>
							<th scope='col'>Edad</th>
							<th scope='col'>Dirección</th>
						</tr>
					</thead>
					<tbody>
						{solicitudes.map((s) => (
							<Solicitud key={s.rut} solicitud={s} />
						))}
					</tbody>
				</table>
			)}
		</>
	);
};
