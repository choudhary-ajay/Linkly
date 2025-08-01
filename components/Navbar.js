"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { UserButton, SignInButton, SignedIn, SignedOut,SignUpButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const path=usePathname();
  const showNavbar=["/","/generate","/dashboard"].includes(path);
  const [dropdown, setdropdown] = useState(true)
  const handledropdown = () => {
    setdropdown(!dropdown)
  }

  const {isSignedIn,user}=useUser();
  return (
   <>{showNavbar && <nav className='w-[80vw] top-10 right-[10vw] fixed flex bg-gray-600  justify-between p-5 px-7 items-center rounded-4xl'>
    <div className='flex gap-16 items-center'>
      <div>
    <span className='text-5xl text-white font-bold'>Link</span><span className='text-5xl text-green-400 font-bold'>ly</span>
    </div>
    
    </div>
    <div className='flex gap-5 '>
      {isSignedIn && <ul className='flex gap-4 items-center '>
      <li><Link className='p-2 hidden md:block text-white font-bold ' href={"/"}>Home</Link></li>
      <li><Link className='p-2 hidden md:block text-white font-bold ' href={"/dashboard"}>Dashboard</Link></li>
      <li><Link className='p-2 hidden md:block text-white font-bold ' href={"/generate"}>Generate</Link></li>
    </ul>}
         <SignedOut>
        <SignInButton className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"/>
        <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
      </SignedOut>
      <SignedIn redirectUrl="/dashboard">
      <button onClick={handledropdown} onBlur={() => { setTimeout(() => { setdropdown(true) }, 300) }}  className='md:hidden text-white'><IoMdMenu /></button>
        <UserButton  className='text-3xl cursor-pointer' />
      </SignedIn>
       {dropdown ? "" : <div id="dropdown" className="z-10 absolute right-28 top-8 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/generate`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Generate</Link>
                </li>
                <li>
                  <Link href={"/"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                </li>
        
              </ul>
            </div>
            }
    </div>
      
   </nav>}</>
  )
}

export default Navbar