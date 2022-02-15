import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { startBringPays } from '../../actions/user'
import { TablaPagos } from './TablaPagos'

export const EstadoFinanciero = () => {
   const dispatch= useDispatch()
   const {info:{estado_financiero,id_usuario},pagos}= useSelector(state=>state.user)

   useEffect(() => {
     dispatch(startBringPays(id_usuario))
   }, [])
   
  return (
        <div className='text-center container p-5'>
              <div className="row mb-5">
                    <div className="col-6"><h1>Mi estado financiero:</h1></div>
                    {estado_financiero
                    ?<div className="col-6"><h1 style={{color:'green'}}>Al dia <i className="fas fa-check-circle"></i></h1></div>
                    :<div className="col-6"><h1 style={{color:'red'}}>Atrasado <i className="fas fa-times-circle"></i></h1></div>}
              </div>
              <TablaPagos pagos={pagos}/>
        </div>
  )
}
