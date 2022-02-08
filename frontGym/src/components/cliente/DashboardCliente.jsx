import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../ui/SideBar'

export const DashboardCliente = () => {
  const itemsSidebar = [
    { nombre: 'Perfil', to: 'perfil', icon: 'fas fa-address-card' },
    { nombre: 'Registrar pago', to: 'pago', icon: 'fas fa-dollar-sign' }
  ]
  return (
    <div>
      <SideBar items={itemsSidebar} />
      <Outlet />
    </div>
  )
}
