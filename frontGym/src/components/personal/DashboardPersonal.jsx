import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../ui/SideBar'

export const DashboardPersonal = () => {
  const itemsSidebar = [
    { nombre: 'Perfil', to: 'perfil', icon: 'fas fa-address-card' }
  ]
  return (
    <div>
      <SideBar items={itemsSidebar} />
      <Outlet />
    </div>
  )
}
