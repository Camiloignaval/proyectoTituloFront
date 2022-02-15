import moment from 'moment'
import React from 'react'

moment.locale('es');         // en


export const TablaPagos = ({pagos}) => {
  return (
      <>
      <h2 className='text-center mb-4'>Historial de pagos</h2>


      
    <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Fecha</th>
      <th scope="col">Monto</th>
      <th scope="col">Medio de pago</th>
      <th scope="col">Estado</th>
    </tr>
  </thead>
  <tbody>
   {pagos.map(p=>( <tr key={p.id_pago}>
      <td>{moment(p.fecha_pago).format('Do MMMM YYYY')}</td>
      <td>$ {p.monto}</td>
      <td>{p.medio_pago}</td>
      <td>{p.pago_aprobado? <p style={{color:'green'}}>Aprobado</p>: <p style={{color:'red'}}>Pendiente</p> }</td>
    </tr>))}
  </tbody>
</table>
</>
  )
}
