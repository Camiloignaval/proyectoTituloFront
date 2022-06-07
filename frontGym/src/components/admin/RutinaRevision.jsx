import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { proccessRoutine } from "../../actions/admin";

const dias = {
  1: "Lunes",
  2: "Martes",
  3: "Miercoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sabado",
  7: "Domingo",
};
export const RutinaRevision = ({ datos }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{datos?.creador}</td>
      <td>{dayjs(datos?.fecha_creacion).format("dddd DD MMMM YYYY")}</td>
      <td>{datos?.nombre}</td>
      <td>
        <button
          className="btn btn-info"
          data-toggle="modal"
          data-target={`#exampleModal${datos?.id_rutina}`}
        >
          Ver detalles
        </button>
        <div
          class="modal fade"
          id={`exampleModal${datos?.id_rutina}`}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4
                  style={{ color: "black" }}
                  class="modal-title"
                  id="exampleModalLabel"
                >
                  {datos?.nombre}
                </h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {datos?.ejercicios.map((ejercicio, i) => {
                  if (ejercicio.length > 0) {
                    return (
                      <div id="accordion" className="mb-4 ">
                        <button
                          class="btn btn-link"
                          data-toggle="collapse"
                          data-target={`#collapse${i}`}
                          aria-expanded="true"
                          aria-controls={`collapse${i}`}
                          style={{ color: "black", fontSize: "1.2rem" }}
                        >
                          {dias[i + 1]}
                        </button>
                        <div
                          id={`collapse${i}`}
                          class="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          {ejercicio.map((ejercicio) => (
                            <div
                              className="mb-1 p-2"
                              style={{
                                border: "1px solid rgba(128, 128, 128, 0.318)",
                                borderRadius: "5px",
                              }}
                            >
                              <div className="row ml-2">
                                <p className="col-2">
                                  <b>Ejercicio N°</b> {ejercicio?.num_orden}
                                </p>
                                <p className="col-2">
                                  <b>
                                    <i>{ejercicio?.nombre_ejercicio}</i>
                                  </b>
                                </p>
                                <p className="col-3">
                                  <b>Ingresado por:</b> {ejercicio?.nombre}
                                </p>
                                <p className="col">
                                  <b>Series:</b> {ejercicio?.series}
                                </p>
                                <p className="col">
                                  <b>Repeticiones:</b> {ejercicio?.repeticiones}
                                </p>
                                <p className="col">
                                  <b>Descanso:</b>{" "}
                                  {ejercicio?.descanso_segundos}
                                  s.
                                </p>
                              </div>
                              <p className="col ml-2">
                                <b>Ejecución:</b> {ejercicio?.descripcion}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <h5 className="mb-3 container" style={{ color: "black" }}>
                        {dias[i + 1]} día de descanso
                      </h5>
                    );
                  }
                })}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <button
          className="btn btn-success"
          onClick={() =>
            dispatch(
              proccessRoutine({ id: datos?.id_rutina, action: "aproved" })
            )
          }
        >
          Aprobar
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() =>
            dispatch(
              proccessRoutine({ id: datos?.id_rutina, action: "rejected" })
            )
          }
        >
          Rechazar
        </button>
      </td>
    </tr>
  );
};
