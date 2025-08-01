"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import { UserButton, SignInButton, SignedIn, SignedOut,SignUpButton } from '@clerk/nextjs';


export default function Home() {
  const [text,settext]=useState("")

  const {user,isSignedIn}=useUser();

  const router=useRouter();

  const createtree=()=>{
    if(!isSignedIn){
      toast.error("Please Sign In first")
    }
    else{
    router.push(`/generate?handle=${text}`)
    }
  }
  return (
    <main>
      <section className="min-h-[130vh] pt-35 lg:pt-0 bg-[#254f1a]   lg:grid lg:grid-cols-2 items-center">
        <div className="ml-[10vw] mr-[10vw] lg:mr-0">
          <p className="text-7xl font-bold text-yellow-300">Everything you are. In one, simple link in bio.</p>
          <p className="text-xl text-white fonnt-bold">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, 
            curate and sell
             from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
             <div className="flex flex-col md:flex-row text-black gap-3 my-4">
              <input value={text} onChange={(e)=>{settext(e.target.value)}} className="px-4 py-5 w-[370px] text-lg bg-white border-none rounded-md" type="text" placeholder="link.ly/"></input>
              <button onClick={()=>{createtree()}} className="p-5 w-fit font-semibold text-lg bg-purple-300 rounded-full cursor-pointer">Claim your link page</button>
             </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="home.png" className="homeimage h-[80vh]"></img>
        </div>
      </section>
      <section className="min-h-[110vh] bg-[#ff9414] grid grid-cols-2 justify-center">
        <div className="flex justify-center items-center">
          <img className="h-[80vh]" src='bottom.png'></img>
        </div>
        <div className="mr-[10vw] flex flex-col justify-center ">
          <h1 className="font-bold text-7xl">Get All your Links in a page in free by simply sign in.</h1>
          <p className="font-bold text-xl my-2 text-white">Sign in to create your link page</p>
          <div className="flex gap-3 my-2">
            <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
               <SignInButton className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"/>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </main>

  );
}
