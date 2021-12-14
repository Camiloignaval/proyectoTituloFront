import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { startAccept } from "../../actions/admin";

export const Solicitud = ({ solicitud }) => {
	const dispatch = useDispatch();
	const { nombre, apellido, rut, email, calle, comuna, fecha_nacimiento } =
		solicitud;
	const handleAcept = () => {
		dispatch(startAccept(solicitud));
	};

	const handleReject = () => {
		// dispatch(startReject(solicitud));
		alert(rut);
	};
	return (
		<tr>
			<td>ejemplo</td>
			<td>{nombre}</td>
			<td>{apellido}</td>
			<td>{rut}</td>
			<td>{email}</td>
			<td>{moment().diff(fecha_nacimiento, "year")}</td>
			<td>{`${calle}, ${comuna}`}</td>
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
