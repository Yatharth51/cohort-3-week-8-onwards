import { useRef } from "react";

export function Otp(){
    const refs = Array.from({length:5},()=>useRef()) ;
    return <div className="flex gap-3 justify-center pt-48">
        {refs.map((ref,index)=>{
            return (
                <OtpButton key = {index} reference ={ref} onUp = {()=>{ if(index-1<refs.length) refs[index+1].current.focus() }} onDown = { ()=>{ if(index>0) refs[index-1].current.focus();  }}  />
            )
        })}    
    </div>
}

function OtpButton({
    reference,
    onUp,
    onDown
}){

    const handleKeyDown = (e) => {
        if (e.key == "Backspace" && !e.target.value){
            onDown() ;
        }
        else if (e.key== "ArrowRight"){
            onUp() ;
        }
        else if (e.key== "ArrowLeft"){
            onDown() ;
        }
    }

    const handleKeyChange = (e) => {
        if (e.target.value.length === 1){
            onUp() ;
        }
    }

    return (<input type = "text" ref = {reference} onChange={handleKeyChange} onKeyDown={handleKeyDown} className="bg-slate-600 max-w-16 min-h-20 rounded-lg outline-none text-white text-center">
    </input>)
}