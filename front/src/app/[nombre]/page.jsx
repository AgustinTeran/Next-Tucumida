import RestaurantsCard from "@/components/customs/restaurantsCard";
import { back } from "@/config";
import backRoutes from "@/config/backRoutes";
import { capitalizeString } from "@/utils/funciones";
import React from "react";


function searchRestaurantes(nombre){
  var resultados = back.get(`${backRoutes.RESTAURANTES}?search=${nombre}&limit=10000`)
  .then(res => res.data)
  .catch(err => ({error: true,message: err}))

  return resultados
}


export function generateMetadata({params}){
  return {
    title: `${decodeURIComponent(capitalizeString(params.nombre))}`,
    description: `Encuentra ${params.nombre} y los mejores restaurantes de tucumida en Tucumida`,
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  }
}


export default async function Search({params}){
  var {nombre} = params

  var resultados = await searchRestaurantes(nombre)

  
  return (
    <div className="max-w-5xl mx-auto">
      {
        !resultados.rows?.length && <h4 className="text-2xl text-center mt-4">No se encontraron resultados</h4>
      }
      <div className="flex flex-wrap mt-1 p-3 gap-4 justify-center">
        {
          resultados.rows?.map(e => <RestaurantsCard key={e.id} id={e.id} nombre={e.nombre} imagen={e.imagen} categorias={e.categorias}/>)
        }
      </div>
    </div>
  )
}