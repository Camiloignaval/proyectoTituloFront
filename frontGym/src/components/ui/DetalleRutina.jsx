import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRoutine,
  deleteRoutineRequest,
  selectRoutine,
} from "../../actions/auth";

const dias = {
  1: "Lunes",
  2: "Martes",
  3: "Miercoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sabado",
  7: "Domingo",
};

const arrayNivel = { 1: "Principiante", 2: "Intermedio", 3: "Avanzado" };
export const DetalleRutina = ({ rutina, isSelected = false }) => {
  const {
    info: { id_cargo, id_usuario },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleRequestDelete = () => {
    dispatch(
      deleteRoutineRequest({
        id_rutina: rutina?.id_rutina,
        id_entrenador: id_usuario,
      })
    );
  };

  const handleDeleteRoutine = () => {
    dispatch(
      deleteRoutine({
        id_rutina: rutina?.id_rutina,
        id_solicitud: rutina?.id_solicitud,
      })
    );
  };

  const handleSelectActiveRutine = () => {
    console.log({
      id_rutina: rutina?.id_rutina,
      id_usuario: id_usuario,
    });
    dispatch(
      selectRoutine({
        id_rutina: rutina?.id_rutina,
        id_usuario: id_usuario,
      })
    );
  };
  return (
    <div>
      {rutina?.ejercicios?.length > 0 &&
        rutina.ejercicios.map((ejercicio, i) => {
          if (ejercicio.length > 0) {
            return (
              <>
                <div id="accordion">
                  {i == 0 && (
                    <>
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target={`#collapse${rutina?.id_rutina}`}
                        aria-expanded="true"
                        aria-controls={`collapse${rutina?.id_rutina}`}
                        style={{ color: "white", fontSize: "1.5rem" }}
                      >
                        {rutina?.nombre} Nivel {arrayNivel[rutina?.nivel]}
                      </button>
                      {!isSelected &&
                        id_cargo === 1 &&
                        rutina?.fechaSolEliminacion !== null && (
                          <button
                            onClick={handleDeleteRoutine}
                            className="btn btn-danger float-right"
                          >
                            Eliminar rutina
                          </button>
                        )}
                      {!isSelected &&
                        id_cargo === 2 &&
                        (rutina?.fechaSolEliminacion === null ||
                        rutina?.resolucion === false ? (
                          <button
                            onClick={handleRequestDelete}
                            className="btn btn-danger float-right"
                          >
                            Solicitar eliminación
                          </button>
                        ) : (
                          <button disabled className="btn btn-info float-right">
                            Solicitud de eliminación en proceso
                          </button>
                        ))}
                      {!isSelected && id_cargo === 3 && (
                        <button
                          onClick={handleSelectActiveRutine}
                          className="btn btn-success float-right"
                        >
                          Seleccionar como rutina activa
                        </button>
                      )}
                    </>
                  )}
                  <div
                    className="bodyAcordionExterno collapse show"
                    id={`collapse${rutina?.id_rutina}`}
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <h5 className="ml-4 mt-4">{dias[i + 1]}</h5>
                    <div>
                      {ejercicio.map((ejercicio) => (
                        <div
                          className="mb-1 p-2 contenedorEjercicios"
                          style={{
                            border: "1px solid rgba(128, 128, 128, 0.318)",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="row ml-2 mt-2">
                            <p className="col-2">
                              <b>Ejercicio N°</b> {ejercicio?.num_orden}
                            </p>
                            <p className="col-4">
                              <b>
                                <i>{ejercicio?.nombre_ejercicio}</i>
                              </b>
                            </p>

                            <p className="col-2">
                              <b>Series:</b> {ejercicio?.series}
                            </p>
                            <p className="col-2">
                              <b>Repeticiones:</b> {ejercicio?.repeticiones}
                            </p>
                            <p className="col-2">
                              <b>Descanso:</b> {ejercicio?.descanso_segundos}
                              s.
                            </p>
                          </div>
                          <p className="ml-2">
                            <b>Ejecución:</b> {ejercicio?.descripcion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <div
                id={`collapse${rutina?.id_rutina}`}
                aria-labelledby="headingOne"
                data-parent="#accordion"
                className=" collapse show "
              >
                <h5 className="ml-4 mt-4"> {dias[i + 1]}</h5>
                <div className="bodyAcordionExterno contenedorEjercicios">
                  <h5
                    className="container text-center"
                    style={{ color: "white" }}
                  >
                    Descanso
                  </h5>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};
