import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useContext, createContext } from 'react'
import { useEffect, useRef } from 'react'
import { usePrev } from './hooks/usePrev'
import { useDebounce } from './hooks/useDebounce'





function App() {
  const [val,setVal] = useState(null);
  const finalVal = useDebounce(val);
  return(<>
  <input type = "text" value = {val} onChange={(e)=>{setVal(e.target.value)}}></input>
  <div>Current value {val}</div>
  </>)
}

export default App
