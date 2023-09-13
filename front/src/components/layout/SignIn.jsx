"use client"
import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import TextInput from "../forms/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { validateAtLeastLength, validateEmail, validateStringNotEmpty } from "../../utils/validaciones";
import authActions from "../../redux/auth/actions"
import { notify } from "../../config/notify";



export default function SignIn({setModal}){
  var dispatch = useDispatch()
  function onSub(values,functions){
    dispatch(authActions.post(values))
  }

  var auth = useSelector(state => state.auth)
  var [isTheFirstRender,setIsTheFirstRender] = useState(true)

  useEffect(() => {
    if(!isTheFirstRender && auth.error && auth.error.status == 400) notify(auth.error.message);
    else setIsTheFirstRender(false)
  },[auth.error])

  return (
    <>
      <h1 className="text-2xl text-center">Registrate</h1>
      <Form onSubmit={onSub}>
        {
          ({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center  mx-auto">
              <Field
                className="w-full !py-0"
                validate={value => {
                  if(!validateStringNotEmpty(value)) return "Requerido";
                  if(!validateAtLeastLength(value,5)) return "Al menos 5 caracteres";
                }}
                name="nombre"
                placeholder="Enter Text"
                label="Nombre de Usuario"
                inputClass="input-sm"
                component={TextInput}
              />
              <Field
                className="w-full !py-0"
                validate={value => {
                  if(!validateStringNotEmpty(value)) return "Requerido";
                  if(!validateEmail(value)) return "Debe ser un email";
                }}
                name="email"
                placeholder="Enter Text"
                label="Email"
                inputClass="input-sm"
                component={TextInput}
              />
              <Field
                className="w-full !py-0"
                validate={value => {
                  if(!validateStringNotEmpty(value)) return "Requerido";
                  if(!validateAtLeastLength(value,5)) return "Al menos 5 caracteres";
                }}
                name="contraseña"
                placeholder="Enter Text"
                label="Contraseña"
                type="password"
                inputClass="input-sm"
                component={TextInput}
              />
              <button className="btn btn-sm btn-secondary w-full mt-5">Registrarme</button>
            </form>
          )
        }
      </Form>
      <div className="flex flex-col items-center mt-3 relative pb-2">
        <p className="text-xs">¿Ya tienes cuenta?</p>
        <button onClick={() => setModal("login")} className="btn btn-ghost btn-xs absolute w-64 -bottom-5">Ingresar</button>
      </div>
    </>
  )
}