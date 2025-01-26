import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken" ;
import dotenv from "dotenv" ;
dotenv.config() ;
const jwt_secret = process.env.token_secret ;

export const userMiddleware = (req : Request,res : Response,next : NextFunction) =>{
    const token = req.headers["authorization"] ;
    const verified = jwt.verify(token as string,jwt_secret ) ;
    if (!verified){
        res.status(403).json({
            msg : "not signed in " 
        })
        return ;
    }
    // @ts-ignore
    req.userid = verified.id ;
    next() ;
}