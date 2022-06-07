import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardAdmin } from "../components/admin/DashboardAdmin";
import { Finanzas } from "../components/admin/Finanzas";
import { Mensajeria } from "../components/ui/Mensajeria";
import { PagoPresencial } from "../components/admin/PagoPresencial";
import { SolicitudPagos } from "../components/admin/SolicitudPagos";
import { TablaInfo } from "../components/admin/TablaInfo";
import { Profile } from "../components/ui/Profile";
import { Horarios } from "../components/admin/Horarios";
import { ViewReserves } from "../components/admin/ViewReserves";
import { RevisionRutinas } from "../components/admin/RevisionRutinas";
import { ListaRutinas } from "../components/ui/ListaRutinas";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<DashboardAdmin />}>
        <Route path="perfil" element={<Profile />} />
        <Route
          path="/solicitudes"
          element={<TablaInfo necesarios="solicitudes" />}
        />
        <Route path="clientes" element={<TablaInfo necesarios="clientes" />} />
        <Route path="message" element={<Mensajeria />} />
        <Route path="schedules" element={<Horarios />} />
        <Route path="reserves" element={<ViewReserves />} />
        <Route path="routines" element={<RevisionRutinas />} />
        <Route path="routs" element={<ListaRutinas />} />
        <Route path="finanzas" element={<Finanzas />}>
          <Route path="presencial" element={<PagoPresencial />} />
          <Route path="solpagos" element={<SolicitudPagos />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Route>
    </Routes>
  );
};
