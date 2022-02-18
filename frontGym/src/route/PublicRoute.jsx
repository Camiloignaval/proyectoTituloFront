import React from 'react'
import { useState,useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const PublicRoute = ({ children, auth, cargo }) => {
  const [pathName, setPathName] = useState('')
  const location=useLocation()
  // ver si ruta es publica o no
  const esPublica=['/','/login','/register'].includes(location.pathname)
 useEffect(() => {
  if(auth){
    const pathAnterior=localStorage.getItem('location')
    // siesque existe algun path anterior en localstorage
    if (pathAnterior) {
      // siesque existe se setea el anterior
      if(cargo===1){
        if(pathAnterior){
          setPathName(pathAnterior)
          localStorage.setItem('location',pathAnterior)
        }
      }
      if(cargo===3){
        if(pathAnterior){
        setPathName(pathAnterior)
        localStorage.setItem('location',pathAnterior)
      }
    }
  }else{
    // si no existe se crea uno segun el cargo
   if(cargo===1){
     setPathName('/admin')
   } if(cargo===3){
    setPathName('/user')
  }
  }

}
 }, [auth])

//  siesque la ruta no es publica ni esta logeado se devuelve a '/'
 if(!esPublica && !auth){
  return <Navigate to='/'/>
}
// si no esta logeado
  if (!auth) {
    return children
  // si esta logeado se devuelve al path anterior (quizo volver al login por ej)
  } else {
    if (cargo === 1) {
      return <Navigate to={pathName}/>
    }
    if (cargo === 2) {
      return <Navigate to={pathName} />
    }if (cargo === 3) {
      return <Navigate to={pathName} />
    }
  }
}
