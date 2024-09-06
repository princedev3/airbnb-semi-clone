import ListingCard from "@/components/ListingCard";
import MapFilterItem from "@/components/MapFilterItem";
import { Button } from "@/components/ui/button";
import prisma from "@/static/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { filter: string,country?:string,guest?:string,room?:string,bathroom?:string };
}) {
  
  const {getUser}=getKindeServerSession()
  const user = await getUser()

  const data = await prisma.home.findMany({
    where: {
      addCategory: true,
      addLocation: true,
      addDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
      
    },
    include:{
      favorite:{
        where: {
          userId: user?.id ?? undefined,  
        },
      }
    }
  });


  const myArray = new Array(3).fill(0);
  return (
    <div className="mx-auto px-5 lg:px-10 py-5">
      <div className=" h-[20vh]  w-full">
        <MapFilterItem />
      </div>
      <Suspense
        key={searchParams?.filter}
        fallback={<p className="text-xl font-semibold text-black">loading</p>}
      >
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.length ? (
            <>
              {data.map((item) => (
                <ListingCard
                userId={item.userId as string}
                  key={item.id}
                  photo={item.photo as string}
                  description={item.description as string}
                  price={item.price as number}
                  location={item.country as string}
                  favoriteId={item.favorite[0]?.id}
                  isInFavoriteList={item.favorite.length>0?true:false}
                  homeId={item?.id as string}
                  pathName="/"
                />
              ))}
            </>
          ) : (
            <>
              {myArray.map((item) => (
                <div className="flex flex-col animate-pulse" key={item}>
                  <div className="relative h-72 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    <p className="text-center font-semibold text-foreground">
                      No house found
                    </p>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              ))}
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
}


