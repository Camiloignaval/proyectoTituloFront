import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardCliente } from "../components/cliente/DashboardCliente";
import { EstadoFinanciero } from "../components/cliente/EstadoFinanciero";
import { RegistrarPago } from "../components/cliente/RegistrarPago";
import { Reservas } from "../components/cliente/Reservas";
import { ListaRutinas } from "../components/ui/ListaRutinas";
import { Mensajeria } from "../components/ui/Mensajeria";
import { Profile } from "../components/ui/Profile";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<DashboardCliente />}>
        <Route path="perfil" element={<Profile />} />
        <Route path="message" element={<Mensajeria />} />
        <Route path="pago" element={<RegistrarPago />} />
        <Route path="estado" element={<EstadoFinanciero />} />
        <Route path="reservas" element={<Reservas />} />
        <Route path="routs" element={<ListaRutinas />} />
        <Route path="*" element={<Navigate to="/user" />} />
      </Route>
      <Route path="*" element={<Navigate to="/user" />} />
    </Routes>
  );
};
