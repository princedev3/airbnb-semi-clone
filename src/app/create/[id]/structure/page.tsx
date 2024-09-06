import CreationBottonBar from '@/components/CreationBottonBar'
import SelectCatgeory from '@/components/SelectCatgeory'
import { SubmitButton } from '@/components/SubmitButton'

import { Button } from '@/components/ui/button'
import { createCategoty } from '@/static/actions'
import Link from 'next/link'
import React from 'react'

const Structure = ({params}:{params:{id:string}}) => {
  return (
    <div className='w-3/5 mx-auto mt-2 relative'>
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">which of these best describe your home</h2>
        <form action={createCategoty} className="relative">
        <input type="text" className='hidden' name='homeId' value={params.id as string} />
        <SelectCatgeory/>
        <div className="fixed  w-3/5 bottom-0 z-10 bg-white border-t h-24">
    <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Link href={"/"} className='cursor-pointer'>
        <Button variant={"secondary"} size={"lg"}>cancel</Button>
        </Link>
        <SubmitButton />
        <CreationBottonBar/>
    </div>
  </div>
        </form>
    </div>
  )
}

export default Structure