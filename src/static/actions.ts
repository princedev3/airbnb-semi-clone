"use server";

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export const createAirbnbHome = async ({ userId }: { userId: string }) => {
  const existingHome = await prisma.home.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (existingHome === null) {
    const createHome = await prisma.home.create({
      data: {
        userId,
      },
    });
    return redirect(`/create/${createHome.id}/structure`);
  } else if (
    !existingHome.addCategory &&
    !existingHome.addLocation &&
    !existingHome.addDescription
  ) {
    return redirect(`/create/${existingHome.id}/structure`);
  } else if (existingHome.addCategory && !existingHome.addDescription) {
    return redirect(`/create/${existingHome.id}/description`);
  } else if (
    existingHome.addCategory &&
    existingHome.addDescription &&
    !existingHome.addLocation
  ) {
    return redirect(`/create/${existingHome.id}/address`);
  } else if (
    existingHome.addCategory &&
    existingHome.addDescription &&
    existingHome.addLocation
  ) {
    const createHome = await prisma.home.create({
      data: {
        userId,
      },
    });
    return redirect(`/create/${createHome.id}/structure`);
  }
};

export const createCategoty = async (formData: FormData) => {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName,
      addCategory: true,
    },
  });
  redirect(`/create/${homeId}/description`);
};

export const createDescription = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const homeId = formData.get("homeId") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const guests = formData.get("guest") as string;
  const bedrooms = formData.get("room") as string;
  const bathrooms = formData.get("bathroom") as string;
  const imageFile = formData.get("image") as File;

  const fileName = `${imageFile.name}-${Date.now()}`.replace(/\s+/g, "-");
  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, imageFile, {
      cacheControl: "2592000",
      contentType: imageFile.type,
    });

  const createData = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title,
      description,
      price: Number(price),
      photo: data?.path,
      guests,
      bedrooms,
      bathrooms,
      addDescription: true,
    },
  });

  redirect(`/create/${homeId}/address`);
};

export const createLocation = async (formData: FormData) => {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      country: countryValue,
      addLocation: true,
    },
  });
  redirect(`/`);
};

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.create({
    data: {
      userId,
      homeId,
    },
  });

  revalidatePath(pathName);
}

export async function deleteToFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.delete({
    where: {
      userId,
      id: favoriteId,
    },
  });

  revalidatePath(pathName);
}



export async function getReservation(formData: FormData){
    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    const data = await prisma.reservation.create({
        data:{
            homeId,userId,startDate,endDate
        }
    })
    redirect("/")
}


export async function deleteHome(formData: FormData){
    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
   
    const data = await prisma.home.deleteMany({
        where:{
            id:homeId,userId
        }
    })
    redirect("/")
}  