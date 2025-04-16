import { ReactElement } from "react"

interface ButtonProps{
    variant : "primary" | "secondary" ,
    icon : ReactElement ,
    text : string ,
    onClick : ()=> void ,
}

const defaultStyles = {
    primary : "bg-purple-500 text-white" ,
    secondary : "bg-blue-100 text-purple-500"
}

export function Button (props : ButtonProps) {
    return <button className={`${defaultStyles[props.variant]} text-xl flex gap-2 pt-1 pb-1 px-1 rounded-md`}><span className="pt-1">{props.icon}</span>{props.text}</button>
}