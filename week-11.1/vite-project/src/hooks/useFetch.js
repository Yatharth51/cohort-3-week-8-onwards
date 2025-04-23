import { useEffect, useState } from "react";

export default function useFetch(url){
    
    const [data,setData] = useState(null) ;
    const [loading,setLoading] = useState(false) ;

    async function getData(){
        setLoading(true) ;
        const response = await fetch(url) ;
        const dataRec = await response.json() ;
        setData(dataRec) ; 
        setLoading(false) ;
    }
    useEffect(()=>{
        getData();
    },[url])

    return {
        data,
        loading
    }
}