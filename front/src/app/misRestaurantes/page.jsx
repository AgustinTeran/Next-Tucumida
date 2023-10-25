"use client"
import React, { useEffect } from "react";
import MisRestaurantesCard from "@/components/customs/misRestaurantesCard";
import Link from "next/link";
import GoBackButton from "@/components/customs/goBackButton";
import { useDispatch, useSelector } from "react-redux";
import restaurantesActions from "@/redux/restaurants/actions"
import Loader from "@/components/commons/loader";




export default function MisRestaurantes(){
  var dispatch = useDispatch()
  var restaurantes = useSelector(state => state.restaurants.myRestaurants)

  useEffect(() => {
    if(!restaurantes.items) dispatch(restaurantesActions.getMisRestaurantes())
  },[])


  if(restaurantes.error){
    return (
      <div className="max-w-5xl px-2 mx-auto">
        <span className="block text-center mt-3 text-red-500">Hubo un error: {restaurantes.error.message || "Error al conectarse"}</span>
      </div>
    )
  }

  if(restaurantes.loading || !restaurantes.items){
    return (
      <div className="max-w-5xl px-2 mx-auto mb-4">
        <Loader/>
      </div>
    )
  }

  
  return (
    <div className="max-w-5xl px-2 mx-auto">
      <div>
        <div className="flex justify-between flex-wrap py-4 mb-5 gap-3">
          <h2 className="text-2xl capitalize flex items-center gap-2 sm:text-3xl"><GoBackButton className={"mb-0 mt-1"}/> Mis Restaurantes</h2>
          <Link href={"/misRestaurantes/new"} className="btn btn-success text-base-100 hover:opacity-60">Agregar restaurante</Link>
        </div>
        {
          restaurantes.items.length? (
            <>
            <div className="flex justify-between gap-4 px-4 mb-1">
              <p className="flex-[2] text-center border-b-2 py-3 border-base-300">ID</p>
              <p className="flex-[2] text-center border-b-2 py-3 border-base-300">Nombre</p>
              <p className="flex-[1] text-center border-b-2 py-3 border-base-300">Acciones</p>
            </div>
            {
            restaurantes.items.map(e => <MisRestaurantesCard key={e.id} id={e.id} nombre={e.nombre}/>)
            }
            </>
          ) : (
            <h4 className="text-xl text-center mt-4 sm:text-2xl">No tienes restaurantes creados</h4>
          )
        }
      </div>  
    </div>
  )
}
