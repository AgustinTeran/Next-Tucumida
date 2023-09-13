import Link from "next/link";
import React from "react";




export default function CategoriesCard({id,nombre,color,imagen}){
  return (
    <Link href={`/${nombre}`} className="flex rounded-md flex-col p-2 gap-2 justify-between items-center hover:opacity-50" style={{backgroundColor: color}}>
      <h4 style={{textShadow: "1px 1px 2px black"}} className="text-white text-lg capitalize">{nombre}</h4>
      <img className='w-52 h-24 object-cover rounded-md' src={imagen} alt={nombre} />
    </Link>
  )
}