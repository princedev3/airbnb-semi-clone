import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Usernav from './Usernav'
import SearchComponent from './SearchComponent'

const Navbar = () => {
  return (
    <nav className='w-full border-b'>
        <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
            <Link href={"/"}>
               <Image src={"/logo.png"} alt='' className='' width={40} height={40}/>
            </Link>
           <SearchComponent/>
            <Usernav/>
        </div>
    
    </nav>
  )
}

export default Navbar