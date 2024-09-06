
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MenuIcon } from 'lucide-react'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from 'next/link';
import { createAirbnbHome } from '@/static/actions';






const Usernav = async() => {
   

    const {getUser} = getKindeServerSession();
    const user = await getUser();

  const createHomeWithId = createAirbnbHome.bind(null,{userId:user?.id as string})
  return (
    <DropdownMenu>
  <DropdownMenuTrigger>
    <div className="rounded-full border px-2 py-2 lg:py-2 lg:px-4 flex items-center gap-x-3">
        <MenuIcon className='w-6 h-6 lg:w-5 lg:h-5'/>
        <img src={user?.picture ?? 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} alt='' className='rounded-full w-8 h-8 hidden lg:block'/>
    </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent align='end' className='w-[200px] '>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {
        !user?<>
<DropdownMenuItem>
    <RegisterLink>Register</RegisterLink>
    </DropdownMenuItem>
    <DropdownMenuItem>
    <LoginLink>Login</LoginLink>
    </DropdownMenuItem>
        </>:<>

        <DropdownMenuItem>
        <form action={ createHomeWithId} className="w-full">
            <button type='submit' className='w-full text-start'>Airbnb your home</button>
        </form>
    </DropdownMenuItem>
    <DropdownMenuSeparator/>
        <DropdownMenuItem>
        <LogoutLink>Log out</LogoutLink>
    </DropdownMenuItem>
    <DropdownMenuSeparator/>
        <DropdownMenuItem>
        <Link href={"/my-homes"} className='capitalize'>My Listenings</Link>
    </DropdownMenuItem>
    <DropdownMenuSeparator/>
        <DropdownMenuItem>
        <Link href={"/favorite"} className='capitalize'>Favorites</Link>
    </DropdownMenuItem>
    <DropdownMenuSeparator/>
        <DropdownMenuItem>
        <Link href={"/reservations"} className='capitalize'>reservations</Link>
    </DropdownMenuItem>
   
        </>
    }
   
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default Usernav