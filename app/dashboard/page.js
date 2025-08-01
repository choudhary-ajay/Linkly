import React from 'react'
import { auth,currentUser } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb';
import { redirect } from 'next/navigation';
import Link from 'next/link';
const Page = async () => {


  
    const user=await currentUser();
     
    if(!user){
      redirect("/")
    }

    const client=await clientPromise;
    const db=client.db("Linkly")
    const collection=db.collection("Links")

    const result =await collection.find({email:user.primaryEmailAddress.emailAddress}).toArray();
   
  return (<>
   
    <div className='bg-green-200 min-h-screen text-center flex flex-col gap-10 items-center'>
      
      <div className='flex flex-col gap-3 items-center justify-center my-44'>
       <div className='mb-5'> <h1 className='font-bold text-3xl '>Welcome {user.firstName}</h1>
       <p>{user.primaryEmailAddress.emailAddress}</p></div>
        <h1 className='font-bold text-2xl  mb-5'>Your Handles</h1>
        {result.length!=0 ?(result && result.map((item,index)=>{
          return(<Link  key={index} href={`/${item.handle}`} className='w-[300px] hover:scale-105 px-2 py-4 bg-gray-700 rounded-md  text-white font-semibold text-xl'>{item.handle}</Link>)
        })):(<div className='font-semibold'>You have not created any handle yet</div>)}
      </div>
    </div>
    </> 
  )
}

export default Page