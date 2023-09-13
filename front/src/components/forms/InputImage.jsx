import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi"

const InputImage = ({input,meta,imagePreview,setImagePreview}) => {

  const handleFileChange = (e) => {
    setImagePreview(e.target.files[0])
  };


  return (
    <div className="flex mt-2 h-20 flex-1 min-w-[170px] gap-2 ml-5">
      <div className={`border-2 border-base-300 rounded-md w-20 h-full relative ${meta.touched && !imagePreview && "border-error"}`}>
        <BiImageAdd className="absolute top-0 bottom-0 left-0 right-0 m-auto h-7 w-7 text-base-300"/>
        <input
          {...input}
          type="file"
          accept=".png, .jpg, .jpeg, .svg"
          className="opacity-0 border-2 w-full h-full cursor-pointer"
          onChange={handleFileChange}
        />
        {
          meta.touched && !imagePreview && (
            <span className="block label-text-alt text-error">
              Requerido
            </span>
          )
        }
      </div>
      {imagePreview && (
        <img className="border-2 border-base-300 rounded-md h-full w-20 object-fill" src={URL.createObjectURL(imagePreview)} alt="Vista previa de la imagen" />
      )}
    </div>
  );
};

export default InputImage;