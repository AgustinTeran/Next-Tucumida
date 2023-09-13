"use client"
import Link from "next/link";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"
import restaurantesActions from "@/redux/restaurants/actions"
import { useDispatch } from "react-redux";




export default function MisRestaurantesCard({id,nombre}){
  var [openModal,setOpenModal] = useState(false)
  var dispatch = useDispatch()
  return (
    <div className={`w-full flex gap-4 justify-between p-4 shadow-md`}>
      <p className="flex-[2] text-ellipsis overflow-hidden whitespace-nowrap text-center">{id}</p>
      <p className="flex-[2] text-ellipsis overflow-hidden whitespace-nowrap text-center">{nombre}</p>
      <div className="flex gap-3 flex-1 justify-center">
          <Link href={`/misRestaurantes/${id}`}><FiEdit className="h-5 w-5 hover:text-yellow-600"/></Link>
          <FiTrash2 onClick={() => setOpenModal(true)} className="h-5 w-5 cursor-pointer hover:text-red-600"/>
      </div>
      {
        openModal && (
        <div className={`modal ${openModal && "visible opacity-100 pointer-events-auto"}`}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">¿Estás seguro que quieres eliminar este restaurante?</h3>
            <p className="py-4">{nombre}</p>
            <div className="modal-action">
              <button onClick={() => dispatch(restaurantesActions.del(id))} className="btn btn-error">Confirmar</button>
              <button onClick={() => setOpenModal(false)} className="btn btn-success text-base-100">Cancelar</button>
            </div>
          </div>
        </div>
        )
      }

    </div>
  )
}