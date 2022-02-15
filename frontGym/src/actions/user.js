import Swal from 'sweetalert2'
import { fetchConToken } from '../hooks/fetch'
import { types } from '../types/types'
// import { types } from '../types/types'

export const starttranserencia = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      'http://localhost:4000/api/user/pagoefectivo',
      datos,
      'POST'
    )
    const data = await resp.json()
    if (data.ok) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: data.msg,
        showConfirmButton: true,
        timer: 1500
      })
    }
  }
}

export const startBringPays= (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      `http://localhost:4000/api/user/pagos${id}`
    )
    const {ok,data:{pagos,estado}}= await resp.json()
    const {estado_financiero}=estado[0]
    dispatch(setEstado(estado_financiero))
    dispatch(setPagos(pagos))
  }
}

const setEstado = (estado)=> ({
  type: types.setEstadoFinanciero,
  payload: estado
})

const setPagos = (pagos)=> ({
  type: types.setPagos,
  payload: pagos
})