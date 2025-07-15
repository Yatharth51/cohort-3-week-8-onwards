
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient() ;

async function getUserDetails(){
    const response = await client.user.findFirst({
        where:{
            id : 1
        },
        select : {
            username : true,
            age : true
        }
    })
    console.log(response);
    
}

getUserDetails();