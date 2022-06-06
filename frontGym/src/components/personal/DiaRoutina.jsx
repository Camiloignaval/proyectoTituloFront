import React, { useEffect, useState } from "react";
import { alertSwal } from "../../helpers/swal";
import { Ejercicio } from "./Ejercicio";

export const DiaRoutina = ({
  dia,
  lugar,
  setinfoRoutine,
  infoRoutine,
  reset,
}) => {
  const [count, setCount] = useState([]);
  const [ejerciciosDia, setEjerciciosDia] = useState({});
  const [isPossibleAddExercise, setisPossibleAddExercise] = useState(true);

  useEffect(() => {
    const isMoreThan1Register = Object.keys(ejerciciosDia).length >= 1;
    if (isMoreThan1Register) {
      const existInputsUndefined = Object.values(
        Object.values(ejerciciosDia)[Object.values(ejerciciosDia)?.length - 1]
      ).some((e) => e === undefined);
      setisPossibleAddExercise(!existInputsUndefined);
    } else {
      setisPossibleAddExercise(true);
    }
  }, [ejerciciosDia]);

  useEffect(() => {
    if (reset === true) {
      setEjerciciosDia({});
      setCount([]);
    }
  }, [reset]);

  const handleDeleteExercise = () => {
    const numero = count.length;
    const provisoreCount = [...count];
    provisoreCount.pop();
    console.log(provisoreCount);
    setCount(provisoreCount);

    // borrar de ejerciciosDia
    const provisoreEjerciciosDia = { ...ejerciciosDia };
    delete provisoreEjerciciosDia[numero];
    setEjerciciosDia(provisoreEjerciciosDia);

    // borrar de infoPrincipal
    const provisoreInfoRoutine = { ...infoRoutine };
    delete provisoreInfoRoutine[`${lugar + 1}-${numero}`];
    setinfoRoutine(provisoreInfoRoutine);
  };

  return (
    <div>
      <div className="tituloDia row">
        <h3 className="col-2">{dia}</h3>
        <button
          onClick={() =>
            isPossibleAddExercise
              ? setCount([...count, count.length + 1])
              : alertSwal(
                  false,
                  "No pude agregar nuevo ejercicio en este dia sin haber rellenado todos sus campos",
                  3000
                )
          }
          style={{ height: "40px", borderRadius: "8px" }}
          className={
            isPossibleAddExercise ? "massive_btn mb-3" : "massive_btnDis mb-3"
          }
        >
          Agregar Ejercicio <i className="fas fa-plus-circle"></i>
        </button>
        {count.length > 0 && (
          <button
            onClick={handleDeleteExercise}
            className="btn btn-danger ml-3"
            style={{ height: "40px", borderRadius: "8px" }}
          >
            Eliminar ejercicio
          </button>
        )}
        {count.map((c, i) => (
          <Ejercicio
            key={i}
            dia={dia}
            lugarDia={lugar + 1}
            lugarEjercicio={i + 1}
            setinfoRoutine={setinfoRoutine}
            setEjerciciosDia={setEjerciciosDia}
          />
        ))}
      </div>
    </div>
  );
};
