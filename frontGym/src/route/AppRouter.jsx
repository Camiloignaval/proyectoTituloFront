/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { startCheking } from '../actions/auth'
import { AdminRoutes } from './AdminRoutes'
import {
  PrivateRouteUser,
  PrivateRouteAdmin,
  PrivateRoutePersonal
} from './PrivateRoutes'
import { PublicRoute } from './PublicRoute'
import { WelcomeRoutes } from './WelcomeRoutes'
import { SpinnerDotted } from 'spinners-react'
import { UserRoutes } from './UserRoutes'
import { PersonalRoutes } from './PersonalRoutes'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const {
    checking,
    active,
    info: { id_cargo }
  } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(startCheking())
  }, [checking, dispatch])

  if (checking) {
    setTimeout(() => {
      <SpinnerDotted
        size={64}
        thickness={180}
        speed={97}
        color='rgba(170, 172, 57, 1)'
      />
    }, 5000)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/*'
            element={
              <PublicRoute auth={active} cargo={id_cargo}>
                <WelcomeRoutes />
              </PublicRoute>
}
          />
          <Route
            path='/user/*'
            element={
              <PrivateRouteUser auth={active} cargo={id_cargo}>
                <UserRoutes />
              </PrivateRouteUser>
}
          />
          <Route
            path='/admin/*'
            element={
              <PrivateRouteAdmin auth={active} cargo={id_cargo}>
                <AdminRoutes />
              </PrivateRouteAdmin>
}
          />
          <Route
            path='/personal/*'
            element={
              <PrivateRoutePersonal auth={active} cargo={id_cargo}>
                <PersonalRoutes />
              </PrivateRoutePersonal>
}
          />
 
        </Routes>
      </BrowserRouter>
    </>
  )
}
