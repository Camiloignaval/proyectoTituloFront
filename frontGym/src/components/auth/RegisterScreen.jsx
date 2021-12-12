import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validateRUT } from "validar-rut";
// import swal from "sweetalert2";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { useNavigate } from "react-router-dom";
import { Nav } from "../ui/Nav";

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
			} catch (error) {
				console.log(error);
			}
			// Enviar datos a api
			enviarSolicitud(data);
			Swal.fire(
				"Solicitud enviada",
				"Nos contactaremos con usted a la brevedad",
				"success",
			);
			navigate("/");
		}
	};

	const enviarSolicitud = async (datos) => {
		fetch("http://localhost:4000/api/auth/register", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(datos),
		});
	};

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
										{...register("email")}
									/>
									<p className='w-100 error'>{errors.email?.message}</p>
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
										placeholder='Ingresa tu direccion'
										{...register("adress")}
									/>
									<p className='w-100 error'>{errors.adress?.message}</p>
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
										{...register("pass2")}
									/>
									<p className='w-100 error'>{errors.pass2?.message}</p>
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
