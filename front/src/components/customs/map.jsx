"use client"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function Map({restaurante}){
  var {lat,long} = restaurante.ubicacion
  return (
    <MapContainer
     center={[lat,long]}
     zoom={14}
     className="w-full h-[400px] z-[1] mt-14 rounded-lg border-2 border-gray-400"
     >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat,long]}>
        <Popup>
          <div className='flex flex-col items-center'>
            <h4 className="capitalize">{restaurante.nombre}</h4>
            <a target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}>Ver en Maps</a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}