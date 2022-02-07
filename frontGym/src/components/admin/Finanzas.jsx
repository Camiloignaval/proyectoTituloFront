import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const Finanzas = () => {
  const navigate = useNavigate()

  const handleClickPresencial = (e) => {
    navigate('presencial')
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 mt-5'><button onClick={handleClickPresencial} type='button' className='btn btn-warning btn-lg btn-block'>Pago presencial</button>
        </div>
        <div className='col-6 mt-5'><button type='button' className='btn btn-warning btn-lg btn-block'>blablabla</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
