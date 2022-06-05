import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { eliminarCausa, guardarCausas } from "../../actions/admin";
import { array24h } from "../../helpers/arrayHorasDia";

export const HoraBloqueada = ({
  setCount,
  count,
  blockHours = [],
  pos,
  horasBloqueadas,
  setHorasBloqueadas,
}) => {
  const dispatch = useDispatch();
  const [dataInBDD, setdataInBDD] = useState();
  const [isDisabeld, setisDisabeld] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [causa, setCausa] = useState({
    hora: "",
    causa: "",
  });

  useEffect(() => {
    if (blockHours.length > 0) {
      setdataInBDD(blockHours[pos]);
    }
  }, [blockHours]);

  useEffect(() => {
    if (dataInBDD) {
      setCausa({
        hora: dataInBDD?.hora.slice(0, 5),
        causa: dataInBDD?.motivo,
      });
      setIsSaved(true);
    }
  }, [dataInBDD]);

  const handleSave = async () => {
    const resp = await dispatch(guardarCausas(causa));
    if (resp?.ok) {
      setIsSaved(true);
      setdataInBDD(resp?.response[0]);
      setHorasBloqueadas([...horasBloqueadas, causa?.hora]);
    }
    // TODO traer id para que se pueda borrar!
  };

  const handleDelete = () => {
    dispatch(eliminarCausa({ id_bloqueo: dataInBDD?.id_bloqueo_hora }));
    const arr = [...count];
    arr.pop();
    setCount(arr);
  };

  useEffect(() => {
    causa?.hora !== "" && causa?.causa !== ""
      ? setisDisabeld(false)
      : setisDisabeld(true);
  }, [causa]);

  return (
    <div className="mb-3">
      <div className="row">
        <div className=" col-2">
          <label className="mr-3">Hora </label>
          <select
            // onChange={handleChangeForm}
            name="hora_inicio"
            class="custom-select"
            style={{ width: "90px" }}
            value={causa?.hora}
            onChange={(e) => setCausa({ ...causa, hora: e.target.value })}
          >
            <option value="" disabled>
              Seleccione
            </option>
            {array24h.map((a) => (
              <option disabled={horasBloqueadas.includes(a)} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="col-8">
          <input
            value={causa?.causa}
            onChange={(e) => setCausa({ ...causa, causa: e.target.value })}
            className="w-100"
            style={{ height: "38px" }}
            type="text"
          />
        </div>
        <div className="col-2 ">
          {isSaved ? (
            <button
              disabled={isDisabeld}
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          ) : (
            <button
              disabled={isDisabeld}
              onClick={handleSave}
              className="btn btn-success"
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
