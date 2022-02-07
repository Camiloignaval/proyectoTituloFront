/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startResponseRequest } from '../../actions/admin'

export const Solicitud = ({ solicitud }) => {
  const dispatch = useDispatch()
  const {
    id_usuario,
    nombre,
    apellido,
    rut,
    calle,
    fecha_nacimiento,
    id_cargo,
    nombre_comuna,
    num_direccion
  } = solicitud
  const handleAcept = () => {
    dispatch(startResponseRequest({ id_usuario, accion: 'aceptar', rut }))
  }

  const handleReject = () => {
    dispatch(startResponseRequest({ id_usuario, accion: 'rechazar', rut }))
  }
  return (
    <tr>
      <td>ejemplo</td>
      <td>
        {nombre} {apellido}
      </td>
      <td>{rut}</td>
      <td>{moment().diff(fecha_nacimiento, 'year')}</td>
      <td>{`${calle} ${num_direccion}, ${nombre_comuna}`}</td>
      <td>{id_cargo == 3 ? 'Cliente' : 'Entrenador'}</td>
      <td>
        <button
          onClick={handleAcept}
          type='button'
          className='btn btn-success m-1 w-100'
        >
          Aprobar
        </button>
      </td>
      <td>
        <button
          onClick={handleReject}
          type='button'
          className='btn btn-danger m-1 w-100'
        >
          Rechazar
        </button>
      </td>
    </tr>
  )
}
