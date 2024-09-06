"use client"
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useCountries } from '@/static/getCountries'
import { icon } from 'leaflet'
import { MapPinXInside } from 'lucide-react'

const Icon = icon({
    iconUrl:"https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
    iconSize:[30,30]
})

const Map = ({locationValue}:{locationValue:string}) => {
    const {getCountryByValue}=useCountries()
    const latLang = getCountryByValue(locationValue)?.latLange
  return (
    <MapContainer center={latLang ?? [51.505, -0.09]} zoom={8} scrollWheelZoom={false} className='h-[50vh]  rounded-lg z-0 '>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker icon={Icon} position={latLang ?? [51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  )
}

export default Map