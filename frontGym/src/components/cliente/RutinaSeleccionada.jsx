import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startViewRoutines } from "../../actions/auth";
import { DetalleRutina } from "../ui/DetalleRutina";

export const RutinaSeleccionada = () => {
  const dispatch = useDispatch();
  const {
    rutinasDisponibles,
    info: { id_usuario, id_rutina },
  } = useSelector((state) => state.user);
  const [rutinaMostrar, setrutinaMostrar] = useState([]);
  useEffect(() => {
    console.log(id_rutina, { rutinasDisponibles });
    setrutinaMostrar(
      rutinasDisponibles.filter((rutina) => rutina?.id_rutina == id_rutina)
    );
  }, [rutinasDisponibles]);

  useEffect(() => {
    dispatch(startViewRoutines());
  }, []);

  return (
    <div>
      <h1 className="text-center pt-4">Mi rutina</h1>
      <div className="container">
        {rutinaMostrar.length > 0 ? (
          rutinaMostrar.map((rutina, i) => (
            <DetalleRutina key={i} rutina={rutina} isSelected />
          ))
        ) : (
          <h4 className="text-center mt-5">
            No cuenta con rutina activa, seleccionar una en 'Ver rutinas'
          </h4>
        )}
      </div>
    </div>
  );
};
