import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardCliente } from '../components/cliente/DashboardCliente'
import { RegistrarPago } from '../components/cliente/RegistrarPago'
import { Profile } from '../components/ui/Profile'

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<DashboardCliente />}>
        <Route path='perfil' element={<Profile />} />
        <Route path='pago' element={<RegistrarPago />} />
      </Route>
    </Routes>
  )
}
