import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validateRUT } from "validar-rut";
// import swal from "sweetalert2";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { useNavigate } from "react-router-dom";
import { Nav } from "../ui/Nav";
import { RegionesYcomunas } from "../../Comunas/comunas";

export const RegisterScreen = () => {
	const navigate = useNavigate();
	// validaciones con yup
	const schema = yup
		.object({
			email: yup
				.string()
				.email("Formato incorrecto (example@email.com)")
				.required("Email requerido"),
			pass1: yup
				.string()
				.required("Contraseña requerida")
				.min(6, "Debe tener un minimo de 6 caracteres"),
			pass2: yup
				.string()
				.required("Contraseña requerida")
				.min(6, "Debe tener un minimo de 6 caracteres")
				.oneOf([yup.ref("pass1"), null], "Contraseñas deben ser iguales"),
			name: yup
				.string()
				.required("Nombre requerido")
				.matches(/^[aA-zZ\s]+$/, "Solo letras porfavor"),
			lastName: yup
				.string()
				.required("Apellido requerido")
				.matches(/^[aA-zZ\s]+$/, "Solo letras porfavor"),
			rut: yup.string().required("Rut es requerido"),
			adress: yup.string().required("Diurección es requerida"),
			date: yup.string().required("Fecha de nacimiento es requerida"),
			region: yup.string().required("Favor escoger región"),
			comuna: yup.string().required("Favor escoger comuna"),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		if (!validateRUT(data.rut)) {
			document.querySelector(".eRut").innerHTML = "Rut inválido";
		} else {
			try {
				data.rut = data.rut.replace(/[.-]/gm, "");
				// Enviar datos a api
				enviarSolicitud(data);
				Swal.fire(
					"Solicitud enviada",
					"Nos contactaremos con usted a la brevedad",
					"success",
				);
				navigate("/");
			} catch (error) {
				console.log(error);
			}
		}
	};

	const enviarSolicitud = async (datos) => {
		try {
			const resp = await fetch("http://localhost:4000/api/auth/register", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify(datos),
			});
			console.log("Respuestaaaaa", resp);
		} catch (error) {
			console.log(error);
		}
	};

	// Funciones para regiones y comunas

	jQuery(document).ready(function () {
		var iRegion = 0;
		var htmlRegion =
			'<option value="sin-region">Seleccione región</option><option value="sin-region">--</option>';
		var htmlComunas =
			'<option value="sin-region">Seleccione comuna</option><option value="sin-region">--</option>';

		jQuery.each(RegionesYcomunas.regiones, function () {
			htmlRegion =
				htmlRegion +
				'<option value="' +
				RegionesYcomunas.regiones[iRegion].NombreRegion +
				'">' +
				RegionesYcomunas.regiones[iRegion].NombreRegion +
				"</option>";
			iRegion++;
		});

		jQuery("#regiones").html(htmlRegion);
		jQuery("#comunas").html(htmlComunas);

		jQuery("#regiones").change(function () {
			var iRegiones = 0;
			var valorRegion = jQuery(this).val();
			var htmlComuna =
				'<option value="sin-comuna">Seleccione comuna</option><option value="sin-comuna">--</option>';
			jQuery.each(RegionesYcomunas.regiones, function () {
				if (RegionesYcomunas.regiones[iRegiones].NombreRegion == valorRegion) {
					var iComunas = 0;
					jQuery.each(
						RegionesYcomunas.regiones[iRegiones].comunas,
						function () {
							htmlComuna =
								htmlComuna +
								'<option value="' +
								RegionesYcomunas.regiones[iRegiones].comunas[iComunas] +
								'">' +
								RegionesYcomunas.regiones[iRegiones].comunas[iComunas] +
								"</option>";
							iComunas++;
						},
					);
				}
				iRegiones++;
			});
			jQuery("#comunas").html(htmlComuna);
		});
		jQuery("#comunas").change(function () {
			if (jQuery(this).val() == "sin-region") {
				alert("selecciones Región");
			} else if (jQuery(this).val() == "sin-comuna") {
				alert("selecciones Comuna");
			}
		});
		jQuery("#regiones").change(function () {
			if (jQuery(this).val() == "sin-region") {
				alert("selecciones Región");
			}
		});
	});

	return (
		<>
			<Nav />
			<div className='container mt-5'>
				<div className='d-flex justify-content-center h-100'>
					<div className='card'>
						<div className='card-header'>
							<h3>Registro</h3>
						</div>
						<div className='card-body'>
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* nombre */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-user'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='Ingresa tu nombre'
										value='Camilo'
										{...register("name")}
									/>
									<p className='w-100 error'>{errors.name?.message}</p>
								</div>
								{/* apellido */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-user'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='Ingresa tu Apellido'
										value='Valenzuela'
										{...register("lastName")}
									/>
									<p className='w-100 error'>{errors.lastName?.message}</p>
								</div>
								{/* email */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-envelope'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='Ingresa tu email'
										value='camilo@gmail.com'
										{...register("email")}
									/>
									<p className='w-100 error'>{errors.email?.message}</p>
								</div>
								{/* fecha nacimiento */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-birthday-cake'></i>
										</span>
									</div>
									<input
										type='date'
										className='form-control'
										placeholder='Ingresa tu fecha de nacimiento'
										{...register("date")}
									/>
									<p className='w-100 error'>{errors.date?.message}</p>
								</div>
								{/* rut */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-address-card'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='Ingresa tu Rut'
										value='18211103-1'
										{...register("rut")}
									/>
									<p className='w-100 error eRut'>{errors.rut?.message}</p>
								</div>
								{/* contraseña */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-key'></i>
										</span>
									</div>
									<input
										type='password'
										className='form-control'
										placeholder='Ingresa tu password'
										value='blabla'
										{...register("pass1")}
									/>
									<p className='w-100 error'>{errors.pass1?.message}</p>
								</div>
								{/* password 2 */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-key'></i>
										</span>
									</div>
									<input
										type='password'
										className='form-control'
										placeholder='Repite password'
										value='blabla'
										{...register("pass2")}
									/>
									<p className='w-100 error'>{errors.pass2?.message}</p>
								</div>
								{/* Direccion */}
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-map-marked'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='Ingrese calle y número'
										value='alonso'
										{...register("adress")}
									/>
									<p className='w-100 error'>{errors.adress?.message}</p>
								</div>
								<div className=' row'>
									{/* regiones */}
									<div className='col-6 input-group form-group'>
										<select
											className='w-100 form-control'
											id='regiones'
											{...register("region")}
										></select>
										<p className='w-100 error'>{errors.region?.message}</p>
									</div>
									{/* comunas */}
									<div className='col-6'>
										<select
											className='w-100 form-control'
											id='comunas'
											{...register("comuna")}
										></select>
										<p className='w-100 error'>{errors.comuna?.message}</p>
									</div>
								</div>
								<div className='form-group mt-5'>
									<button type='submit' className='btn btn-block login_btn'>
										Enviar solicitud
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};