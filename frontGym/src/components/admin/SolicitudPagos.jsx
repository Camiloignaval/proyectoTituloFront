/* eslint-disable react/jsx-indent */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormValidacionPago } from './FormValidacionPago'
import { useForm } from "react-hook-form";

export const SolicitudPagos = () => {
  const [solicitudesPago, setSolicitudesPago] = useState([])
  const [selectedPay, setSelectedPay] = useState([])
  const { payRequest } = useSelector(state => state.admin)

  const { register, handleSubmit,reset } = useForm();
  const onSubmit = data => {
    //   console.log(selectedPay);
    };

  useEffect(() => {
    setSolicitudesPago(payRequest)
  }, [payRequest])

  return (
    <>

      {payRequest.length > 0
        ? <>
          <h2 className='text-center mt-5'>Seleccione numero de operación a revisar</h2>
          <form  onChange={handleSubmit(onSubmit)} >
          <select {...register("pago")} onChange={(e) => setSelectedPay(payRequest.filter(p => p.id_pago == e.target.value))} defaultValue='default' className=' mb-5 custom-select mt-4'>
            <option value='' >Seleccione una opción</option>
            {solicitudesPago.map((s) =>
              <option key={s.id_pago} value={s.id_pago}>{s.num_operacion}</option>
            )}
          </select>
          </form>
          {(selectedPay.length>0) &&
            <FormValidacionPago pagoSeleccionado={selectedPay} resetSelect={reset} setSelectedPay={setSelectedPay}/>}
          </>
        : <h1 className='mt-5 text-center'>No existen solicitudes en este momento</h1>}
    </>
  )
}
