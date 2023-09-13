"use client"
import Cookies from "js-cookie";
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Login from "./Login";
import SignIn from "./SignIn";
import { FaArrowUpFromBracket } from "react-icons/fa6"
import { FiLogOut } from "react-icons/fi"
import { useSelector } from "react-redux";
import { PiStorefront } from "react-icons/pi";





export default function Nav({user}){

  var [modal,setModal] = useState("login")

  var appConfig = useSelector(state => state.appConfig)


  useEffect(() => {
    if(user?.error && user?.message === "Acceso Denegado"){
    Cookies.remove("token")
    alert("Token invalido")
    window.location.replace("/")
  } 
  },[])

 if(!user || user.error){
  return (
    <nav data-theme={appConfig.theme} className="flex z-30 px-3 items-center fixed w-full justify-between h-20 bg-primary">
      <Link href={"/"} className="text-2xl text-white cursor-pointer hover:text-yellow-500">
        Tucumida
      </Link>

      <div className="flex items-center">
        <label htmlFor="my-modal-4"><FaArrowUpFromBracket className="h-6 w-6 hover:text-yellow-500 text-white cursor-pointer"/></label>
        {/* Espacio para el boton de modo oscuro que esta en Main.jsx */}
        <span className="h-full w-11"/>
      </div>


      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative !w-72">
            {
              modal === "login"? <Login setModal={setModal}/> : <SignIn setModal={setModal}/>
            }
          </label>
        </label>
    </nav>
  )
 }
  return (
    <nav className="flex px-3 items-center z-30 text-white fixed w-full justify-between h-20 bg-primary">
      <Link href={"/"} className="text-2xl cursor-pointer hover:text-yellow-500">
        Tucumida
      </Link>
      <div className="flex items-center">
        <Link href={"/misRestaurantes"}><PiStorefront className="cursor-pointer text-white h-8 w-8 hover:text-yellow-500"/></Link>
        <FiLogOut className="cursor-pointer text-white h-7 w-7 ml-3 mr-10 hover:text-yellow-500" onClick={() => {
          Cookies.remove("token")
          window.location.replace("/")
        }}/>
      </div>
    </nav>
  )
}