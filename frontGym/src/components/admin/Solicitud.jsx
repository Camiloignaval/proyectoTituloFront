import React from "react";

export const Solicitud = ({ solicitud }) => {
	const { nombre, apellido, rut, email, edad, direccion } = solicitud;

	const handleAcept = () => {
		alert(rut);
	};

	const handleReject = () => {};

	return (
		<tr>
			<td>ejemplo</td>
			<td>{nombre}</td>
			<td>{apellido}</td>
			<td>{rut}</td>
			<td>{email}</td>
			<td>{edad}</td>
			<td>{direccion}</td>
			<td>
				<button
					onClick={handleAcept}
					type='button'
					className='btn btn-success m-1 w-100'
				>
					Aprobar
				</button>
			</td>
			<td>
				<button
					onClick={handleReject}
					type='button'
					className='btn btn-danger m-1 w-100'
				>
					Rechazar
				</button>
			</td>
		</tr>
	);
};
