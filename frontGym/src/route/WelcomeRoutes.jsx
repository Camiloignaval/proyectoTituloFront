import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardAuth } from '../components/auth/DashboardAuth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { WelcomeScreen } from '../components/auth/WelcomeScreen'

export const WelcomeRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<DashboardAuth />}>
        <Route path='' element={<WelcomeScreen />} />
        <Route path='login' element={<LoginScreen />} />
        <Route path='register' element={<RegisterScreen />} />
      </Route>
    </Routes>
  )
}
