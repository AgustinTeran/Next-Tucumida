import React from "react";



export default function TextInput({input,meta,...rest}){
  return (
    <div className={`p-2 ${rest.className}`}>
      <label className="label">
        <span className="label-text text-base">{rest.label}</span>
      </label>
      <input {...input} readOnly={rest.readOnly} placeholder={rest.placeholder} autoComplete="off" className={`${rest.inputClass} input input-bordered w-full ${meta.touched && meta.error && "input-error"} focus:border-none`}/>
      {
        meta.touched && meta.error && (
        
          <span className="block label-text-alt text-error">{meta.error}</span>
        
        )
      }
    </div>
  )
}