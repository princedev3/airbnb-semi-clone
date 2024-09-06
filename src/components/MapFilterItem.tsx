"use client"
import { categoryItems } from '@/static/CategoryItem'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

const MapFilterItem = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get("filter")
    const pathname = usePathname()


    const createQueryString = useCallback((name:string,value:string)=>{
       const params = new URLSearchParams(searchParams.toString())
       params.set(name,value)
       return params.toString()
    },[searchParams])
  return (
    <div className='flex justify-between items-center gap-x-32  w-full h-full overflow-x-scroll overflow-y-hidden no-Scrollbar'>
        {
            categoryItems.map(item=>(
                <Link href={pathname+"?"+createQueryString("filter",item.name) } key={item.id}  style={{ minWidth: 'auto', height: 'auto' }}  className={` flex flex-col gap-y-1 justify-center items-center ` } >
                     <div className="relative w-6 h-6 ">
                        <Image src={item.imageUrl} width={24} height={24} alt='' className='w-6 h-6 mx-auto  flex'/>
                        <p className={`${search===item.name?"border-b-2 border-black pb-1 flex-shrink-0":"opacity-70 flex-shrink-0"  } text-sm font-medium`} >{item.title} </p>
                     </div>
                 </Link>
            ))
        }
    </div>
  )
}

export default MapFilterItem