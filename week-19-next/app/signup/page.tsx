"use client"

import axios from "axios";
import { useState } from "react"
import prisma from "../lib/db";
import { useRouter } from "next/navigation";


export default function Signup(){
    const [username,setUsername] = useState("") ;
    const [password,setPassword] = useState("") ;
    const router = useRouter() ;

    return (<div className="h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 border-1 p-4 rounded-lg">
            <input className="border-1 p-2 rounded-sm" type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/>
            <input className="border-1 p-2 rounded-sm" type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className="rounded-md bg-amber-600" onClick={()=>{
                axios.post("http://localhost:3000/api/v1/signup",{
                    username,
                    password
                }) ;
                router.push('/signin')
            }}>Signup</button>
        </div>
        
    </div>)
}