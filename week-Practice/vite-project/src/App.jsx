import { createContext, useEffect, useReducer, useRef, useState } from 'react'
import './App.css' 
import {RecoilRoot,useSetRecoilState,useRecoilValue,atom} from "recoil" ;

const countAtom = atom({
  key : "counter",
  default : 0
}) ;

function IncreaseCountButton(){
  const setCount = useSetRecoilState(countAtom) ;
  return <button onClick={()=>setCount(c=>c+1)}>Press to increase Count</button>
}

const Counter = () => {
  const count = useRecoilValue(countAtom) ;
  return <div>{count}</div>
}


export default function App(){
  return (<div>
  <RecoilRoot>
    <Counter/>
    <IncreaseCountButton/>
  </RecoilRoot>
  </div>)
}