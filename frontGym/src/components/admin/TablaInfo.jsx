/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Solicitud } from "./Solicitud";
import { Cliente } from "./Cliente";
import { startViewClients } from "../../actions/admin";

// Se le pasa por parametro clientes o solicitudes
export const TablaInfo = ({ necesarios }) => {
  const dispatch = useDispatch();
  // const necesarios = eval(necesarios);
  const navigate = useNavigate();
  const info = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(startViewClients());
  }, []);

  useEffect(() => {
    if (info[necesarios].length === 0) {
      Swal.fire("Lo sentimos", `No tiene ${necesarios}`, "info");
      navigate("/admin");
    }
  }, [info[necesarios]]);
  return (
    <>
      {info[necesarios].length > 0 && (
        <table className="table table-striped table-dark tabla">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Rut</th>
              <th scope="col">Edad</th>
              <th scope="col">Dirección</th>
              {necesarios == "solicitudes" && <th scope="col">Tipo</th>}
              {necesarios !== "solicitudes" && <th scope="col">Nivel</th>}
            </tr>
          </thead>
          <tbody>
            {info[necesarios].map((s) =>
              necesarios == "solicitudes" ? (
                <Solicitud key={s.rut} solicitud={s} />
              ) : (
                <Cliente key={s.rut} cliente={s} />
              )
            )}
          </tbody>
        </table>
      )}
    </>
  );
};
