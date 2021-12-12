import moment from "moment";
import React, { useEffect, useState } from "react";
import { Solicitud } from "./Solicitud";
import "./solicitudes.css";

const initialState = [
	{
		nombre: "",
		apellido: "",
		rut: "",
		email: "",
		edad: "",
		direccion: "",
	},
];

export const Solicitudes = () => {
	const [solicitudes, setSolicitudes] = useState(initialState);

	useEffect(async () => {
		const { datos } = await obtenerDatos();
		datos.map((d) => {
			d.edad = moment().diff(d["fecha nacimiento"], "years");
			d.direccion = `${d.calle}, ${d.comuna}`;
		});
		setSolicitudes(datos);
	}, []);

	const obtenerDatos = async () => {
		const resp = await fetch("http://localhost:4000/api/admin/requests");
		const data = await resp.json();
		return data;
	};

	// console.log(solicitudes);
	return (
		<>
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
		</>
	);
};
