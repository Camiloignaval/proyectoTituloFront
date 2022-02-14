/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { payValidation } from '../../actions/admin'
import moment from 'moment'
import Swal from 'sweetalert2'

const schema = yup
  .object({
    monto: yup
      .string()
      .required('Monto es requerido'),

    cuenta: yup
      .string()
      .required('Cuenta es requerida'),
    fecha: yup
      .string()
      .required('Fecha es requerido')
  })
  .required()

export const FormValidacionPago = ({ pagoSeleccionado, setSolicitudes }) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit, reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    const { id_pago, monto: mont, num_cuenta_origen, fecha_pago } = pagoSeleccionado[0]
    if ((mont == data.monto && num_cuenta_origen == data.cuenta && moment(fecha_pago).format('l') === moment(data.fecha).format('l'))) {
      dispatch(payValidation({ ...data, id_pago }))
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Datos no coinciden',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  useEffect(() => {
    reset()
  }, [pagoSeleccionado])

  return (
  // <div className='container'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='col-4'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='w-100 input-group-text' id='basic-addon3'>Monto</span>
            </div>
            <input {...register('monto')} type='number' className='form-control' placeholder='Monto recibido' aria-label='monto' aria-describedby='basic-addon3' />
            <p className='w-100 error  text-right'>{errors.monto?.message}</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='w-100 input-group-text' id='basic-addon3'>Num. Cuenta</span>
            </div>
            <input {...register('cuenta')} type='number' className='form-control' placeholder='Cuenta origen' aria-label='monto' aria-describedby='basic-addon3' />
            <p className='w-100 error text-right'>{errors.cuenta?.message}</p>
          </div>
        </div>
        <div className='col-4'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='w-100 input-group-text' id='basic-addon3'>Fecha</span>
            </div>
            <input {...register('fecha')} type='date' className='form-control' aria-label='monto' aria-describedby='basic-addon3' />
            <p className='w-100  text-right error'>{errors.fecha?.message}</p>
          </div>
        </div>
      </div>
      <div className=' mt-5 d-flex justify-content-end'>
        <button type='submit' className='btn btn-success w-25'>Revisar</button>
      </div>
    </form>
  // </div>

  )
}
