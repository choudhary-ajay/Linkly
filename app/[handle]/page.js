import Link from "next/link"
import { notFound } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function page({params}){
    const handle=(await params).handle

    const client =await clientPromise
    const db= client.db("Linkly")
    const collection=db.collection("Links")

    const item=await collection.findOne({handle:handle})

    if(!item){
      return notFound()
    }


    return <>{ item && <div className="min-h-screen bg-purple-300 text-black flex flex-col items-center">
        <div className="flex justify-start items-center  p-5 flex-col">
            <img className="w-[100px] h-[100px] object-cover object-top border border-black rounded-full" src={item.pic}></img>
           <span className="text-xl my-2 font-bold">@{item.handle}</span>
        </div>
        <div className="flex flex-col gap-3 items-center my-2">
            <p className="font-semibold w-[400px] text-center">{item.desc}</p>
            {item.links.map((data,i)=>{
                return <Link target="_blank" href={data.link} key={i} className="bg-white inset-shadow-black w-[380px] py-3 rounded-md font-semibold text-xl px-2 hover:scale-105 text-center">{data.linktext}</Link>
            })}
        </div>
    </div>}</>
}