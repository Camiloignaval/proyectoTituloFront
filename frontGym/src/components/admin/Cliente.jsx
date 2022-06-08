/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "moment/locale/es";
import { changeLvL, startToggleBlock } from "../../actions/admin";
import "./cliente.css";
import { fetchConToken } from "../../hooks/fetch";

export const Cliente = ({ cliente: c }) => {
  const dispatch = useDispatch();
  const { nombre, apellido, email, foto } = c;
  const [nivelUser, setNivelUser] = useState(c?.nivel_usuario);
  const [isCharged, setisCharged] = useState(false);
  // cambiar nivel usuario
  useEffect(() => {
    isCharged && dispatch(changeLvL({ nivelUser, id_cliente: c.id_usuario }));
  }, [nivelUser]);

  useEffect(() => {
    setisCharged(true);
  }, [c]);

  // bloquear usuario
  const handleBloq = () => {
    dispatch(
      startToggleBlock({
        id_usuario: c.id_usuario,
        bloquear: true,
      })
    );
  };
  // desbloquear usuario
  const handleUnbloq = () => {
    dispatch(
      startToggleBlock({
        id_usuario: c.id_usuario,
        bloquear: false,
      })
    );
  };
  // fdesplegar informacion extra
  const handleInfo = () => {
    Swal.fire({
      title: `${c.nombre} ${c.apellido}`,
      text: "Modal with a custom image.",
      imageUrl: foto,
      imageWidth: 200,
      // imageHeight: 150,
      imageAlt: "Foto perfil",
      html: ` <table>
			
			  <tr><b>Rut:</b> ${c.rut}</tr><br>
			  <tr><b>Dirección: </b>${c.calle}, ${c.nombre_comuna}</tr><br>
			  <tr><b>Fecha nacimiento:</b> ${moment(c.fecha_nacimiento).format(
          "DD MMMM YYYY"
        )}</tr><br>
			  <tr><b>Edad:</b> ${moment().diff(c.fecha_nacimiento, "year")}</tr><br>
			  <tr><b>Email:</b> ${c.email}</tr><br>
			  <tr><b>Teléfono:</b> ${c.telefono}</tr><br>
			  <tr><b>Finanzas:</b> ${
          c.estado_financiero
            ? 'Al dia <i class="fas fa-check"></i>'
            : 'Atrasado <i class="fas fa-times-circle"></i>'
        }</tr><br>



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
      await fetchConToken(
        "http://localhost:4000/api/msg/send",
        {
          tipo: "recordatorio",
          mensaje: formValues[1],
          subject: formValues[0],
          nombre,
          apellido,
          email,
        },
        "POST"
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
        <div class="form-group">
          <select
            defaultValue={nivelUser}
            class="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setNivelUser(e.target.value)}
          >
            <option value={1}>Principiante</option>
            <option value={2}>Intermedio</option>
            <option value={3}>Avanzado</option>
          </select>
        </div>
      </td>
      <td>
        <button
          onClick={handleInfo}
          type="button"
          className="btn btn-info m-1 w-100"
        >
          <i className="fas fa-info mr-2" />
          Ver Más
        </button>
      </td>
      <td>
        <button
          onClick={handleMsg}
          type="button"
          className="btn btn-success m-1 w-100"
          data-whatever="@mdo"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i className="far fa-envelope mr-2" />
          Enviar Mensaje
        </button>
      </td>
      <td>
        {!c.bloqueado ? (
          <button
            onClick={handleBloq}
            type="button"
            className="btn btn-danger m-1 w-100"
          >
            <i className="fas fa-ban mr-2" />
            Bloquear
          </button>
        ) : (
          <button
            onClick={handleUnbloq}
            type="button"
            className="btn btn-warning m-1 w-100"
          >
            Desbloquear
          </button>
        )}
      </td>
    </tr>
  );
};
