/* eslint-disable react/jsx-indent */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormValidacionPago } from './FormValidacionPago'

export const SolicitudPagos = () => {
  const [solicitudesPago, setSolicitudesPago] = useState([])
  const [selectedPay, setSelectedPay] = useState('')
  const { payRequest } = useSelector(state => state.admin)

  useEffect(() => {
    setSolicitudesPago(payRequest)
  }, [payRequest])

  return (
    <>

      {payRequest.length > 0
        ? <>
          <h2 className='text-center mt-5'>Seleccione numero de operación a revisar</h2>
          <select onChange={(e) => setSelectedPay(payRequest.filter(p => p.id_pago == e.target.value))} defaultValue='default' className=' mb-5 custom-select mt-4'>
            <option disabled value='default'>Seleccione una opción</option>
            {solicitudesPago.map((s) =>
              <option key={s.id_pago} value={s.id_pago}>{s.num_operacion}</option>
            )}
          </select>

          {(selectedPay !== '') &&
            <FormValidacionPago pagoSeleccionado={selectedPay} setSolicitudes={setSolicitudesPago} />}
          </>
        : <h1 className='mt-5 text-center'>No existen solicitudes en este momento</h1>}
    </>
  )
}
