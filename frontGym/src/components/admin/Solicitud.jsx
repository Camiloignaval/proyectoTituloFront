import React from "react";

export const Solicitud = ({ solicitud }) => {
	console.log(solicitud);
	return (
		<tr>
			<td>ejemplo</td>
			<td>{solicitud.nombre}</td>
			<td>{solicitud.apellido}</td>
			<td>{solicitud.rut}</td>
			<td>{solicitud.email}</td>
			<td>{solicitud.edad}</td>
			<td>{solicitud.direccion}</td>
			<td>
				<button type='button' className='btn btn-success m-1 w-100'>
					Aprobar
				</button>
			</td>
			<td>
				<button type='button' className='btn btn-danger m-1 w-100'>
					Rechazar
				</button>
			</td>
		</tr>
	);
};
