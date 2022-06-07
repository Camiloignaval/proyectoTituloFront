import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendRoutine } from "../../actions/admin";
import { alertSwal } from "../../helpers/swal";
import { DiaRoutina } from "./DiaRoutina";

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const Routine = () => {
  const {
    info: { id_usuario },
  } = useSelector((state) => state.user);
  const [infoRoutine, setinfoRoutine] = useState({});
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [isEnableSend, setisEnableSend] = useState(false);
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  //   ACTIVAR BOTON CUANDO HAYA UN REGISTRO
  useEffect(() => {
    const isMoreThan1Register = Object.keys(infoRoutine).length >= 1;
    isMoreThan1Register && level !== "" && name !== ""
      ? setisEnableSend(true)
      : setisEnableSend(false);
  }, [infoRoutine, level, name]);

  const handleSendRoutine = async () => {
    let array = [];
    Object.values(infoRoutine).map((e) => array.push(...Object.values(e)));
    const isEmpty = array.some((e) => e === "" || e === undefined);
    console.log(isEmpty);
    if (isEmpty) {
      alertSwal(false, "Favor borrar registros vacíos o completarlos", 3000);
    } else {
      const data = await dispatch(
        sendRoutine({
          id_entrenador: id_usuario,
          nivel: level,
          info: Object.values(infoRoutine),
          name,
        })
      );
      if (data?.ok) {
        //   resetear forms
        setName("");
        setReset(true);
        setinfoRoutine({});
        setLevel("");
        setReset(false);
      }
    }
  };

  return (
    <div className="container pt-5 ">
      <h1 className="text-center">Nueva rutina</h1>

      <div className="diasSemana pl-4">
        <div class="input-group mb-4 mt-4">
          <div class="input-group-prepend">
            <span
              style={{ width: "100px" }}
              class="input-group-text"
              id="basic-addon1"
            >
              Nombre
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            max={20}
            placeholder="Nombre rutina"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="selectNivel mb-5">
          <h5 style={{ display: "inline" }}>Seleccione nivel:</h5>
          <select
            className="ml-3 p-2"
            style={{ color: "black" }}
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          >
            <option defaultValue value={""}>
              Seleccione una opción
            </option>
            <option value={1}>Básica</option>
            <option value={2}>Intermedia</option>
            <option value={3}>Avanzada</option>
          </select>
        </div>

        {diasSemana.map((dia, index) => (
          <DiaRoutina
            reset={reset}
            key={dia}
            dia={dia}
            lugar={index}
            setinfoRoutine={setinfoRoutine}
            infoRoutine={infoRoutine}
          />
        ))}
      </div>
      <div className="btnSend d-flex justify-content-end my-3">
        <button
          onClick={handleSendRoutine}
          disabled={!isEnableSend}
          className="btn btn-success w-25 ml-3"
        >
          Enviar solicitud
        </button>
      </div>
    </div>
  );
};
