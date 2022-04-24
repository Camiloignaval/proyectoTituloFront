import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import { startViewClients, startViewPending } from '../../actions/admin'
import { SideBar } from '../ui/SideBar'

export const DashboardAdmin = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startViewPending())
    dispatch(startViewClients())
  }, [])

  // listaParaSidebar
  const itemsSidebar = [
    { nombre: 'Perfil', to: 'perfil', icon: 'fas fa-address-card' },
    { nombre: 'Clientes', to: 'clientes', icon: 'fas fa-users' },
    { nombre: 'Solicitudes', to: 'solicitudes', icon: 'fas fa-bell' },
    { nombre: 'Finanzas', to: 'finanzas', icon: 'fas fa-dollar-sign' },
    { nombre: 'Mensajeria', to: 'message', icon: 'fas fa-envelope' }
  ]

  return (
    <div>
      <SideBar items={itemsSidebar} />
      <Outlet />
    </div>
  )
}
