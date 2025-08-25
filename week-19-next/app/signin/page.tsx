"use client"
import { useState } from "react";
import prisma from "../lib/db";
import axios from "axios";


export default function Signin(){
    const [isSignedIn,setIsSignedIn] = useState(false) ;
    const [username,setUsername] = useState("") ;
    const [password,setPassword] = useState("") ;

    async function handleSignin(){
        const res = await axios.post("http://localhost:3000/api/v1/signin",{
            username,
            password
        }) ;
        console.log(res.data) ;
        if (res.data){
            setIsSignedIn(true) ;
        }
        else{
            alert("Invalid Creds / Sign In Failed") ;
        }
    }

    return (<div className="h-screen flex justify-center items-center">
        {isSignedIn ? <div>Signed In</div>:<div className="flex flex-col gap-4 border-1 p-4 rounded-lg">
            <input className="border-1 p-2 rounded-sm" type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
            <input className="border-1 p-2 rounded-sm" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="rounded-md bg-amber-600" onClick={handleSignin}>Signin</button>
        </div>}
        
        
    </div>)
}