import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getReserves } from "../../actions/admin";
import dayjs from "dayjs";
import { TablaReservas } from "./TablaReservas";

export const ViewReserves = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [horarios, setHorarios] = useState([]);

  const handleConsult = async () => {
    const resp = await dispatch(getReserves(date));
    console.log(resp);
    if (resp.ok) {
      setHorarios(resp.response);
    } else {
      setHorarios([]);
    }
  };

  return (
    <div className="container pt-5 w-25">
      <h1 className="text-center">Reservas</h1>
      <div className="input-group mb-3 mt-5">
        <div className="input-group-prepend">
          <span className="w-100 input-group-text" id="basic-addon3">
            Fecha
          </span>
        </div>
        <input
          type="date"
          className="form-control w-50"
          aria-label="monto"
          aria-describedby="basic-addon3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          disabled={date === ""}
          onClick={handleConsult}
          className="ml-2 btn btn-warning"
        >
          Consultar
        </button>
      </div>
      {horarios.length > 0 && <TablaReservas horarios={horarios} />}
    </div>
  );
};
