import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  guardarHorarios,
  obtenerCausas,
  obtenerHorarios,
} from "../../actions/admin";
import { BloquearHoras } from "./BloqueHoras";
import { FilaDiasHorario } from "./FilaDiasHorario";

const dias = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];
export const Horarios = () => {
  const { blockHours } = useSelector((state) => state.admin);
  const [horariosSemana, setHorariosSemana] = useState({});
  const [horasDisponibles, sethorasDisponibles] = useState()
  const [isSend, setIsSend] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerHorarios());
    dispatch(obtenerCausas());
  }, []);

  useEffect(() => {
    const array = Object.values(horariosSemana);
    let flag = true;
    if (array.length === 7) {
      array.map((a) => {
        if (!a?.cerrado) {
          if (
            a?.hora_inicio === "" ||
            a?.hora_final === "" ||
            a?.aforo === ""
          ) {
            flag = false;
          }
        }
      });
      setIsSend(flag);
    }
  }, [horariosSemana]);

  const handleSave = () => {
    dispatch(guardarHorarios(horariosSemana));
  };

  return (
    <div className="container pt-4">
      <h1 className="text-center pb-4">Gestión de horarios</h1>
      {dias.map((d, i) => (
        <FilaDiasHorario
          key={i}
          horariosSemana={horariosSemana}
          setHorariosSemana={setHorariosSemana}
          dia={d}
        />
      ))}
      <div className="btnGuardar d-flex justify-content-center mt-5">
        <button
          style={{ height: "40px", borderRadius: "8px" }}
          disabled={!isSend}
          onClick={handleSave}
          className="w-75 massive_btn"
        >
          Guardar
        </button>
      </div>
      <h3 className="text-center mt-5 ">Horas inhabilitadas</h3>
      <BloquearHoras blockHours={blockHours} />
    </div>
  );
};
