"use client"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";


function Pin({lat,long,restaurante,formChange}){
  var [coordenadas,setCoordenadas] = useState(restaurante? [lat,long] : [])
  var map = useMapEvents({
    dblclick: (e) => {
      let {lat: latitud,lng: longitud} = e.latlng
      setCoordenadas([latitud,longitud])

      map.flyTo(e.latlng,17)
    

      formChange("lat", latitud)
      formChange("long", longitud)

    },
  })
  return (
    <>
      {
        coordenadas.length && (
        <Marker position={coordenadas} >
          <Popup>
            <div className='flex flex-col items-center'>
              <a target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}>Ver en Maps</a>
            </div>
          </Popup>
        </Marker>
        )
      }
    </>
  )
}

export default function FormMap({restaurante,formChange}){
  if(restaurante){
    var {lat,long} = restaurante.ubicacion
  }
  
  return (
    <MapContainer
     center={restaurante? [lat,long] : [-26.83004621142264,-65.20485357718465]}
     zoom={14}
     className="w-full h-[400px] mt-3 z-[1] rounded-lg border-2 border-gray-400"
     doubleClickZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Pin restaurante={restaurante || null} lat={lat || null} long={long || null} formChange={formChange}/>
      
    </MapContainer>
  )
}

