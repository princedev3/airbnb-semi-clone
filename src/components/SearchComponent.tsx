"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Search } from 'lucide-react'
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
import HomeMap from './HomeMap'
import { Button } from './ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Counter from '@/components/Counter'
import { SubmitButton } from './SubmitButton'


const SearchComponent = () => {
    const [step,setStep]=useState(1)
    const [locationValue,setLocationValue]=useState("")
    const {getAllCountries, getCountryByValue } =useCountries()

    function SubmitButtonLocal (){
        if(step ===1){
            return (
                <Button onClick={()=>setStep(step + 1)}>Next</Button>
            )
        }else if(step===2){
            return <SubmitButton/>
        }
    }
  return (
    <Dialog>
    <DialogTrigger>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
            <div className="flex h-full divide-x font-meduim">
                <p className="px-4">Anywhere</p>
                <p className="px-4">Any week</p>
                <p className="px-4">Any guests</p>
            </div>
            <Search className='bg-primary text-white p-2 h-8 w-8 rounded-full'/>
        </div>
    </DialogTrigger>
    <DialogContent className='sm:max-w-[425px] '>
       <form action="" className="gap-4 flex flex-col">
        <input type='hidden' value={locationValue} name='country'/>
             {
                step===1? (
                    <>
                    <DialogHeader>
                        <DialogTitle>Select a Country</DialogTitle>
                        <DialogDescription>Please choose a country so we know what you want</DialogDescription>
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
<HomeMap locationValue={locationValue}  />

                    </DialogHeader>
                    </>
                ):(<>
                        <DialogHeader>
                        <DialogTitle>Select all the info you need</DialogTitle>
                        <DialogDescription>Please choose a country that you want</DialogDescription>
                    </DialogHeader>
                    <Card>
  <CardHeader className='flex flex-col gap-y-5'>
    <div className="flex flex-center justify-between">
           <div className="flex flex-col">
            <h2 className="underline font-medium">Guests</h2>
            <p className="text-muted-foreground text-sm">how many guest do you want?</p>
           </div>
           <Counter name='guest'/>

    </div>
    <div className="flex flex-center justify-between">
           <div className="flex flex-col">
            <h2 className="underline font-medium">Rooms</h2>
            <p className="text-muted-foreground text-sm">how many rooms do you want</p>
           </div>
           <Counter name='room'/>

    </div>
    <div className="flex flex-center justify-between">
           <div className="flex flex-col">
            <h2 className="underline font-medium">Bathrooms</h2>
            <p className="text-muted-foreground text-sm">how many bathroom do you want?</p>
           </div>
           <Counter name='bathroom'/>

    </div>
  </CardHeader>
</Card>
                
                </>)
             }
          <DialogFooter>
          <SubmitButtonLocal/>
          </DialogFooter>
       </form>
    </DialogContent>
  </Dialog>
  )
}

export default SearchComponent