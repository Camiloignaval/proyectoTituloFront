/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import './profile.css'
import {
  cancelEdit,
  startBajaCuenta,
  startChangePass,
  startEditProfile,
  startUpdateProfile,
  startUploadImg
} from '../../actions/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormPass } from './FormPass'
export const Profile = () => {
  const dispatch = useDispatch()
  const {
    editMode,
    changePass,
    info: {
      id_usuario,
      nombre,
      apellido,
      email,
      fecha_nacimiento,
      foto,
      id_cargo,
      rut,
      telefono
    }
  } = useSelector((state) => state.user)
  const schema = yup.object({
    email: yup.string().email('Formato incorrecto (example@email.com)'),
    telefono: yup
      .string()
      .matches(
        /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$|(^$)/,
        'Formato incorrecto (+569xxxxxxxx)'
      )
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) => {
    if (data.foto != '' || data.telefono != '' || data.email != '') {
      data.id = id_usuario
      data.foto === '' && (data.foto = foto)
      data.telefono === '' && (data.telefono = telefono)
      data.email === '' && (data.email = email)

      dispatch(startUpdateProfile(data))
    } else {
      dispatch(cancelEdit())
    }
  }

  let cargo = ''
  if (id_cargo === 1) {
    cargo = 'Administrador'
  } else if (id_cargo === 3) {
    cargo = 'Cliente activo'
  } else {
    cargo = 'Entrenador personal'
  }

  const handleEdit = () => {
    dispatch(startEditProfile())
  }

  const uploadCloudinary = async () => {
    const url = await cloudinary.openUploadWidget(
      {
        cloudName: 'dc6vako2z',
        uploadPreset: 'vdrhajj8',
        sources: ['local', 'url', 'camera', 'image_search', 'google_drive'],
        googleApiKey: '<image_search_google_api_key>',
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        defaultSource: 'local',
        singleUploadAutoClose: false,
        styles: {
          palette: {
            window: '#000000',
            sourceBg: '#000000',
            windowBorder: 'white',
            tabIcon: '#ffc312',
            inactiveTabIcon: '#b88d0c',
            menuIcons: '#ffc312',
            link: '#ffc312',
            action: '#ffc312',
            inProgress: '#00BFFF',
            complete: '#33ff00',
            error: '#EA2727',
            textDark: '#000000',
            textLight: '#FFFFFF'
          },
          fonts: {
            default: null,
            "'Space Mono', monospace": {
              url: 'https://fonts.googleapis.com/css?family=Space+Mono',
              active: true
            }
          }
        }
      },
      (err, result) => {
        if (!err && result.event == 'success') {
          const {
            info: { url }
          } = result
          dispatch(startUploadImg({ url, id_usuario }))
          return url
        } else if (err) {
          Swal.fire(
            'oh oh',
            'Hemos tenido un problema, intenta mas tarde',
            'error'
          )
          return { ok: false }
        }
      }
    )
    return url
  }
  const handleUploadImg = () => {
    cloudinary.openUploadWidget(
      {
        cloudName: 'dc6vako2z',
        uploadPreset: 'vdrhajj8',
        sources: ['local', 'url', 'camera', 'image_search', 'google_drive'],
        googleApiKey: '<image_search_google_api_key>',
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        defaultSource: 'local',
        singleUploadAutoClose: false,
        styles: {
          palette: {
            window: '#000000',
            sourceBg: '#000000',
            windowBorder: 'white',
            tabIcon: '#ffc312',
            inactiveTabIcon: '#b88d0c',
            menuIcons: '#ffc312',
            link: '#ffc312',
            action: '#ffc312',
            inProgress: '#00BFFF',
            complete: '#33ff00',
            error: '#EA2727',
            textDark: '#000000',
            textLight: '#FFFFFF'
          },
          frame: {
            background: '#45454580'
          },
          fonts: {
            default: null,
            "'Space Mono', monospace": {
              url: 'https://fonts.googleapis.com/css?family=Space+Mono',
              active: true
            }
          }
        }
      },
      (err, result) => {
        if (!err && result.event == 'success') {
          const {
            info: { url }
          } = result
          dispatch(startUploadImg({ url, id_usuario }))
        } else if (err) {
          Swal.fire(
            'oh oh',
            'Hemos tenido un problema, intenta mas tarde',
            'error'
          )
        }
      }
    )
  }

  const handleCancel = () => {
    dispatch(cancelEdit())
  }

  const handleChangePass = async () => {
    dispatch(startChangePass())
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, darme de baja!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startBajaCuenta({ id_usuario }))
        navigate('/')
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='profile'>
          <div className='row head'>
            <div className='col-9 profile-head'>
              <h5>
                {nombre} {apellido}
              </h5>
              <h6>{cargo}</h6>
            </div>
            {editMode && (
              <div className='col-3'>
                <button onClick={handleCancel} className='btn  btn-danger'>
                  Cancelar
                </button>
              </div>
            )}
          </div>
          <ul className='nav nav-tabs' id='myTab' role='tablist' />
          <br />
          <div className='row'>
            <div className='col-4'>
              <div className='profile-img'>
                <img src={foto} alt='' />
                {editMode && (
                  <div className='file btn btn-lg btn-primary'>
                    Cambiar foto
                    <input
                      className='clickFoto'
                      onClick={handleUploadImg}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className='col-md-8'>
              <div className='tab-content profile-tab' id='myTabContent'>
                <div
                  className='tab-pane fade show active'
                  id='home'
                  role='tabpanel'
                  aria-labelledby='home-tab'
                >
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>Nombre</label>
                    </div>
                    <div className='col-md-6'>
                      <p>
                        {nombre} {apellido}
                      </p>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6'>
                      <label>Fecha nacimiento</label>
                    </div>
                    <div className='col-md-6'>
                      <p>
                        {moment(fecha_nacimiento).locale('es').format('LL')}
                      </p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>Rut</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{rut}</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>Teléfono</label>
                    </div>
                    <div className='col-md-6'>
                      {editMode
                        ? (
                          <div>
                            <input
                              placeholder={telefono}
                              {...register('telefono')}
                            />
                            <p className='w-100 error'>
                              {errors.telefono?.message}
                            </p>
                          </div>
                          )
                        : (
                          <p>{telefono}</p>
                          )}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>Email</label>
                    </div>
                    <div className='col-md-6'>
                      {editMode
                        ? (
                          <div>
                            <input {...register('email')} placeholder={email} />
                            <p className='w-100 error'>{errors.email?.message}</p>
                          </div>
                          )
                        : (
                          <p>{email}</p>
                          )}
                    </div>
                    <div className='col-md-6 mt-3'>
                      {!changePass && (
                        <button
                          type='button'
                          onClick={handleChangePass}
                          className='btn btn-danger'
                          data-toggle='modal'
                          data-target='#exampleModal'
                        >
                          Cambiar contraseña
                        </button>
                      )}
                    </div>
                    <div className='col-md-6 mt-3 d-flex'>
                      {editMode
                        ? (
                          <div>
                            <button type='submit' className='btn btn-success'>
                              Guardar cambios
                            </button>
                          </div>
                          )
                        : (
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={handleEdit}
                          >
                            Modificar datos
                          </button>
                          )}
                      {id_cargo !== 1 && (
                        <button
                          type='button'
                          onClick={handleDelete}
                          className='ml-2 btn btn-danger'
                        >
                          Darse de baja
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {changePass && (
        <div className=' mt-4 row mr-5 mr-xl-5'>
          <div className='col-2 col-md-5' />
          <div className='col-7 col-md-7 col-lg-4'>
            <FormPass />
          </div>
        </div>
      )}
      {/* <DarDeBaja /> */}
    </div>
  )
}
