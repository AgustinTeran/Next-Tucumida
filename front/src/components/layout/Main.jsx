"use client"
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {BiSolidMoon, BiSolidSun} from "react-icons/bi"
import { useDispatch } from "react-redux";
import appConfigActions from "@/redux/appConfig/actions"




export default function Main({serverTheme,children}){

  useEffect(() => {
    if(!Cookies.get("theme")) Cookies.set("theme","mytheme")
  },[])

  var [theme,setTheme] = useState(serverTheme || "mytheme")


  var dispatch = useDispatch()
  useEffect(() => {
    dispatch(appConfigActions.updateTheme(theme))
  },[theme])

  return (
    <main className="pt-20 h-full min-h-screen" data-theme={theme}>
      {
        theme === "mytheme"? (
          <BiSolidMoon className="text-white z-40 cursor-pointer w-8 h-8 fixed top-6 right-3 hover:text-gray-400" onClick={() => { Cookies.set("theme","myDark"); setTheme("myDark")}}/>
        ) : (
          <BiSolidSun className="text-white z-40 cursor-pointer w-8 h-8 fixed top-6 right-3 hover:text-yellow-300" onClick={() => { Cookies.set("theme","mytheme"); setTheme("mytheme")}}/>
        )
      }
      {children}
    </main>
  )
}