"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi"





export default function SearchInput(){
  var router = useRouter()
  return (
    <div className="max-w-5xl flex justify-center">
      <form onSubmit={e => {
        e.preventDefault()

        router.push(`/${e.target[0].value}`);
      }} className='relative flex justify-center mb-6 mt-6 w-full max-w-3xl mx-3'>
        <input className=' input input-bordered border-base-300 rounded-full shadow-sm px-6 border-2 w-full' type="text" placeholder='Buscar restaurantes...'/>
        <button className='absolute top-0 bottom-0 right-5'><BiSearchAlt2 className='w-6 h-6 text-base-300'/></button>
      </form>
    </div>
  )
}