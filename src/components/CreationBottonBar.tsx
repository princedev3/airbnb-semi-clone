import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { SubmitButton } from './SubmitButton'

const CreationBottonBar = () => {
  return (
    <div className="fixed right-[20%]  w-3/5 bottom-0 z-10 bg-white border-t h-24">
    <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Link href={"/"} className='cursor-pointer'>
        <Button type='button' variant={"secondary"} size={"lg"}>cancel</Button>
        </Link>
        <SubmitButton />
    </div>
  </div>
  )
}

export default CreationBottonBar