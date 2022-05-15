import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { validateRUT } from "validar-rut";
import { consultAssistance } from "../../actions/admin";

export const RegistrarAsistencia = () => {
  const dispatch = useDispatch();
  const [rut, setRut] = useState("");
  const [isValid, setisValid] = useState(true);

  const handleConsultar = () => {
    const esValido = validateRUT(rut);
    if (esValido) {
      setisValid(true);
      const res = dispatch(consultAssistance(rut));
      console.log(res);
    } else {
      setisValid(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#modalHoras"
        classNameName="btn login_btn"
      >
        RegistrarAsistencia
      </button>
      <div
        className="modal fade"
        id="modalHoras"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                style={{ color: "black" }}
                className="modal-title"
                id="exampleModalLabel"
              >
                Registro de reservas
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="advert w-100 ml-4">
              <h8 className="text-black-50">
                **Ingrese rut sin puntos ni guion
              </h8>
            </div>
            <div className="modal-body mb-0 pb-0">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ width: "100px" }}
                    id="inputGroup-sizing-default"
                  >
                    Ingrese rut
                  </span>
                </div>

                <input
                  type="number"
                  className="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
              </div>
              <p
                className={
                  isValid
                    ? "text-right advRut mr-4 d-none"
                    : "text-right advRut mr-4"
                }
                style={{ color: "red", fontStyle: "italic" }}
              >
                Rut es inválido
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                disabled={rut === ""}
                type="button"
                className="btn btn-primary"
                onClick={handleConsultar}
              >
                Consultar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
