import clientPromise from "@/lib/mongodb";

export async function POST(request){
    try{
        const body=await request.json()
        const client=await clientPromise;
        const db=client.db("Linkly")
        const collection =db.collection("Links")
        
        const doc= await collection.findOne({handle:body.handle})

        if(doc){
            return Response.json({success:false,message:"Handle already existed"})
        }

        
        const result=await collection.insertOne(body)
        return Response.json({success:true,message:"your linktree has been generated",result:result})
    }catch(error){
        return Response.json({success:false,message:error.message})
    }
    
}