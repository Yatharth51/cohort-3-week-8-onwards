import express from "express"  
const app = express() ;
import mongoose from "mongoose"
app.use(express.json()) ;
import dotenv from "dotenv" 
import zod from "zod";
import bcrypt from "bcrypt"
import { userModel } from "./db";
dotenv.config() ;
const mongo_url = process.env.mongo_url ;


app.post('/api/v1/signup',async (req,res)=>{
    const {username,password} = req.body ;
    const userFound = await userModel.findOne({
        username
    }) ;
    if (userFound){
        res.status(403).json({
            msg: "user already exists"
        });
        return ;
    }
    const requiredBody = zod.object({
        username : zod.string().min(3).max(10),
        password : zod.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/)
    })

    const isDataValid = requiredBody.safeParse(req.body) ;
    if (!isDataValid.success){
        res.status(411).json({
            msg : "error in inputs"
        })
        return ;
    }
    const hashedPass = await bcrypt.hash(password,10) ;
    const data = await userModel.create({
        username,
        password : hashedPass
    }) ;

    if (data){
        res.status(200).json({
            msg : "signed up"
        });
        return ;
    }

    res.status(500).json({
        msg : "server error"
    }) ;
    
})

app.post('api/v1/signin',async (req,res)=>{
    const {username,password} = req.body ;
    const foundData = 
})

async function main(){
    await mongoose.connect(mongo_url as string) ;

    app.listen(3000,(e)=>{
        if (e) {
            console.log(e) ;
            return ;
        }
        else{
            console.log("listening on port 3000") ;
        }
    })
}

main() ;