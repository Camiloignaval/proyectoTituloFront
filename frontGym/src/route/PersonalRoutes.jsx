import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardPersonal } from '../components/personal/DashboardPersonal'
import { Profile } from '../components/ui/Profile'

export const PersonalRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<DashboardPersonal />}>
        <Route path='perfil' element={<Profile />} />
      </Route>
    </Routes>
  )
}
