import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../ui/SideBar'

export const DashboardCliente = () => {
  const itemsSidebar = [
    { nombre: 'Perfil', to: 'perfil', icon: 'fas fa-address-card' },
    { nombre: 'Registrar pago', to: 'pago', icon: 'fas fa-dollar-sign' },
    { nombre: 'Mis finanzas', to: 'estado', icon: 'fas fa-dollar-sign' },
    { nombre: 'Mensajeria', to: 'message', icon: 'fas fa-envelope' }

  ]
  return (
    <div>
      <SideBar items={itemsSidebar} />
      <Outlet />
    </div>
  )
}
