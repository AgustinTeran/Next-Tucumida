import { FiTrash2 } from "react-icons/fi"


export default function MultiSelect({input,meta,onChange,onDelete,options,optionsSelected,label,title,className,secondClassName}){
  return (
    <>
      <div className={`p-2 ${className}`}>
        <label className="label">
          <span className="label-text text-base">{label}</span>
        </label>
        <select {...input} className={`select select-bordered w-full ${meta.touched && !optionsSelected.length && "border-error"}`} onChange={onChange}>
          <option hidden>{title}</option>
          {
            options.map(e => {
              if(!optionsSelected.find(c => c.value === e.value)){
                return (
                  <option key={e.value} value={JSON.stringify(e)}>{e.name}</option>
                )
              }     
              }
            )
          }
        </select>
        {
          meta.touched && !optionsSelected.length && (
            <span className="block label-text-alt text-error">
              Selecciona al menos una categoria
            </span>
          )
        }
      </div>
      <div className={`p-2 ${secondClassName}`}>
        {
          optionsSelected.map(e => (
            <button className="border py-1 px-2 rounded-md bg-[#78787830] items-center flex gap-2 hover:bg-error" key={`${e.value}2`} onClick={onDelete(e)}>
              <span className="capitalize text-sm text-ellipsis overflow-hidden whitespace-nowrap">{e.name}</span>
              <FiTrash2 className="h-3 w-3"/>
            </button>
          ))
        }
      </div>
    </>

  )
}