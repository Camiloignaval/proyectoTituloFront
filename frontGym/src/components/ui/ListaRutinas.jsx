import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startViewRoutines } from "../../actions/auth";
import { Rutinas } from "./Rutinas";

export const ListaRutinas = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startViewRoutines());
  }, []);

  return (
    <div className="container pt-4">
      <h1 className="text-center">Rutinas</h1>
      <Rutinas />
    </div>
  );
};
