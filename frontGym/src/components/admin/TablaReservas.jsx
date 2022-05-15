import React from "react";

export const TablaReservas = ({ horarios }) => {
  return (
    <table className="table table-striped table-dark tabla">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Hora</th>
          <th scope="col">Asiste</th>
        </tr>
      </thead>
      <tbody>
        {horarios.map((h) => (
          <tr>
            <td>
              {h?.nombre} {h?.apellido}
            </td>
            <td>{h?.hora.slice(0, 5)}</td>
            <td>{h?.asiste ? "Si" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
