import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startBajaCuenta } from "../../../actions/auth";
import "./dardebaja.css";

export const DarDeBaja = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		info: { id_usuario },
	} = useSelector((state) => state.user);
	const handleDelete = () => {
		Swal.fire({
			title: "Estás seguro?",
			text: "No podrás revertir esto!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, darme de baja!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(startBajaCuenta({ id_usuario }));
				navigate("/");
			}
		});
	};
	return (
		<div>
			<button onClick={handleDelete} className='btn btn-danger darbaja'>
				Darse de baja
			</button>
		</div>
	);
};
