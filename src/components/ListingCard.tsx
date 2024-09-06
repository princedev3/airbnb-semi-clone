import { useCountries } from '@/static/getCountries'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AddToFavoriteButton,DeleteFavoriteButton} from './SubmitButton'
import { addToFavorite, deleteToFavorite } from '@/static/actions'


interface HomeProps{
    photo:string,
    description:string,
    location:string,
    price:number,
    userId:string,
    isInFavoriteList:boolean,
    favoriteId:string,
    homeId:string,
    pathName:string
    key:string
}

const ListingCard = ({photo,description,location,price,userId,isInFavoriteList,favoriteId,pathName,key, homeId}:HomeProps) => {

    const { getCountryByValue } =useCountries()

    const country = getCountryByValue(location)


  return (  
    <div key={key} className='flex flex-col'>
   <div className="relative h-72 rounded-lg overflow-hidden">
    <Image src={`https://egmklnfxffzvdeghxjdy.supabase.co/storage/v1/object/public/images/${photo}`} alt='image ' fill className='object-cover h-full rounded-lg'/>
    {
      userId && (
        <div className="z-10 absolute top-2 right-2">
          {
            isInFavoriteList? (
              <form action={deleteToFavorite}  className="">
                <input type="text" className='hidden' name='favoriteId' value={favoriteId}/> 
                <input type="text" className='hidden' name='userId' value={userId}/> 
                <input type="text" className='hidden' name='pathName' value={pathName}/> 
                <DeleteFavoriteButton/> 
              </form>
            ):(
              <form  action={addToFavorite} >
                <input type="text" className='hidden' name='homeId' value={homeId}/> 
                <input type="text" className='hidden' name='userId' value={userId}/> 
                <input type="text" className='hidden' name='pathName' value={pathName}/> 
              <AddToFavoriteButton/>
            </form>
            )
          }
          
        </div>
      )
    }
   </div>
   <Link href={`/home/${homeId}`}  className='cursor-pointer'>
   <h3 className="font-medium text-base">{country?.flag}/ {country?.label} /{country?.regoin} </h3>
   <p className="text-muted-foreground text-base line-clamp-2">{description} </p>
   <p className="text-muted-foreground pt-2"><span className="font-medium text-black">${price}</span> Night </p>
   </Link>
    </div> 
  )
}
export default ListingCard