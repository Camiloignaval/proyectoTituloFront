import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";

export const Cliente = ({ cliente }) => {
	// const dispatch = useDispatch();
	console.log(cliente);
	const { nombre, apellido, rut, calle, nombre_comuna, bloqueado } = cliente;
	const handleMsg = () => {
		// dispatch(startAccept(solicitud));
		alert("Enviar mensaje");
	};

	const handleBloq = () => {
		// dispatch(startReject(id_solicitud));
		alert("Ha sido bloqueado");
	};
	const handleInfo = () => {
		// dispatch(startReject(id_solicitud));
		alert("info");
	};
	return (
		<tr>
			<td>ejemplo</td>
			<td>{nombre}</td>
			<td>{apellido}</td>
			<td>{rut}</td>
			{/* <td>{moment().diff(fecha_nacimiento, "year")}</td> */}
			<td>{`${calle}, ${nombre_comuna}`}</td>
			<td>
				<button
					onClick={handleInfo}
					type='button'
					className='btn btn-info m-1 w-100'
				>
					Ver Más
				</button>
			</td>
			<td>
				<button
					onClick={handleMsg}
					type='button'
					className='btn btn-success m-1 w-100'
				>
					Enviar Mensaje
				</button>
			</td>
			<td>
				{!bloqueado ? (
					<button
						onClick={handleBloq}
						type='button'
						className='btn btn-danger m-1 w-100'
					>
						Bloquear
					</button>
				) : (
					<button
						onClick={handleBloq}
						type='button'
						className='btn btn-warning m-1 w-100'
					>
						Desbloquear
					</button>
				)}
			</td>
		</tr>
	);
};
