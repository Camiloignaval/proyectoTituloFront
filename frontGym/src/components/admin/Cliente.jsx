import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "moment/locale/es";
import { startToggleBlock } from "../../actions/admin";

export const Cliente = ({ cliente: c }) => {
	const dispatch = useDispatch();

	const handleMsg = () => {
		// dispatch(startAccept(solicitud));
		alert("Enviar mensaje");
	};

	const handleBloq = () => {
		dispatch(
			startToggleBlock({
				id_usuario: c.id_usuario,
				bloquear: true,
			}),
		);
	};

	const handleUnbloq = () => {
		dispatch(
			startToggleBlock({
				id_usuario: c.id_usuario,
				bloquear: false,
			}),
		);
	};
	const handleInfo = () => {
		Swal.fire({
			title: `${c.nombre} ${c.apellido}`,
			text: "Modal with a custom image.",
			imageUrl:
				"https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg",
			imageWidth: 200,
			imageHeight: 150,
			imageAlt: "Foto perfil",
			html: ` <table>
			
			  <tr><b>Rut:</b> ${c.rut}</tr><br>
			  <tr><b>Dirección: </b>${c.calle}, ${c.nombre_comuna}</tr><br>
			  <tr><b>Fecha nacimiento:</b> ${moment(c.fecha_nacimiento).format(
					"DD MMMM YYYY",
				)}</tr><br>
			  <tr><b>Edad:</b> ${moment().diff(c.fecha_nacimiento, "year")}</tr><br>
			  <tr><b>Email:</b> ${c.email}</tr><br>
		  </table>`,
		});
	};
	return (
		<tr>
			<td>ejemplo</td>
			<td>{c.nombre}</td>
			<td>{c.apellido}</td>
			<td>{c.rut}</td>
			{/* <td>{moment().diff(fecha_nacimiento, "year")}</td> */}
			<td>{`${c.calle}, ${c.nombre_comuna}`}</td>
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
				{!c.bloqueado ? (
					<button
						onClick={handleBloq}
						type='button'
						className='btn btn-danger m-1 w-100'
					>
						Bloquear
					</button>
				) : (
					<button
						onClick={handleUnbloq}
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
