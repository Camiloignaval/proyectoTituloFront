/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { bancos } from '../../Bancos/bancos'
import { starttranserencia } from '../../actions/user'

export const RegistrarPago = () => {
  const arrayBancos = bancos
  const dispatch = useDispatch()
  const schema = yup
    .object({
      banco: yup
        .string()
        .required('Banco es requerido'),
      cuenta: yup
        .string()
        .required('Numero de cuenta es requerida'),
      numop: yup
        .string()
        .required('Numero de operación es requerida'),
      monto: yup
        .number().typeError('Monto es requerido')
        .required('Monto es requerido').min(1000, 'El minimo de pago es $1000')

    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { info: { id_usuario } } = useSelector(state => state.user)
  // al enviar formulario de registro
  const onSubmit = (data) => {
    data.idUsuario = id_usuario
    dispatch(starttranserencia(data))
  }

  return (
    <>
      {/* <Nav /> */}
      <div className='container pt-5'>
        <div className='d-flex justify-content-center h-100'>
          <div className='card'>
            <div className='card-header'>
              <h3>Registro de pago</h3>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* bancos */}
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-university' />
                    </span>
                  </div>
                  <select
                    className='custom-select mr-sm-2 tipoUser'
                    id='inlineFormCustomSelect'
                    defaultValue=''
                    {...register('banco')}
                  >
                    <option defaultValue='' value='' selected>
                      Banco de origen
                    </option>
                    {
                      arrayBancos.map((b) => <option key={b} value={b}>{b}</option>)

                      }
                  </select>
                  <p className='w-100 error'>{errors.banco?.message}</p>
                </div>
                {/* cuenta */}
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-sort-numeric-up-alt' />
                    </span>
                  </div>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Numero de cuenta'
                    {...register('cuenta')}
                  />
                  <p className='w-100 error'>{errors.cuenta?.message}</p>
                </div>
                {/* Numero operacion */}
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-sort-numeric-up-alt' />
                    </span>
                  </div>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Numero operación'
                    {...register('numop')}
                  />
                  <p className='w-100 error'>{errors.numop?.message}</p>
                </div>
                {/* monto */}
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-dollar-sign' />
                    </span>
                  </div>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Monto'
                    {...register('monto')}
                  />
                  <p className='w-100 error'>{errors.monto?.message}</p>
                </div>
                <div className='form-group mt-5'>
                  <button type='submit' className='btn btn-block login_btn'>
                    Ingresar Pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
