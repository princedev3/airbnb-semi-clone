import ListingCard from '@/components/ListingCard'
import prisma from '@/static/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { unstable_noStore as noStore } from "next/cache";

export default  async function Home () {
  const {getUser}=getKindeServerSession()
  const user = await getUser()

  if(!user?.id ){
    redirect("/")
  }
  noStore() 
  const data = await prisma.home.findMany({
    where:{
      userId:user?.id
    },
include:{
    favorite:true
}
})


  return (
    <div className='mx-auto px-5 lg:px-10 py-5 mt-10'>
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {
        data.length===0? (
          <div className="">No Home created</div>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 ">

           {
             data?.map(item=>(
              <ListingCard
              key={item.id}
               photo={item.photo as string}
                 description={item.description as string}
                  location={item.country as string} 
                   price={item.price as number}
                   userId={item.userId as string}
                   isInFavoriteList={item.favorite?.length>0?true:false}
                   favoriteId={item.favorite[0]?.id as string}
                   homeId={item.id as string}
                   pathName='/my-homes'
                   />
            ))
           }
          </div>
        )
      }
    </div>
  )
}


