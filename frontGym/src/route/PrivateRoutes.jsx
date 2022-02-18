/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// rutas privadas de clientes
export const PrivateRouteUser = ({ auth, children, cargo }) => {
  const location = useLocation()
  const pathname=localStorage.getItem('location')
  // si cambia de ruta se setea nueva ruta
  useEffect(() => {
        localStorage.setItem('location', location.pathname)
  }, [location])
    // si no esta autenticado, se comprueba el pathname y si no existe se envia a '/'
  return auth && cargo === 3 ? children :(pathname?<Navigate to={pathname} />:<Navigate to='/'/>)
}

// rutas privadas de administrador
export const PrivateRouteAdmin = ({ auth, children, cargo }) => {
  const location = useLocation()
  const pathname=localStorage.getItem('location')
    // si cambia de ruta se setea nueva ruta
  useEffect(() => {
      localStorage.setItem('location', location.pathname)
  }, [location])
  // si no esta autenticado, se comprueba el pathname y si no existe se envia a '/'
  return auth && cargo === 1 ? children :(pathname?<Navigate to={pathname} />:<Navigate to='/'/>)
}

export const PrivateRoutePersonal = ({ auth, children, cargo }) => {
  return auth && cargo === 2 ? children : <Navigate to='/' />
}
