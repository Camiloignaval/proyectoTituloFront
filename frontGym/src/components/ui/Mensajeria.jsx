import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';
import { fetchConToken } from '../../hooks/fetch';
import { sendMessage } from '../../actions/auth';


var grocerias = ["puta", "puto","marica","conchetumadre","ctm"]


export const Mensajeria = ({optionsDestinatary}) => {
  const [isMassive, setIsMassive] = useState(false)
  const { clientes } = useSelector((state) => state?.admin);
  const { info:{id_cargo,entrenador,id_usuario} } = useSelector((state) => state?.user);
  const [opctionsDestinataries, setOpctionsDestinataries] = useState([])
  const dispatch = useDispatch()
  const schema = yup
    .object({
      isMassive:yup.boolean(),
      message: yup
        .string()
        .required('Mensaje es requerido'),
      subject: yup
        .string()
        .required('Asunto es requerido')
       ,
       id_destinatario: yup
        .string()
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
useEffect(async() => {
  if(id_cargo===1){
    setOpctionsDestinataries(clientes.map(c=>({idUser:c?.id_usuario, nombre:`${c?.nombre} ${c?.apellido}`})));
  }
  if(id_cargo===3){
    // se ponda idUser 1 para identificar al admin
    if(entrenador!==null){
      setOpctionsDestinataries([{idUser:1,nombre:'Administración'},{idUser:entrenador,nombre:'Entrenador'}]);
    }else{
      setOpctionsDestinataries([{idUser:1,nombre:'Administración'}]);
    }
  }if(id_cargo===2){
    try {
      const data=await fetchConToken(`http://localhost:4000/api/personal/entrenados${id_usuario}`)
      const body=await data.json()
      setOpctionsDestinataries(body.map(b=>({idUser:b?.id_usuario,nombre:`${b?.nombre} ${b?.apellido}`})))
    } catch (error) {
      console.log('No se pudieron cargar clientes de entrenador');
    }
    
  }
}, [])


  const onSubmit=(data) => {
    const groceria=data.message.split(' ').filter(p=>grocerias.includes(p))
    if(groceria.length>0){
				Swal.fire("Atención", "Su mensaje incluye contenido no apropiado, favor borrar para continuar", "info");
    }else{
      if(data.id_destinatario!=='Escoja destinatario' || isMassive){
        // TODO enviar peticion
        dispatch(sendMessage({cargo:id_cargo,id_usuario,...data,isMassive}))
        document.querySelector('.errorDestinatario').innerHTML=''
      }else{
        document.querySelector('.errorDestinatario').innerHTML='Favor escoger destinatario'
      }
    }
  }
  return (
    <>
      {/* <Nav /> */}
      <div className='container pt-5 '>
        <div className='d-flex justify-content-center h-100' >
          <div className='card' style={{width:'800px'}}>
            <div className='card-header d-flex justify-content-between'>
              {!isMassive
                ?<h3>Enviar mensaje a un destinatario</h3>
                :<h3>Enviar mensaje masivo</h3>}
              <div className="btnMasivo ">
             {id_cargo !== 3 && <button onClick={()=>setIsMassive(!isMassive)} type='submit' className='btn massive_btn'>
                    {!isMassive?'Mensaje masivo':'Mensaje particular'}
                  </button>}
              </div>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* destinatario */}
                { !isMassive &&
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i class='fas fa-user-tag' />{' '}
                    </span>
                  </div>
                  <select
                    className='custom-select mr-sm-2 tipoUser'
                    id='inlineFormCustomSelect'
                    {...register('id_destinatario')}
                  >
                    <option value={null} selected>
                      Escoja destinatario
                    </option>
                    {/* opciones disponibles para usuario dependiendo tipo usuario */}
                    {opctionsDestinataries.map(o=> <option value={o?.idUser}>{o?.nombre}</option>)}
                  </select>
                  <p className='w-100 error errorDestinatario'>{errors.id_destinatario?.message}</p>
                </div>}
                {/* subject */}
                <div className='input-group form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Ingrese asunto'
                    {...register('subject')}
                  />
                  <p className='w-100 error'>{errors.subject?.message}</p>
                </div>
                {/* Mensaje */}
                <div className='input-group form-group'>
                  <textarea
                  style={{height:'200px'}}
                    className='form-control'
                    placeholder='Ingrese Mensaje a enviar'
                    {...register('message')}
                  />
                  <p className='w-100 error'>{errors.message?.message}</p>
                </div>
                <div className='form-group mt-5'>
                  <button type='submit' className='btn btn-block login_btn'>
                    Enviar mensaje
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
