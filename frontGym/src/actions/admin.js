/* eslint-disable camelcase */
import Swal from 'sweetalert2'
import { fetchConToken } from '../hooks/fetch'
import { types } from '../types/types'

export const startViewPending = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      'http://localhost:4000/api/admin/requests'
    )
    const data = await resp.json()
    dispatch(viewPending(data.datos))
  }
}

const viewPending = (datos) => ({
  type: types.viewRequest,
  payload: datos
})

export const startViewClients = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('http://localhost:4000/api/admin/user')
    const data = await resp.json()
    dispatch(viewClients(data.datos))
  }
}

const viewClients = (clients) => ({
  type: types.viewClients,
  payload: clients
})

export const startResponseRequest = (data) => {
  console.log(data)
  return async (dispatch) => {
    const resp = await fetchConToken(
      'http://localhost:4000/api/admin/requests',
      data,
      'PUT'
    )
    const body = await resp.json()
    if (body.ok) {
      if (data.accion === 'rechazar') {
        dispatch(rejectRequest(data.id_usuario))
      } else {
        dispatch(aceptRequest(data.id_usuario))
      }
      await Swal.fire('Listo!', body.msg, 'success')
    } else {
      Swal.fire('Error!', body.msg, 'error')
    }
  }
}

const rejectRequest = (datos) => ({
  type: types.rejectRequest,
  payload: datos
})
const aceptRequest = (datos) => ({
  type: types.aceptRequest,
  payload: datos
})

export const startToggleBlock = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      'http://localhost:4000/api/admin/block',
      datos,
      'PUT'
    )
    const body = await resp.json()
    if (body.ok) {
      if (datos.bloquear) {
        dispatch(blockUser(datos))
      } else {
        dispatch(unblockUser(datos))
      }
    } else {
      Swal.fire('Error!', body.msg, 'error')
    }
  }
}

const blockUser = (datos) => ({
  type: types.blockUser,
  payload: datos
})

const unblockUser = (datos) => ({
  type: types.unblockUser,
  payload: datos
})

// ingreso pago efectivo
export const startPagoPresencial = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      'http://localhost:4000/api/admin/pagopresencial',
      datos,
      'PUT')
    const body = await resp.json()
    if (body.ok) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pago ingresado con éxito',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire('Error!', body.msg, 'error')
      console.log('error')
    }
  }
  // traer solicitudes de pago
}
export const startPayRequest = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      'http://localhost:4000/api/admin/payrequest')
    const body = await resp.json()
    if (body.ok) {
      dispatch(listaPagos(body.datos))
    } else {
      Swal.fire('Error!', body.msg, 'error')
      console.log('error')
    }
  }
}

const listaPagos = (datos) => ({
  type: types.viewPayRequest,
  payload: datos
})

export const payValidation = (data) => {
  const { id_pago } = data
  return async (dispatch) => {
    const resp = await fetchConToken('http://localhost:4000/api/admin/validatePay', { idPago: id_pago }, 'PUT')
    const body = await resp.json()
    // console.log(body)
    if (body.ok) {
      dispatch(validatePay(id_pago))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: body.msg,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire('Error!', body.msg, 'error')
      console.log('error')
    }
  }
}

const validatePay = (datos) => ({
  type: types.validatePayRequest,
  payload: datos
})
