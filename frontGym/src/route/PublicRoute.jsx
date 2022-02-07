import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ children, auth, cargo }) => {
  if (!auth) {
    return children
  } else {
    if (cargo === 1) {
      return <Navigate to='/admin' />
    }
    if (cargo === 2) {
      return <Navigate to='/personal' />
    }
    if (cargo === 3) {
      return <Navigate to='/user' />
    }
  }
}
