import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const {username,password} = await req.json() ;
    const user = await prisma.user.findFirst({
        where : {
            username,
            password
        },
        select : {username : true}
    }) ;
    if (!user){
        return NextResponse.json({
            msg : "Invalid creds"
        })
    } ;
    return NextResponse.json({
        msg : "Signin Success",
        username : user.username
    })
}