import { createContext,useContext } from 'react';
import { useState } from 'react'
import {BulbProvider,BulbContext} from './bulbProvider'
import './App.css'

// const BulbContext = createContext() ;

// function BulbProvider({children}){
//   const [isBulbOn, setBulbState] = useState(true) ;
//   return (<>
//     <BulbContext.Provider value = {{
//       isBulbOn : isBulbOn ,
//       setBulbState : setBulbState
//     }}>
//       {children}
//     </BulbContext.Provider>
//   </>)
// }

function App() {
  
  return (
    <>
      <LightBulb/>
    </>
  )
}

function LightBulb(){

  return <div>
    <BulbProvider>
      <BulbState />
    <ToggleBulbState />
    </BulbProvider>
  </div>
}

function BulbState(){
  const {isBulbOn} = useContext(BulbContext) ;
  return (<div>
    {isBulbOn ? "bulb is on" : "bulb is off"}
  </div>)
}

function ToggleBulbState(){
  const {isBulbOn,setBulbState} = useContext(BulbContext) ;
  return (<div>
    <button onClick = {()=>{setBulbState(!isBulbOn)}}>Click to change bulb state</button>
  </div>)
}


export default App
