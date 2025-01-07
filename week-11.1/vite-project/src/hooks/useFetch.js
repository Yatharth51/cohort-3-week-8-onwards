import { useEffect } from "react";
import { useState } from "react";


export function useFetch(url){
    const [data,setData] = useState(null) ;

    async function getResponse (){
        const reponse = await fetch(url) ;
        const json = await reponse.json() ;
        setData(json) ;
    }
    
    useEffect(()=>{getResponse()},[]) ;
    return {
        data
    }
}