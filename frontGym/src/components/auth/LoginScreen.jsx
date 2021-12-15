import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Nav } from "../ui/Nav";
import { useDispatch } from "react-redux";
import { startLogin } from "../../actions/auth";
import { useSelector } from "react-redux";

export const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { info } = useSelector((state) => state.user);
	console.log(info);

	useEffect(() => {
		if (info !== null) {
			if (info.id_cargo === 3) {
				navigate("/user");
			} else if (info.id_cargo === 1) {
				navigate("/admin");
			}
		}
	}, [info]);
	// validaciones con yup
	const schema = yup
		.object({
			rut: yup.string().required("Rut requerido"),
			password: yup.string().required("Contraseña requerida"),
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
		dispatch(startLogin(data));
	};

	return (
		<>
			<Nav />
			<div className='container mt-5'>
				<div className='d-flex justify-content-center h-100'>
					<div className='card'>
						<div className='card-header'>
							<h3>Iniciar sesión</h3>
						</div>
						<div className='card-body'>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-user'></i>
										</span>
									</div>
									{/* rut */}
									<input
										type='text'
										className='form-control'
										placeholder='rut'
										{...register("rut")}
									/>
									<p className='w-100 error'>{errors.rut?.message}</p>
								</div>
								<div className='input-group form-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text'>
											<i className='fas fa-key'></i>
										</span>
									</div>
									{/* password */}
									<input
										type='password'
										className='form-control'
										placeholder='password'
										{...register("password")}
									/>
									<p className='w-100 error'>{errors.password?.message}</p>
								</div>
								<div className='form-group'>
									<button
										type='submit'
										className='btn btn-block login_btn mt-4'
									>
										Entrar
									</button>
									<div className='d-flex justify-content-end links my-4'>
										No tienes cuenta?
										<Link to='/register'>Click aqui!</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
