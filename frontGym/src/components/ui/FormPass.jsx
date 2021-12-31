import React from "react";
import { useDispatch } from "react-redux";
import { endChangePass, sendChangePass } from "../../actions/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

export const FormPass = () => {
	const {
		info: { rut },
	} = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const handleCancel = () => {
		dispatch(endChangePass());
	};
	const schema = yup.object({
		passActual: yup.string().required("Password actual es necesario"),
		passNuevo: yup
			.string()
			.required("Contraseña requerida")
			.min(6, "Debe tener un minimo de 6 caracteres")
			.notOneOf(
				[yup.ref("passActual"), null],
				"Contraseña no puede igual a la actual",
			),
		passNuevo2: yup
			.string()
			.required("Contraseña requerida")
			.min(6, "Debe tener un minimo de 6 caracteres")
			.oneOf([yup.ref("passNuevo"), null], "Contraseñas deben ser iguales"),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		data.rut = rut;
		dispatch(sendChangePass(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='form-group'>
				<label htmlFor='exampleInputPassword1'>Contraseña actual</label>
				<input
					type='password'
					className='form-control'
					{...register("passActual")}
				/>
				<p className='w-100 error'>{errors.passActual?.message}</p>
			</div>
			<div className='form-group'>
				<label htmlFor='exampleInputPassword1'>Nueva contraseña</label>
				<input
					type='password'
					className='form-control'
					{...register("passNuevo")}
				/>
				<p className='w-100 error'>{errors.passNuevo?.message}</p>
			</div>
			<div className='form-group'>
				<label htmlFor='exampleInputPassword1'>Confirme contraseña</label>
				<input
					type='password'
					className='form-control'
					{...register("passNuevo2")}
				/>
				<p className='w-100 error'>{errors.passNuevo2?.message}</p>
			</div>
			<div className='botonesPass float-right'>
				<button type='submit' className='btn btn-success mr-1'>
					Cambiar
				</button>
				<button
					onClick={handleCancel}
					type='button'
					className='btn btn-danger ml-1'
				>
					Cancelar
				</button>
			</div>
		</form>
	);
};
