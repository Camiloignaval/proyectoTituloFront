import React, { useEffect, useState } from "react";

export const Ejercicio = ({
  lugarDia,
  lugarEjercicio,
  setinfoRoutine,
  setEjerciciosDia,
}) => {
  const [infoEjercicio, setinfoEjercicio] = useState({
    lugarDia,
    lugarEjercicio,
    nombre: undefined,
    descripcion: undefined,
    repeticiones: undefined,
    series: undefined,
    descanso: undefined,
  });
  useEffect(() => {
    setinfoRoutine((prev) => ({
      ...prev,
      [`${lugarDia}-${lugarEjercicio}`]: infoEjercicio,
    }));
    setEjerciciosDia((prev) => ({
      ...prev,
      [lugarEjercicio]: infoEjercicio,
    }));
  }, [infoEjercicio]);

  const handleChangeForm = (e) => {
    const nombre = e.target.name;
    const value = e.target.value;
    setinfoEjercicio({ ...infoEjercicio, [nombre]: value });
  };
  return (
    <div class="input-group mb-4">
      <div class="input-group mb-3">
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
          maxLength={20}
          type="text"
          class="form-control"
          placeholder="Nombre ejercicio"
          name="nombre"
          onChange={handleChangeForm}
        />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span
            style={{ width: "100px" }}
            class="input-group-text"
            id="basic-addon1"
          >
            Descripción
          </span>
        </div>
        <input
          maxLength={100}
          type="text"
          class="form-control"
          placeholder="Ejecución"
          name="descripcion"
          onChange={handleChangeForm}
        />
      </div>
      <div className="row">
        <div className="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style={{ width: "100px" }}
                class="input-group-text"
                id="basic-addon1"
              >
                Repeticiones
              </span>
            </div>
            <input
              type="number"
              class="form-control"
              placeholder="Cantidad repeticiones"
              name="repeticiones"
              onChange={handleChangeForm}
            />
          </div>
        </div>
        <div className="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style={{ width: "100px" }}
                class="input-group-text"
                id="basic-addon1"
              >
                Series
              </span>
            </div>
            <input
              type="number"
              class="form-control"
              placeholder="Cantidad series"
              name="series"
              onChange={handleChangeForm}
            />
          </div>
        </div>
        <div className="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span
                style={{ width: "100px" }}
                class="input-group-text"
                id="basic-addon1"
              >
                Descanso
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="tiempo de descanso(seg)"
              name="descanso"
              onChange={handleChangeForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
