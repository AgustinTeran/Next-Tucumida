import { slugCreator } from "@/utils/funciones";
import Link from "next/link";
import React from "react";




export default function RestaurantsCard({nombre,id,imagen,categorias}){
  return (
    <Link className="min-w-[280px] shadow-md rounded-lg p-1 w-full max-w-[320px] border-2 border-base-300 flex" href={`/${slugCreator(nombre)}/${id}`}>
      <img className=" object-fill w-20 h-20 border border-base-300 rounded-xl" src={imagen} alt={nombre} />
      <div className="w-full flex flex-col justify-between p-1">
        <h4 className="text-center w-full text-xl mt-1 capitalize">{nombre}</h4>
        <div className="flex justify-evenly flex-wrap w-full">
          {
            categorias.map(e => <span className="capitalize text-sm text-gray-500" key={e.nombre}>{e.nombre}</span>)
          }
        </div>
      </div>
    </Link>
  )
}