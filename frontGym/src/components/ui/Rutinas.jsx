import React from "react";
import { useSelector } from "react-redux";
import { DetalleRutina } from "./DetalleRutina";

export const Rutinas = () => {
  const { rutinasDisponibles } = useSelector((state) => state.user);
  return (
    <div>
      {rutinasDisponibles.length > 0 &&
        rutinasDisponibles.map((rutina, i) => (
          <DetalleRutina key={i} rutina={rutina} />
        ))}
    </div>
  );
};
