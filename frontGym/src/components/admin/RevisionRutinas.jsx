import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRoutinesRequest } from "../../actions/admin";
import { TablaEjerciciosRevisionRutina } from "./TablaEjerciciosRevisionRutina";

export const RevisionRutinas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoutinesRequest());
  }, []);

  return (
    <div className="container pt-5">
      <h1 className="text-center">Revisión rutinas</h1>
      <TablaEjerciciosRevisionRutina />
    </div>
  );
};
