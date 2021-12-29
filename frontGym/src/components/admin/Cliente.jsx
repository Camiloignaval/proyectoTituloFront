import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "moment/locale/es";
import { startToggleBlock } from "../../actions/admin";
import "./cliente.css";
import { fetchSinToken } from "../../hooks/fetch";

export const Cliente = ({ cliente: c }) => {
	const dispatch = useDispatch();

	// bloquear usuario
	const handleBloq = () => {
		dispatch(
			startToggleBlock({
				id_usuario: c.id_usuario,
				bloquear: true,
			}),
		);
	};
	// desbloquear usuario
	const handleUnbloq = () => {
		dispatch(
			startToggleBlock({
				id_usuario: c.id_usuario,
				bloquear: false,
			}),
		);
	};
	// fdesplegar informacion extra
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
			  <tr><b>Teléfono:</b> ${c.telefono}</tr><br>

		  </table>`,
		});
	};

	// enviar mensaje
	const handleMsg = async () => {
		const { value: formValues } = await Swal.fire({
			title: `Enviar mensaje a ${c.nombre} ${c.apellido}`,
			customClass: "swal-size",
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonColor: "#ffc312",
			html:
				'<input placeholder="Asunto" id="swal-input1" class="swal2-input">' +
				'<textarea placeholder="Escribe tu mensaje" id="swal-input2" class="swal2-input">',
			focusConfirm: false,
			confirmButtonText: "Enviar",
			preConfirm: () => {
				if (
					document.getElementById("swal-input1").value == "" ||
					document.getElementById("swal-input2").value == ""
				) {
					Swal.showValidationMessage("Debe rellenar ambos campos");
				}
				return [
					document.getElementById("swal-input1").value,
					document.getElementById("swal-input2").value,
				];
			},
		});
		if (formValues) {
			Swal.fire(JSON.stringify("Mensaje enviado"));
			await fetchSinToken(
				"http://localhost:4000/api/msg/send",
				{
					tipo: "recordatorio",
					mensaje: formValues[1],
					subject: formValues[0],
					...c,
				},
				"POST",
			);
		}
	};
	return (
		<tr>
			<td>ejemplo</td>
			<td>
				{c.nombre} {c.apellido}
			</td>

			<td>{c.rut}</td>
			<td>{moment().diff(c.fecha_nacimiento, "year")}</td>
			<td>{`${c.calle}, ${c.nombre_comuna}`}</td>
			<td>
				<button
					onClick={handleInfo}
					type='button'
					className='btn btn-info m-1 w-100'
				>
					<i className='fas fa-info mr-2'></i>
					Ver Más
				</button>
			</td>
			<td>
				<button
					onClick={handleMsg}
					type='button'
					className='btn btn-success m-1 w-100'
					data-whatever='@mdo'
					data-toggle='modal'
					data-target='#exampleModal'
				>
					<i className='far fa-envelope mr-2'></i>
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
						<i className='fas fa-ban mr-2'></i>
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
