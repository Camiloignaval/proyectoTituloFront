import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { validateRUT } from 'validar-rut'
import { startPagoPresencial } from '../../actions/admin'

import '../../index.css'
import { useDispatch } from 'react-redux'

const schema = yup.object({
  monto: yup.number().typeError('Monto es requerido').min(1000, 'El minimo para pagar es $5000'),
  rut: yup.string().required('es requerido').test('Ingrese un rut válido', 'Ingrese un rut válido', function (value) {
    return !!((validateRUT(value)))
  })
}).required()

export const PagoPresencial = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const rut = useRef()

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    if (!data.rut) {
      document.querySelector('.rutt').innerHTML = 'Rut es requerido'
      console.log('no xiste rut')
    } else {
      data.rut = data.rut.replace(/[.-]/gm, '')
      dispatch(startPagoPresencial(data))
      reset()
    }
  }

  return (
    <form className='container mt-5' onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='form-group col-6'>
          <label htmlFor='formGroupExampleInput'>Rut</label>
          <input autoComplete='off' {...register('rut')} type='text' className='form-control' id='formGroupExampleInput' placeholder='Example input' />
          <p ref={rut} className='error rutt'>{errors.rut?.message}</p>
        </div>
        <div className='form-group col-6'>
          <label htmlFor='formGroupExampleInput2'>Monto recibido</label>
          <input {...register('monto')} type='number' className='form-control' id='formGroupExampleInput2' placeholder='Another input' />
          <p className='error'>{errors.monto?.message}</p>
        </div>
      </div>
      <div className='btnPagarPresencial ml-auto mt-4'>
        <button type='submit' className='btn btn-success w-100'>Ingresar pago</button>
      </div>
    </form>
  )
}
