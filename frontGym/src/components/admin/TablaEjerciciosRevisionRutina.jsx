import React from "react";
import { useSelector } from "react-redux";
import { RutinaRevision } from "./RutinaRevision";

export const TablaEjerciciosRevisionRutina = () => {
  const { routinesRequest } = useSelector((state) => state.admin);

  console.log(routinesRequest);
  return (
    <table className="table table-striped table-dark tabla">
      <thead>
        <tr>
          <th scope="col">Entrenador</th>
          <th scope="col">Fecha Solicitud</th>
          <th scope="col">Nombre rutina</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {routinesRequest.map((routine) => (
          <RutinaRevision key={routine?.id_rutina} datos={routine} />
        ))}
      </tbody>
    </table>
  );
};
