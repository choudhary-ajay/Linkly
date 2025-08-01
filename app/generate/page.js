"use client"
import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Page = () => {

  const searchparams=useSearchParams()
  const [links,setlinks]=useState([{link:"",linktext:""}])
  const [handle,sethandle]=useState(searchparams.get('handle'))
  const [pic,setpic]=useState("")
  const [desc,setdesc]=useState("")

  const router= useRouter();

  const {user,isSignedIn,isLoaded}=useUser()

  useEffect(()=>{
    if(isLoaded){
    if(!isSignedIn){
    router.push("/")
  }}
  },[isSignedIn])

  

  const handlechange= (index,link,linktext)=>{
    setlinks((initiallinks)=>{
      return initiallinks.map((item,i)=>{
        if(index==i){
          return {link,linktext}
        }
        else{
          return item
        }
      })
    })

  }
  const addlinks=()=>{
    setlinks(links.concat([{link:"",linktext:""}]))
  }

const submitlinks=async ()=>{
   const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "links": links,
  "handle":handle,
  "pic":pic,
  "desc":desc,
  "email":user.primaryEmailAddress.emailAddress
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const r=await fetch("http://localhost:3000/api/add", requestOptions)

  const result = await r.json()
  if(result.success){
  toast.success(result.message)
  sethandle("")
  setlinks([])
  setpic("")
  setdesc("")
  }
  else{
    toast.error(result.message)
  }
}
  return (
    <div className='sm:grid p-5 pt-32 sm:pt-0 sm:grid-cols-2 min-h-screen text-black bg-[#e9c0ea]'>
        <div className='flex flex-col justify-center items-center w-full gap-3'>
          <div className=''>
            <h1 className='font-bold text-4xl my-4'>Create your Linktree</h1>
            <div>
              <h2 className='font-semibold text-xl'>Step 1: Claim your handle</h2>
              <input value={handle || "" } onChange={(e)=>{sethandle(e.target.value)}} className='bg-white my-2 mx-5 p-1 px-2 rounded-3xl focus:outline-pink-300' type="text" placeholder='Choose a handle'></input>
            </div>
           <div>
            <h2 className='font-semibold text-xl'>Step 2: Add links</h2>
            {links && links.map((item,index)=>{
              return <div key={index}>
                <input value={item.linktext} onChange={(e)=>{handlechange(index,item.link,e.target.value)}} className='bg-white my-2 ml-5 p-1 px-2 rounded-3xl focus:outline-pink-300' placeholder='Enter link text'></input>
            <input value={item.link} onChange={(e)=>{handlechange(index,e.target.value,item.linktext)}} className='bg-white my-2 mx-3 p-1 px-2 rounded-3xl focus:outline-pink-300' placeholder='Enter link'></input>
              </div>
            })}
            
            <button onClick={()=>addlinks()} className='p-1 px-3 mx-5 bg-gray-900 rounded-3xl cursor-pointer text-white'>+ Add link</button>
           </div>
           <div className='flex flex-col'>
            <h2 className='font-semibold text-xl'>Step 3: Add picture And description</h2>
            <input value={pic} onChange={(e)=>setpic(e.target.value)} className='bg-white my-2 mx-5 p-1 px-2 rounded-3xl focus:outline-pink-300' placeholder="Enter link to your picture"></input>
            <input value={desc} onChange={(e)=>setdesc(e.target.value)} className='bg-white my-2 mx-5 p-1 px-2 rounded-3xl focus:outline-pink-300' placeholder="Enter description"></input>
            <button disabled={pic=="" || handle=="" || links[0].link=="" || links[0].linktext==""} onClick={()=>{submitlinks()}} className='p-1 w-fit px-3 disabled:bg-slate-600 mx-5 my-2 cursor-pointer bg-gray-900 rounded-3xl text-white'>Create your Linktree</button>
           </div>
           </div>
        </div>
        <div className='w-full h-screen object-fill flex items-center'>
            <img  alt='generate' className='h-[80%]' src="generate.webp"></img>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Page