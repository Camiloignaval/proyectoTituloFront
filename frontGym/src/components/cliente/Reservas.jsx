import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { array24h } from "../../helpers/arrayHorasDia";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReserve,
  getAforoPorDia,
  getDaysOff,
  getReserveHour,
  reserveHour,
} from "../../actions/user";
import { alertSwal } from "../../helpers/swal";
import { Button, DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.dark.css";
moment.locale("es");

const objDias = {
  Lunes: 1,
  Martes: 2,
  Miercoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sabado: 6,
  Domingo: 0,
};

export const Reservas = () => {
  const {
    info: { id_usuario },
    haveReserve,
    datosReserve,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [diasCerrados, setDiasCerrados] = useState([]);
  const [tieneHora, setTieneHora] = useState(false);

  // obtener dias cerrado
  useEffect(() => {
    (async () => {
      const { response } = await dispatch(getDaysOff());
      setDiasCerrados(
        response.map((r) => r?.cerrado && objDias[r?.dia_semana])
      );
    })();
  }, []);
  // obtener hora reservada
  useEffect(() => {
    dispatch(getReserveHour(id_usuario));
  }, []);

  // estblecer horarios permitidos para seleccionar
  useEffect(() => {
    (async () => {
      if (date !== "") {
        try {
          const { response, dataDia /* :{aforo,hora_apertura,hora_cierre} */ } =
            await dispatch(getAforoPorDia(date));
          const arrayNuevo = array24h.filter(
            (a) =>
              Number(a.slice(0, 2)) >=
                Number(dataDia?.hora_apertura.slice(0, 2)) &&
              Number(a.slice(0, 2)) <=
                Number(dataDia?.hora_cierre.slice(0, 2) - 1)
          );
          setHorasDisponibles(
            arrayNuevo.map((a) => {
              let aRetornar = { hora: a, aforo: dataDia?.aforo };
              response.map((r) => {
                if (r.hora === a) {
                  aRetornar.aforo = r?.aforo;
                }
              });
              return aRetornar;
            })
          );
        } catch (error) {
          alertSwal(false, "Ha ocurrido un error");
        }
      }
    })();
  }, [date]);

  const handleReserve = async () => {
    dispatch(reserveHour({ id_usuario, date, hour }));
  };

  function disabledDate(current) {
    return (
      diasCerrados.includes(moment(current).day()) ||
      current.valueOf() < Date.now()
    );
  }

  function onChange(date, dateString) {
    setDate(dateString);
  }

  return (
    <div className="container">
      <h1 className="text-center pt-5 s">Reservas</h1>

      {!haveReserve ? (
        <>
          <h3 className="mb-4">Reserva tu hora:</h3>
          <DatePicker
            style={{ marginRight: "20px" }}
            disabledDate={disabledDate}
            onChange={onChange} /* min={dayjs().format('YYYY-MM-DD')} */
            //   showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
          />
          <select
            disabled={date === ""}
            // onChange={handleChangeForm}
            name="hora_inicio"
            class="custom-select"
            style={{ width: "90px" }}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          >
            <option value="" disabled>
              Seleccione
            </option>
            {horasDisponibles.map((a, i) => (
              <option
                key={i}
                disabled={Number(a.aforo) < 1}
                value={a.hora}
              >{`${a.hora} (${a.aforo} cupos)`}</option>
            ))}
          </select>
          <button
            onClick={handleReserve}
            disabled={date === "" || hour === ""}
            className="btn btn-success ml-4"
          >
            Reservar
          </button>
        </>
      ) : (
        <>
          <h2>Tienes una reserva</h2>
          <div div className="d-flex">
            <h4>
              <i style={{ color: "green" }} class="fas fa-check-circle"></i> El
              dia {dayjs(datosReserve?.fecha).format("dddd DD MMMM YYYY")} a las{" "}
              {datosReserve?.hora?.slice(0, 5)} Hrs.
            </h4>
            <Button
              className="ml-4"
              type="primary"
              danger
              onClick={() => dispatch(deleteReserve(datosReserve?.id_reserva))}
            >
              Anular hora
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
