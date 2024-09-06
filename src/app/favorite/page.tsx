import ListingCard from '@/components/ListingCard'
import prisma from '@/static/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { unstable_noStore as noStore } from "next/cache";


const getData =async (id:string)=>{
  noStore()
 return   await prisma.favorite.findMany({
    where:{
      userId:id
    },
    include:{
      Home:true
      
    }
  })
}


export default async function Favorite () {



  const {getUser}=getKindeServerSession()
  const user = await getUser()
  if(!user?.id){
    redirect("/")
  }

  const data = await getData(user?.id)
 

 
  return (
    <div className='mx-auto px-5 lg:px-10 py-5 mt-10'>
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>
      {
        data.length===0? (
          <div className="">No Items</div>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 ">

           {
             data?.map(item=>(
              <ListingCard
              key={item.id}
               photo={item.Home.photo as string}
                 description={item.Home.description as string}
                  location={item.Home.country as string} 
                   price={item.Home.price as number}
                   userId={item.userId as string}
                   isInFavoriteList={item.Home.id===item.homeId?true:false}
                   favoriteId={item.id  as string}
                   homeId={item.Home.id as string}
                   pathName='/favorite'
                   />
            ))
           }
          </div>
        )
      }
    </div>
  )
}


