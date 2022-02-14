import React from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { startPayRequest } from '../../actions/admin'

export const Finanzas = () => {
  const navigate = useNavigate()
  const usedispatch = useDispatch()

  usedispatch(startPayRequest())

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 mt-5'><button onClick={() => navigate('presencial')} type='button' className='btn btn-warning btn-lg btn-block'>Pago presencial</button>
        </div>
        <div className='col-6 mt-5'><button onClick={() => navigate('solpagos')} type='button' className='btn btn-warning btn-lg btn-block'>Solicitud pagos</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
