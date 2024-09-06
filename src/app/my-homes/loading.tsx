import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='container mx-auto px-5 lgpx-10 mt-10'>
       
         <h2 className=" text-gray-600 text-3xl font-semibold tracking-tighter ">Your Favorites</h2>
         <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-8">

         <div className="flex flex-col animate-pulse">
                  <div className="relative h-72 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    <p className="text-center font-semibold text-foreground">
               
                    </p>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>


                <div className="flex flex-col animate-pulse">
                  <div className="relative h-72 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    <p className="text-center font-semibold text-foreground">
          
                    </p>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>


                <div className="flex flex-col animate-pulse" >
                  <div className="relative h-72 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    <p className="text-center font-semibold text-foreground">
            
                    </p>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>

                <div className="flex flex-col animate-pulse" >
                  <div className="relative h-72 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    <p className="text-center font-semibold text-foreground">
           
                    </p>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
         </div>
    </div>
  )
}

export default loading