import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardCliente } from '../components/cliente/DashboardCliente'
import { EstadoFinanciero } from '../components/cliente/EstadoFinanciero'
import { RegistrarPago } from '../components/cliente/RegistrarPago'
import { Profile } from '../components/ui/Profile'

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<DashboardCliente />}>
        <Route path='perfil' element={<Profile />} />
        <Route path='pago' element={<RegistrarPago />} />
        <Route path='estado' element={<EstadoFinanciero />} />
        <Route path='*' element={<Navigate to='/user'/>}/>
      </Route>
      <Route path='*' element={<Navigate to='/user'/>}/>

    </Routes>
  )
}
