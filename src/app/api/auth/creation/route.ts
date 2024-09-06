import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/static/prisma";


export const GET= async(req:NextRequest)=>{
    try {
        noStore()
        const {getUser} = getKindeServerSession();
const user = await getUser()
if(!user || !user.id||  user===null){
    throw new Error("something went wrong")
}
const userlogin = await prisma.user.findUnique({
    where:{
        id:user.id
    }
})

if(!userlogin ){
  const   dbuser = await prisma.user.create({
        data:{
            id:user.id,
            email: user?.email ?? "",
            firstname: user?.given_name ?? "",
            lastname: user?.family_name ?? "",
            profileImage:user?.picture?? `https://avatar.vercel.sh/${user?.given_name}`
        }
    })
}
return NextResponse.redirect(`http://localhost:3000`)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:"can not get user"}),{status:500})
    }
}