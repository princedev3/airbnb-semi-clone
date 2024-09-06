"use client"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

const DateButton = () => {
    const {pending} = useFormStatus()
  return (
    <div className="">
{
    pending? 
    <Button disabled className='w-full flex items-center justify-center'>
    <Loader2 className='animate-spin w-4 h-4'/>
     </Button>:
        <Button className='w-full' type='submit'>make a reservation </Button>
}
    </div>
  )
}

export default DateButton