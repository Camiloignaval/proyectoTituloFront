import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "./profile.css";
import {
	cancelEdit,
	startEditProfile,
	startUpdateProfile,
	startUploadImg,
} from "../../actions/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadCloudinary } from "../../../helpers/uploadCloudinary";
import { DarDeBaja } from "../ui/buttons/DarDeBaja";
export const Profile = () => {
	const dispatch = useDispatch();
	const {
		editMode,
		info: {
			id_usuario,
			nombre,
			apellido,
			email,
			fecha_nacimiento,
			foto,
			id_cargo,
			rut,
			telefono,
		},
	} = useSelector((state) => state.user);
	const schema = yup.object({
		email: yup.string().email("Formato incorrecto (example@email.com)"),
		telefono: yup
			.string()
			.matches(
				/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$|(^$)/,
				"Formato incorrecto (+569xxxxxxxx)",
			),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		if (data.foto != "" || data.telefono != "" || data.email != "") {
			data.id = id_usuario;
			data.foto === "" && (data.foto = foto);
			data.telefono === "" && (data.telefono = telefono);
			data.email === "" && (data.email = email);

			dispatch(startUpdateProfile(data));
		} else {
			dispatch(cancelEdit());
		}
	};

	let cargo = "";
	if (id_cargo === 1) {
		cargo = "Administrador";
	} else if (id_cargo === 3) {
		cargo = "Cliente activo";
	} else {
		cargo = "Entrenador personal";
	}

	const handleEdit = () => {
		dispatch(startEditProfile());
	};

	const handleUploadImg = async () => {
		const url = await uploadCloudinary();

		console.log(url);
	};

	const handleCancel = () => {
		dispatch(cancelEdit());
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='profile'>
					<div className='row head'>
						<div className='col-9 profile-head'>
							<h5>
								{nombre} {apellido}
							</h5>
							<h6>{cargo}</h6>
						</div>
						{editMode && (
							<div className='col-3'>
								<button onClick={handleCancel} className='btn  btn-danger'>
									Cancelar
								</button>
							</div>
						)}
						{/* 
							{editMode ? (
								<button type='submit' className='btn btn-success'>
									Guardar cambios
								</button>
							) : (
								<button
									type='button'
									className='btn btn-primary'
									onClick={handleEdit}
								>
									Editar perfil
								</button>
							)}
						</div> */}
					</div>
					<ul className='nav nav-tabs' id='myTab' role='tablist'></ul>
					<br />
					<div className='row'>
						<div className='col-4'>
							<div className='profile-img'>
								<img src={foto} alt='' />
								{editMode && (
									<div className='file btn btn-lg btn-primary'>
										Cambiar foto
										<input
											onClick={handleUploadImg}
											// type='file'
											// name='file'
											{...register("foto")}
										/>
									</div>
								)}
							</div>
						</div>

						<div className='col-md-8'>
							<div className='tab-content profile-tab' id='myTabContent'>
								<div
									className='tab-pane fade show active'
									id='home'
									role='tabpanel'
									aria-labelledby='home-tab'
								>
									<div className='row'>
										<div className='col-md-6'>
											<label>Nombre</label>
										</div>
										<div className='col-md-6'>
											<p>
												{nombre} {apellido}
											</p>
										</div>
									</div>

									<div className='row'>
										<div className='col-md-6'>
											<label>Fecha nacimiento</label>
										</div>
										<div className='col-md-6'>
											<p>
												{moment(fecha_nacimiento).locale("es").format("LL")}
											</p>
										</div>
									</div>
									<div className='row'>
										<div className='col-md-6'>
											<label>Rut</label>
										</div>
										<div className='col-md-6'>
											<p>{rut}</p>
										</div>
									</div>
									<div className='row'>
										<div className='col-md-6'>
											<label>Teléfono</label>
										</div>
										<div className='col-md-6'>
											{editMode ? (
												<div>
													<input
														placeholder={telefono}
														{...register("telefono")}
													/>
													<p className='w-100 error'>
														{errors.telefono?.message}
													</p>
												</div>
											) : (
												<p>{telefono}</p>
											)}
										</div>
									</div>
									<div className='row'>
										<div className='col-md-6'>
											<label>Email</label>
										</div>
										<div className='col-md-6'>
											{editMode ? (
												<div>
													<input {...register("email")} placeholder={email} />
													<p className='w-100 error'>{errors.email?.message}</p>
												</div>
											) : (
												<p>{email}</p>
											)}
										</div>
										<div className='col-md-6'></div>
										<div className='col-md-6 mt-3'>
											{editMode ? (
												<div>
													<button type='submit' className='btn btn-success'>
														Guardar cambios
													</button>
												</div>
											) : (
												<button
													type='button'
													className='btn btn-primary'
													onClick={handleEdit}
												>
													Editar perfil
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
			<DarDeBaja />
		</div>
	);
};
