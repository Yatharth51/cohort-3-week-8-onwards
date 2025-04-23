import { useEffect } from "react";

export function useDebounce (inputVal){
    
    useEffect(() => {
      const clock = setTimeout(()=>{
        console.log("backend req sent")
      },5000)

      return () => {
        clearTimeout(clock) ;
      }
    }, [inputVal])
    
    return {
        inputVal
    }

}