"use client"
;
import InputImage from "@/components/forms/InputImage";
import MultiSelect from "@/components/forms/MultiSelect";
import Select from "@/components/forms/Select";
import TextInput from "@/components/forms/TextInput";
import { back, baseURL, departamentos } from "@/config";
import backRoutes from "@/config/backRoutes";
import { esEnlaceDeFacebook, esEnlaceDeInstagram, esLink, validateMaxLength, validateOnlyNumber, validateStringNotEmpty } from "@/utils/validaciones";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import restaurantesActions from "@/redux/restaurants/actions"
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const FormMap = dynamic(() => import("@/components/customs/formMap"), {
  ssr: false, // Desactiva el SSR para este componente
});


export default function AddOrModifyForm({restaurante,categorias}){
  var dispatch = useDispatch()

  var {id} = useParams()
  var router = useRouter()

  var [categoriasSelected,setCategoriasSelected] = useState(restaurante? restaurante.categorias.map(e => ({name:e.nombre,value:e.id})) : [])
  var [tipoDeImagen,setTipoDeImagen] = useState("link")
  const [imagePreview, setImagePreview] = useState(null);

  async function onSub(values,functions){
    // Los validate hechos con finalForm no perimiten que se ejecute onSub, pero los hecho
    // manualmente si. Es por eso que validamos manualmente abajo.
    if(!categoriasSelected.length) return console.log("error");;
    if((tipoDeImagen === "archivo" && !imagePreview) || (tipoDeImagen === "link" && !values.imagen)) return console.log("error");;
    
    
    if(id === "new"){
      if(tipoDeImagen === "archivo"){
        const formData = new FormData();
        formData.append("imagen", imagePreview);

        var linkImagen = await back.post(`${backRoutes.IMAGENES}`,formData)
        .then(res => res)
        .catch(err => console.error(err))
      }

      var preRestaurante = {
        ...values,
        categorias: categoriasSelected.map(e => e.value),
        imagen: linkImagen.data.imagen || values.imagen
      }

      dispatch(restaurantesActions.postOrPut(preRestaurante))
      router.push("/misRestaurantes")

    }else{
      if(tipoDeImagen === "archivo"){
        const formData = new FormData();
        formData.append("imagen", imagePreview);


        if(restaurante.imagen.split("/",3)[2] === baseURL.split("/",3)[2]){
          var linkImagen = await back.put(`${backRoutes.IMAGENES}/${restaurante.imagen.split("/")[4]}`,formData)
          .then(res => res)
          .catch(err => console.error(err))
        }else{
          var linkImagen = await back.post(`${backRoutes.IMAGENES}`,formData)
          .then(res => res)
          .catch(err => console.error(err))
        }
      }

      var preRestaurante = {
        ...values,
        id,
        categorias: categoriasSelected.map(e => e.value),
        imagen: linkImagen?.data.imagen || values.imagen
      }

      dispatch(restaurantesActions.postOrPut(preRestaurante))
      router.push("/misRestaurantes")

    }
  }
  

  return (
    <Form onSubmit={onSub} render={({handleSubmit,values,form,hasValidationErrors}) => (
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl flex-wrap p-5">
          <h2 className="text-2xl basis w-full p-2">Restaurante</h2>
          <Field validate={value => {if(!validateStringNotEmpty(value)) return "No puede estar vacio"; if(!validateMaxLength(value,255)) return "No puede ser más de 255 caracteres"}} className={"flex-1 w-full min-w-[250px]"} label={"Nombre"} component={TextInput} name="nombre" initialValue={restaurante && restaurante.nombre} placeholder={"Enter text"}/>
          <Field validate={value => {if(!validateStringNotEmpty(value)) return "No puede estar vacio";if(!validateOnlyNumber(value)) return "Debe ser un número"; if(!validateMaxLength(value,255)) return "No puede ser más de 255 caracteres"}} className={"flex-1 w-full min-w-[250px]"} label={"Número"} component={TextInput} name="numero" initialValue={restaurante && restaurante.numero} placeholder={"Enter text"}/>
          <Field validate={(value,allValues) => {if(!value && allValues.facebook_link) return "Si pones un link de facebook se requiere nombre de usuario";if(value && !validateMaxLength(value,255)) return "No puede ser más de 255 caracteres"}} className={"flex-1 w-full min-w-[250px]"} label={"Usuario de Facebook"} component={TextInput} name="facebook_usuario" initialValue={restaurante && restaurante.facebook_usuario} placeholder={"Enter text"}/>
          <Field validate={(value,allValues) => {if(!value && allValues.facebook_usuario) return "Si pones un usuario de facebook se requiere link del perfil";if(value && !esEnlaceDeFacebook(value)) return "Debe ser un link de perfil de facebook" ;if(value && !validateMaxLength(value,255)) return "No puede ser más de 255 caracteres"}} className={"flex-1 w-full min-w-[250px]"} label={"Link de Facebook"} component={TextInput} name="facebook_link" initialValue={restaurante && restaurante.facebook_link} placeholder={"Enter text"}/>
          <Field validate={value => {if(value && !esEnlaceDeInstagram(value)) return "Debe ser un link de perfil de instagram";if(value && !validateMaxLength(value,255)) return "No puede ser más de 255 caracteres"}} className={"flex-1 w-full min-w-[250px]"} label={"Link de Instagram"} component={TextInput} name="instagram" initialValue={restaurante && restaurante.instagram} placeholder={"Enter text"}/>
        </div>
        <div className="flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl flex-wrap p-5">
          <h2 className="text-2xl basis w-full p-2">Categorias</h2>
          <Field value={categoriasSelected} name="categorias" render={({input,meta}) => 
            <MultiSelect
             input={input}
             meta={meta}
             onDelete={(e) => {return () => setCategoriasSelected(categoriasSelected.filter(c => c.value !== e.value))}}
             onChange={(e) => {setCategoriasSelected([...categoriasSelected,JSON.parse(e.target.value)])}}
             optionsSelected={categoriasSelected}
             options={categorias.rows.map(e => ({name:e.nombre,value:e.id}))}
             className={"flex-1 w-full min-w-[250px]"}
             secondClassName={"flex-1 flex-wrap w-full min-w-[250px] gap-2 flex items-center px-3"}
             title={"Selecciona categorias"}
             label={"¿A que categorías corresponde tu restaurante?"}
            />
          }/>
        </div>
        <div className="flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl flex-wrap p-5">
          <h2 className="text-2xl basis w-full p-2">Imagén</h2>
          <select className="select select-bordered mt-6 mb-2" onChange={e => setTipoDeImagen(e.target.value)}>
            <option value={"link"}>Link</option>
            <option value={"archivo"}>Desde mi dispositivo</option>
          </select>
          {
            tipoDeImagen === "link" && (
              <Field validate={value => {if(!value) return "No puede estar vacio"; if(!esLink(value)) return "Debe ser un link";if(!validateMaxLength(value,255)) return "No puede ser más de 255 caracteres"}} className={"flex-1 mb-2 w-full min-w-[250px]"} component={TextInput} name="imagen" initialValue={restaurante && restaurante.imagen} placeholder={"Enter text"}/> 
            )
          }
          {
            tipoDeImagen === "archivo" && (
              <Field name="archivoImagen" render={({input,meta}) => 
                <InputImage input={input} meta={meta} imagePreview={imagePreview} setImagePreview={setImagePreview}/>
              }/>
            )
          }
        </div>
        <div className="flex shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl flex-wrap p-5">
          <h2 className="text-2xl basis w-full p-2">Ubicación</h2>
          <Field className={"flex-1 w-full min-w-[250px]"} validate={value => {if(!value) return "No puede estar vacio"}} label={"Calle"} component={TextInput} name="calle" initialValue={restaurante && restaurante.ubicacion.calle} placeholder={"Enter text"}/>
          <Field className={"flex-1 w-full min-w-[250px]"} label={"Departamento"} validate={value => {if(!value) return "Debe seleccionar departamento"}} title={"Selecciona departamento"} component={Select} options={departamentos} name="departamento" initialValue={restaurante && restaurante.ubicacion.departamento}/>
          <div className="w-full mt-6">
            <label className="label">
              <span className="label-text text-base">Seleccione la ubicación del restaurante haciendo doble click en el mapa</span>
            </label>
            <div className="flex gap-2 mb-2">
              <Field validate={value => {if(!value) return "Selecciona ubicación en el mapa haciendo doble click"}} className={"flex-1 min-w-0 max-w-xs"} readOnly={true} label={"Latitud"} component={TextInput} name="lat" initialValue={restaurante && restaurante.ubicacion.lat} placeholder={"Enter text"}/>
              <Field validate={value => {if(!value) return "Selecciona ubicación en el mapa haciendo doble click"}} className={"flex-1 min-w-0 max-w-xs"} readOnly={true} label={"Longitud"} component={TextInput} name="long" initialValue={restaurante && restaurante.ubicacion.long} placeholder={"Enter text"}/>
            </div>
            <FormMap formChange={form.change} restaurante={restaurante} lat={values.lat} long={values.long} nombre={values.nombre}/> 
          </div>
        </div>
        <button className={`btn w-full btn-success text-base-100 hover:opacity-60`}>{id === "new"? "Agregar restaurante" : "Modificar restaurante"}</button>
      </form>
    )
    }/>
  )
}