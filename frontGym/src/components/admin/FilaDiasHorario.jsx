import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { array24h } from "../../helpers/arrayHorasDia";

export const FilaDiasHorario = ({ dia, horariosSemana, setHorariosSemana }) => {
  const { schedules } = useSelector((state) => state.admin);
  const [isDisabled, setisDisabled] = useState(false);
  const [info, setinfo] = useState({
    dia,
    hora_inicio: "",
    hora_final: "",
    aforo: "",
    cerrado: false,
  });

  useEffect(() => {
    // const datos = useSelector((state) => state.schedules);
    if (schedules.length > 0) {
      const datos = schedules.filter((s) => s?.dia_semana === dia);
      if (datos.length > 0) {
        const d = datos[0];
        setinfo({
          ...info,
          hora_inicio: d?.hora_apertura.slice(0, 5),
          hora_final: d?.hora_cierre.slice(0, 5),
          aforo: d?.aforo,
          cerrado: d?.cerrado,
        });
      }
    }
  }, [schedules]);

  useEffect(() => {
    setHorariosSemana((prev) => ({ ...prev, [dia]: info }));
  }, [info]);

  useEffect(() => {
    setisDisabled(info?.cerrado);
    if (info?.cerrado) {
      setinfo({
        ...info,
        hora_inicio: "",
        hora_final: "",
        aforo: "",
      });
    }
  }, [info?.cerrado]);

  const handleChangeForm = (e) => {
    const {
      target: { value, name },
    } = e;
    setinfo({ ...info, [name]: value });
  };

  useEffect(() => {}, [info]);

  return (
    <div className="row mb-2">
      <div className="col-2">{dia}</div>
      <div className=" col">
        <label className="mr-3">Hora apertura</label>
        <select
          disabled={isDisabled}
          onChange={handleChangeForm}
          name="hora_inicio"
          class="custom-select"
          style={{ width: "90px" }}
          defaultValue={info?.hora_inicio}
        >
          <option value="" disabled selected={isDisabled}>
            Seleccione
          </option>
          {array24h.map((a) => (
            <option selected={info?.hora_inicio === a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <div className="col">
        <label className="mr-3">Hora cierre</label>
        <select
          disabled={isDisabled}
          onChange={handleChangeForm}
          name="hora_final"
          class="custom-select"
          style={{ width: "90px" }}
        >
          <option value="" selected={isDisabled} disabled>
            Seleccione
          </option>
          {array24h.map((a) => (
            <option selected={info?.hora_final === a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <div className="col">
        <label htmlFor="Aforo" className="mr-3">
          Aforo
        </label>
        <input
          disabled={isDisabled}
          onChange={handleChangeForm}
          value={info?.aforo}
          name="aforo"
          style={{ width: "80px" }}
          type="number"
        />
      </div>
      <div className="col">
        <label htmlFor="Aforo" className="mr-3">
          Cerrado
        </label>
        <input
          onChange={() => setinfo({ ...info, cerrado: !info?.cerrado })}
          checked={info?.cerrado}
          name="cerrado"
          style={{ width: "80px" }}
          type="checkbox"
        />
      </div>
    </div>
  );
};
