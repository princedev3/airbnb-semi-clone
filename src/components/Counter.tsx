"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'

const Counter = ({name}:{name:string}) => {
    const[amount,setAmunt]=useState(0)
  return (
    <div className='flex items-center gap-x-4 '>
      <input type='hidden' name={name} value={amount} />
        <Button type='button' variant={"outline"} size={"icon"} onClick={()=>setAmunt(amount<=0?amount:amount-1)}>
            <Minus className='h-4 w-4 text-primary'/>
        </Button>
        <p className="">{amount} </p>
        <Button type='button' variant={"outline"} size={"icon"} onClick={()=>setAmunt(amount+1)}>
            <Plus className='h-4 w-4 text-primary'/>
        </Button>
    </div>
  )
}

export default Counter