"use client"
import { categoryItems } from '@/static/CategoryItem'
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'

const SelectCatgeory = () => {
    const [selectCategory,setSelectCategory]=useState<string | null>(null)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 mx-auto mb-28'>
        <input type="text" className='hidden' name='categoryName' value={selectCategory as string} />
        {categoryItems.map(item=>(
            <div className="" key={item.id}>
                  <Card onClick={()=>setSelectCategory(item.name)} className={selectCategory ===item.name?"border-primary":""}>
  <CardHeader>
   <Image src={item.imageUrl} alt='' width={32} height={32} className='w-8 h-8 object-cover'/>
   <h3 className="font-medium">{item.title} </h3>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
             </div>
        )

        )}
    </div>
    
  )
}

export default SelectCatgeory