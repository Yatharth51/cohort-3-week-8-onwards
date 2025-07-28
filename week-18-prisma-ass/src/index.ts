import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import dotenv from "dotenv" ;
import * as z from "zod" ;
import * as jwt from "jsonwebtoken"
import userMiddleware from "./middleware";
dotenv.config() ;
const app = express();
const PORT = process.env.PORT ;
const KEY = process.env.JWT_KEY ;
const prisma = new PrismaClient() ;

app.use(express.json()) ;
/*
Try creating a todo application that let’s a user signup, put todos and fetch todos. 
*/

interface AuthRequest extends Request {
    userid?: number
}

app.post('/signup',async (req,res)=>{
    const requiredBody = z.object({
        username : z.string().min(3).max(16),
        email : z.email(),
        password : z.string().min(5).max(25)
    })

    const {username, password, email} = req.body;
    const result = requiredBody.safeParse({username,email,password});
    if (!result.success){
        res.json({
            error : result.error
        }) ;
        return ;
    }
    else{
        const response = await prisma.user.create({
            data : {
                username,
                email,
                password
            }
        }) ;
        res.json({
            msg : "signup success",
            response
        })
    }
    return ;
})

app.post('/login',async (req,res)=>{
    const {username,password} = req.body ;

    const response = await prisma.user.findFirst({
        where : {
            username,
            password
        }
    }) ;

    const token = jwt.sign({id : response?.id}, KEY as string);

    if (response){
        res.json({
            msg : "login successful" ,
            token
        })
    }
    else{
        res.json({
            msg : "login failed either username wrong or password wrong"
        })
    }

    return ;
})

app.post('/add-todo',userMiddleware, async (req: AuthRequest, res: Response)=>{
    const userId = req.userid as number;
    const {title}:{title : string} = req.body ;
    const response = await prisma.todo.findFirst({
        where :{
            userId : userId, 
            title : title
        }
    }) ;
    if (response){
        res.json({
            msg : "todo already added"
        })
    }
    else{
        const addData = await prisma.todo.create({
            data : {
                userId,
                title
            }
        }) ;
        res.json({
            msg : addData
        })
    }
    return ;
})  

app.get('/todos',userMiddleware,async (req:AuthRequest,res)=>{
    const userId = req.userid ;
    try {
        const todos = await prisma.todo.findMany({
            where : {
                userId
            } ,
            select : {
                title : true,
                done : true,
                userId : true
            }
        }) ;
        const username = await prisma.user.findFirst({
            where : {
                id : userId
            },
            select : {
                username : true
            }
        })
        res.json({
            todos,
            username
        }) ;
    }
    catch(e){
        res.json({
            msg : e
        })
    }
    return ;
})

async function main(){
    await prisma.$connect();
    app.listen(PORT,()=>{
        console.log(`Listening on Port ${PORT}`) ;
    })
}

main() ;