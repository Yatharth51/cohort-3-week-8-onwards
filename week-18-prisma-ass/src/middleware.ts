import dotenv from "dotenv" ;
dotenv.config() ;
import * as jwt from "jsonwebtoken" ;
import { Request, Response, NextFunction } from "express";
const KEY = process.env.JWT_KEY as string ;

interface AuthRequest extends Request {
    userid?: number
}

export default function userMiddleware(req : AuthRequest, res : Response, next: NextFunction){
    const token = req.headers.token ;
    try{
        const status = jwt.verify(token as string,KEY) as {id : number};
        req.userid = status.id;
        next() ;
    }
    catch(e){
        res.json({
            msg : "user not logged in"
        })
    }
    
}