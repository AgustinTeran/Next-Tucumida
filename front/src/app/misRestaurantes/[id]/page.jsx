import GoBackButton from "@/components/customs/goBackButton";
import { back } from "@/config";
import backRoutes from "@/config/backRoutes";
import React from "react";
import AddOrModifyForm from "./form";

export function generateMetadata({params}){
  if(params.id === "new"){
    return {
      title: "Agregar Restaurante | Tucumida"
    }
  }else{
    return {
      title: "Modificar Restaurante | Tucumida"
    }
  }
}

async function getRestauranteCategorias(id){

  if(id){
    var restaurantePromise = back.get(`${backRoutes.RESTAURANTES}/${id}`)
    .then(res => res.data)
    .catch(err => ({error: true, message: err.response.data.message}))
  
    var categoriasPromise = back.get(`${backRoutes.CATEGORIAS}`)
    .then(res => res.data)
    .catch(err => ({error: true, message: err.response.data.message}))
  
    return Promise.all([restaurantePromise, categoriasPromise]).then(
      ([restaurante, categorias]) => {
        return {
          restaurante,
          categorias,
        };
      }
    );
  }else{
    var categorias = await back.get(`${backRoutes.CATEGORIAS}`)
    .then(res => res.data)
    .catch(err => ({error: true, message: err.response.data.message}))

    return {
      categorias,
      restaurante: null
    }
  }
}


export default async function AddOrModifyRestaurant({params}){
  var {id} = params

  var {restaurante,categorias} = await getRestauranteCategorias(id !== "new"? id : null)


  if(restaurante && !!restaurante.error){
    return (
    <div className="max-w-5xl mx-auto px-2">
      <span className="block text-center mt-3 text-red-500">Hubo un error: {restaurante.message || "Error al conectarse"}</span>
    </div>
    )
  }
  
  return (
    <div className="max-w-5xl mx-auto px-2 pb-10">
      <h2 className="text-2xl p-4 capitalize flex items-center gap-2 mb-6 sm:text-3xl"><GoBackButton className={"mb-0 mt-1"}/> {id === "new"? "Agregar restaurante": "Modificar restaurante"}</h2>
      <AddOrModifyForm restaurante={restaurante || null} categorias={categorias || null}/>
    </div>
  )
}