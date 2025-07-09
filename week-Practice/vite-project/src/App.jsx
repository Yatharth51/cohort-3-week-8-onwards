import { useState } from 'react'
import './App.css' 
import {atom,useRecoilValue,useSetRecoilState,RecoilRoot} from "recoil"

const Atom = atom({
    key : 'Count',
    default : 0
  }) ;

function Count(){
  const count = useRecoilValue(Atom) ;
  return (<div>{count}</div>) ;
}

function UpdateCountButton(){
  const setCount = useSetRecoilState(Atom);
  return (<button onClick={()=>setCount(c=>c+1)}>Press to Increase</button>) ;
}


export default function App(){

  return (
    <RecoilRoot>
      <Count/>
      <UpdateCountButton />
    </RecoilRoot>
    
  )
}