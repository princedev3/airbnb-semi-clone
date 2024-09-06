"use client"
import React from 'react'
import {  useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Heart, Loader2 } from 'lucide-react'

export  function SubmitButton(){

    const {pending} = useFormStatus()

  return (
    <>
    {
        pending?(
            <Button disabled   size={"lg"}>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                please wait
            </Button>
        ):(
            <Button type='submit'  size={"lg"}>Next</Button>
        )
    }
    </>
  )
}


export  function AddToFavoriteButton (){
const {pending} =useFormStatus()

return(
    <>
    {pending ? (
       <Button variant={'outline'} size={'icon'} disabled className='bg-primary-foreground' type='submit'>
        <Loader2 className='h-4 w-4 animate-spin text-primary'/>
       </Button>
    ):(
        <div>
            <Button variant={'outline'} size={'icon'} className='bg-primary-foreground' type='submit'>
                <Heart/>
            </Button>
        </div>
    )}
    </>
)
}




export  function DeleteFavoriteButton (){
    const {pending} =useFormStatus()
    
    return(
        <>
        {pending ? (
           <Button variant={'outline'} size={'icon'} disabled className='bg-primary-foreground' type='submit'>
            <Loader2 className='h-4 w-4 animate-spin text-primary'/>
           </Button>
        ):(
            <div>
                <Button variant={'outline'} size={'icon'} className='bg-primary-foreground' type='submit'>
                    <Heart fill='#E21C49' className='w-4 h-4 text-primary'/>
                </Button>
            </div>
        )}
        </>
    )
    }
