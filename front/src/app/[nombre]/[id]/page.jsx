import { back } from "@/config";
import { capitalizeString } from "@/utils/funciones";
import React from "react";
import { FiFacebook, FiInstagram, FiPhoneCall } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import GoBackButton from "@/components/customs/goBackButton";
import dynamic from "next/dynamic";


const Map = dynamic(() => import("@/components/customs/map"), {
  ssr: false, // Desactiva el SSR para este componente
});


export async function generateMetadata({params}){
  let restaurante = await back.get(`/restaurantes/${params.id}`)
  .then(res => res.data)
  .catch(err => ({error: true}))


  if(restaurante.error){
    return {
      title: "Error"
    }
  }

  return {
    title: `${capitalizeString(restaurante?.nombre)}`,
    description: `${restaurante?.nombre}, ${restaurante?.ubicacion?.calle}, ${restaurante?.ubicacion?.departamento}`,
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
  }
}

async function getRestaurante(id){
  var restaurante = await back.get(`/restaurantes/${id}`)
  .then(res => res.data)
  .catch(err => ({error: true,message: err.response?.data?.message}))

  return restaurante
}

export default async function Restaurante({params}){
  var restaurante = await getRestaurante(params.id)


  return (
    <div className="px-4 pb-12 max-w-3xl mx-auto">
      {
        restaurante.nombre && (
          <>
            <div> 
              <h1 className="text-3xl mt-4 mb-10 flex ites-center capitalize gap-1"><GoBackButton/>{restaurante.nombre}</h1>
              <div className="flex gap-7 flex-wrap justify-center">
                <img className="w-72 border-gray-400 border-2 bg-base-300 h-52 min-h-8 rounded-md object-scale-down" src={restaurante.imagen} alt={restaurante.nombre} />
                <div className="flex flex-col py-4 gap-4">
                  <h5 className="flex text-lg gap-4"><FiPhoneCall className="h-8 w-8"/> Número: {restaurante.numero}</h5>
                  {
                    restaurante.instagram && <a target="_blank" className="flex text-lg gap-4 hover:text-yellow-600 cursor-pointer" href={restaurante.instagram}><FiInstagram className="h-8 w-8"/>Instagram: @{restaurante.instagram.split("/",4)[3]}</a>
                  }
                  {
                    restaurante.facebook_link && restaurante.facebook_usuario && <a target="_blank" className="flex gap-4 text-lg hover:text-yellow-600 cursor-pointer" href={restaurante.facebook_link}><FiFacebook className="h-8 w-8"/>Facebook: @{restaurante.facebook_usuario}</a>
                  }
                  <h5 className="flex text-lg gap-4 items-center"><SlLocationPin className="h-8 w-8"/> Ubicación: {restaurante.ubicacion.calle}, {restaurante.ubicacion.departamento}</h5>
                </div>
              </div>
            </div>
            <Map restaurante={restaurante}/>
          </>
          )
      }
      {
        restaurante.error && <span className="block text-center mt-3 text-red-500">Hubo un error: {restaurante.message || "Error al conectarse"}</span>
      }
    </div>
  )
}