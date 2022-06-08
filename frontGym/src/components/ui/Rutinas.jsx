import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DetalleRutina } from "./DetalleRutina";

export const Rutinas = () => {
  const {
    rutinasDisponibles,
    info: { id_cargo, nivel_usuario, id_rutina },
  } = useSelector((state) => state.user);
  const [rutinaMostrar, setrutinaMostrar] = useState([]);
  useEffect(() => {
    if (id_cargo == 3) {
      console.log({ rutinasDisponibles }, nivel_usuario);
      setrutinaMostrar(
        rutinasDisponibles.filter(
          (rutina) =>
            rutina?.nivel <= nivel_usuario && rutina?.id_rutina != id_rutina
        )
      );
    } else {
      setrutinaMostrar(rutinasDisponibles);
    }
  }, [rutinasDisponibles, id_rutina]);

  return (
    <div>
      {rutinaMostrar.length > 0 &&
        rutinaMostrar.map((rutina, i) => (
          <DetalleRutina key={i} rutina={rutina} />
        ))}
    </div>
  );
};
