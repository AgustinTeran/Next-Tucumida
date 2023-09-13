import React, { useEffect } from "react";



export default function Select({input,meta,options,title,...rest}){
  return (
    <div className={`p-2 ${rest.className}`}>
      <label className="label">
        <span className="label-text text-base">{rest.label}</span>
      </label>
      <select {...input} className={`select select-bordered w-full ${meta.touched && meta.error && "border-error"}`}>
        <option hidden>{title}</option>
        {
          options.map(e => (
            <option key={e.value} value={e.value}>{e.name}</option>
          )
          )
        }
      </select>
      {
          meta.touched && meta.error && (
            <span className="block label-text-alt text-error">
              {meta.error}
            </span>
          )
        }
    </div>
  )
}