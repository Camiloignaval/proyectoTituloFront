/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRouteUser = ({ auth, children, cargo }) => {
  return auth && cargo === 3 ? children : <Navigate to='/' />
}

export const PrivateRouteAdmin = ({ auth, children, cargo }) => {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname !== '/admin') {
      localStorage.setItem('location', location.pathname)
    }
  }, [location.pathname])

  return auth && cargo === 1 ? children : <Navigate to='/' />
}

export const PrivateRoutePersonal = ({ auth, children, cargo }) => {
  return auth && cargo === 2 ? children : <Navigate to='/' />
}
