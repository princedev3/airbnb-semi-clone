import { useCountries } from '@/static/getCountries'
import prisma from '@/static/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import CategoryShowcase from '@/components/CategoryShowcase'
import HomeMap from '@/components/HomeMap'
import { SelectCalender } from '@/components/SelectCalender'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { deleteHome, getReservation } from '@/static/actions'
import DateButton from '@/static/DateButton'
import { Trash } from 'lucide-react'
import { unstable_noStore as noStore } from "next/cache";


const HomePage = async({params}:{params:{id:string}}) => {
    const {getUser}=getKindeServerSession()
    const user = await getUser()



    if(!user.id){
      redirect("/")
    }
    noStore()
    const data = await prisma.home.findUnique({
        where:{
           id:params.id
        },
        include:{
            user:true,
            reservation:{
              where:{
                homeId:params.id 
              }
            }
        } 
    })


    const {getAllCountries, getCountryByValue  }= useCountries()
    const country = getCountryByValue(data?.country as string)
  return (
    <div className="w-[75%] mx-auto my-10">
        <h1 className="font-medium text-2xl mb-5">{data?.title} </h1>
        <div className="relative h-[450px] " >
        <Image src={`https://egmklnfxffzvdeghxjdy.supabase.co/storage/v1/object/public/images/${data?.photo}`} alt='image ' fill className='object-cover h-full rounded-lg'/>
        

        {
          data?.userId === user?.id  &&
        <form action={deleteHome} className="z-20  absolute right-2 top-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
            <Button type='submit' className=' '>
            <input type="hidden" value={user.id} name='userId' />
            <input type="hidden" value={data?.id} name='homeId' />
          <Trash className=''/>
            </Button>
          </form>
        }
      
        </div>
        <div className="flex justify-between gap-x-24 mt-8">
                   <div className="w-2/3">
                   <h3 className="text-xl font-medium">{country?.flag} {country?.label}/ {country?.regoin} </h3>
                   <div className="flex gap-x-2 text-mutes-foreground">
                    <p className="">{data?.guests} </p> *  <p className="">{data?.bathrooms} </p> * <p className="">{data?.bedrooms} </p>
                   </div>
                   <div className="flex items-center mt-6">
                  <img src={data?.user?.profileImage ?? ""} alt='user image'  className='object-cover w-11 h-11 rounded-full'/>
                  <div className="flex flex-col ml-4">
                    <h3 className="font-medium"></h3>
                    <p className="text-sm text-muted-foreground"> </p>
                  </div>
                   </div>
                   </div>
                   <form action={getReservation} >
                    <input type="text" className='hidden' value={user.id} name='userId' />
                    <input type="text" className='hidden' value={params.id} name='homeId' />
                   <SelectCalender reservation={data?.reservation as []} />
                  {
                    user ? (

                 <DateButton/>
              
                     
                    ):(
                      < >
                      <Button asChild className='w-full'>

                      <Link href={"/api/auth/login"}>Login to make a reservation</Link>
                      </Button>
                      </>
                    )
                  }
                
                   </form>
        </div>
                   <Separator className='my-7' />
                   <CategoryShowcase categoryName={data?.categoryName as string} />
                   <Separator className='my-7' />
            
                   <p className="text-muted-foreground">{data?.description} </p>
                   <Separator className='my-7' />
                   < HomeMap locationValue={country?.value as string} />
    </div>
  )
}

export default HomePage