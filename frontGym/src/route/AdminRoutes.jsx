import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardAdmin } from '../components/admin/DashboardAdmin'
import { Finanzas } from '../components/admin/Finanzas'
import { PagoPresencial } from '../components/admin/PagoPresencial'
import { TablaInfo } from '../components/admin/TablaInfo'
import { Profile } from '../components/ui/Profile'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<DashboardAdmin />}>
        <Route path='perfil' element={<Profile />} />
        <Route
          path='/solicitudes'
          element={<TablaInfo necesarios='solicitudes' />}
        />
        <Route path='clientes' element={<TablaInfo necesarios='clientes' />} />
        <Route path='finanzas' element={<Finanzas />}>
          <Route path='presencial' element={<PagoPresencial />} />
        </Route>
      </Route>
    </Routes>
  )
}
