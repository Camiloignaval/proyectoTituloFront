import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardPersonal } from "../components/personal/DashboardPersonal";
import { Routine } from "../components/personal/Routine";
import { Mensajeria } from "../components/ui/Mensajeria";
import { Profile } from "../components/ui/Profile";

export const PersonalRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<DashboardPersonal />}>
        <Route path="perfil" element={<Profile />} />
        <Route path="message" element={<Mensajeria />} />
        <Route path="routine" element={<Routine />} />
      </Route>
    </Routes>
  );
};
