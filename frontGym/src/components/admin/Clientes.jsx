import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Cliente } from "./Cliente";

export const Clientes = () => {
	const navigate = useNavigate();
	const { clientes } = useSelector((state) => state.admin);
	useEffect(() => {
		if (clientes.length === 0) {
			Swal.fire("Lo sentimos", "No tiene clientes", "info");
			navigate("/admin");
		}
	}, [clientes]);
	return (
		<>
			<>
				{clientes.length > 0 && (
					<table className='table table-striped table-dark tabla'>
						<thead>
							<tr>
								<th scope='col'>id</th>
								<th scope='col'>Nombre</th>
								<th scope='col'>Apellido</th>
								<th scope='col'>Rut</th>
								<th scope='col'>Dirección</th>
							</tr>
						</thead>
						<tbody>
							{clientes.map((c) => (
								<Cliente key={c.rut} cliente={c} />
							))}
						</tbody>
					</table>
				)}
			</>
		</>
	);
};
