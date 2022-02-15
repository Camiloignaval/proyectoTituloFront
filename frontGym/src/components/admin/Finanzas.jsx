import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { emailAtrasados, startPayRequest } from '../../actions/admin'

export const Finanzas = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(startPayRequest())

}, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col mt-5'><button onClick={() => navigate('presencial')} type='button' className='btn btn-warning btn-lg btn-block'>Pago presencial</button>
        </div>
        <div className='col mt-5'><button onClick={() => navigate('solpagos')} type='button' className='btn btn-warning btn-lg btn-block'>Solicitud pagos</button>
        </div>
        <div className='col mt-5'><button onClick={()=>dispatch(emailAtrasados())} type='button' className='btn btn-warning btn-lg btn-block'>Recordatorio de pago</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
