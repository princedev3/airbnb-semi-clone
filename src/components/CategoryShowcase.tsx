import { categoryItems } from '@/static/CategoryItem'
import Image from 'next/image'
import React from 'react'

const CategoryShowcase = ({categoryName}:{categoryName:string}) => {
    const category = categoryItems.find(item=>item.name===categoryName)
  return (
    <div className='flex items-center'>
        <Image src={category?.imageUrl as string} alt='category' width={44} height={44}/>
        <div className="flex flex-col ml-4">
            <h3 className="font-medium">{category?.title} </h3>
            <p className="text-foreground text-sm">{category?.description} </p>
        </div>
    </div>
  )
}

export default CategoryShowcase