import React from 'react'
import { useSelector } from 'react-redux'

export const EstadoFinanciero = () => {
   const {info:{estado_financiero}}= useSelector(state=>state.user)
   console.log(estado_financiero);
  return (
        <div className='text-center container p-5'><h1 className=''>{estado_financiero?'hola':'chao'}</h1></div>
  )
}
