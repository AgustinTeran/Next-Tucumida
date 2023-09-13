"use client"
import { useRouter } from "next/navigation";
import { BsArrowLeftShort } from "react-icons/bs";



export default function GoBackButton({className}){
  var router = useRouter()

  return (
    <BsArrowLeftShort onClick={() => router.back()} className={`w-10 h-10 cursor-pointer mb-1 ${className}`}/>
  )
}