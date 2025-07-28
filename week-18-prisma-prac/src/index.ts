import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() ;

async function updateDetails (username : string, password : string){
    
    const response = await prisma.user.update(
        {
            where : {
                username
            },
            data :{
                password
            }
        }
    )
}

async function getUserDetails(username:string){
    const res = await prisma.user.findFirst({
        where : {
            username
        },
        select : {
            username : true,
            id : true
        }
    })
    console.log(res);
}

async function insertTodo(username : string, title :string ){
    try {
        const res = await prisma.todo.create({
            data : {
                username,
                title
            }
        }) ;
        console.log(res);
    }
    catch(e){
        console.log (e);
    }
    
}

async function getTodos(username : string){
    const res = await prisma.todo.findMany({
        where : {username},
        select : {
            username: true,
            title : true,
            done: true
        }
    })
    console.log(res) ;
}


async function main (){
    await prisma.$connect() ;
}

main();
getTodos("test");
