"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCountries } from '@/static/getCountries'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import CreationBottonBar from '@/components/CreationBottonBar'
import { useParams } from 'next/navigation'
import { createLocation } from '@/static/actions'


const AddressPage = () => {

    const {id} =useParams()

    const { getAllCountries, getCountryByValue}=useCountries()

    const [locationValue,setLocationValue]=useState('')
    const LazyMap = dynamic(()=>import("@/components/Map"),{
        ssr:false,
        loading:()=><Skeleton className='h-[50vh] w-full '/>
    })
  return (
    <div className='w-3/5  mx-auto'>
        <h2 className="text-3xl font-semibold -tracking-tight transition-colors my-10">Where is your home lcated?</h2>
         <form action={createLocation} className="mb-32">
            <input  type='hidden' value={id} name='homeId'/>
            <input  type='hidden' value={locationValue} name='countryValue'/>
            <div className="full mx-auto">
            
            <div className="mb-5">
                <Select required onValueChange={(value)=>setLocationValue(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select a Country" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
        <SelectLabel>Countries</SelectLabel>
        {
            getAllCountries().map(item=>(
                <SelectItem key={item.value} value={item.value} >{item.flag} {item.label} {item.regoin} </SelectItem>

            ))
        }
    </SelectGroup>
   
  </SelectContent>
</Select>

            </div>
            <LazyMap locationValue={locationValue} />
            </div>
         <CreationBottonBar/>
         </form>
    </div>
  )
} 

export default AddressPage