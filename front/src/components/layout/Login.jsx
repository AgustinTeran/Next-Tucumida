"use client"
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import TextInput from "../forms/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { validateAtLeastLength, validateEmail, validateStringNotEmpty } from "../../utils/validaciones";
import authActions from "../../redux/auth/actions"
import { notify } from "../../config/notify";


export default function Login({setModal}){
  var dispatch = useDispatch()
  function onSub(values,functions){
    if(values.email && values.contraseña) dispatch(authActions.post(values));
  }
  
  var auth = useSelector(state => state.auth)
  var [isTheFirstRender,setIsTheFirstRender] = useState(true)

  useEffect(() => {
    if(!isTheFirstRender && auth.error && auth.error.status == 401) notify(auth.error.message);
    else setIsTheFirstRender(false)
  },[auth.error])
  return (
    <>
      <h3 className="text-2xl text-center">Ingresar</h3>
      <Form onSubmit={onSub}>
        {
          ({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center  mx-auto">
              <Field
                className="w-full"
                name="email"
                placeholder="Enter Text"
                label="Email"
                component={TextInput}
              />
              <Field
                className="w-full"
                name="contraseña"
                placeholder="Enter Text"
                label="Contraseña"
                type="password"
                component={TextInput}
              />
              <button className="btn btn-secondary w-full mt-5">Ingresar</button>
            </form>
            
          )
        }
      </Form>
      <div className="flex flex-col items-center mt-3 relative pb-2">
        <p className="text-xs">¿No tienes cuenta?</p>
        <button onClick={() => setModal("singIn")} className="btn btn-ghost btn-xs absolute w-64 -bottom-5">Registrate</button>
      </div>
    </>
  )
}