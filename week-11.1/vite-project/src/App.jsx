import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useContext ,createContext} from 'react'
import { useEffect,useRef } from 'react'


function useFetch (url){
  const [data,setData] = useState(null) ;
  const[isLoading,setLoading]= useState(true) ;
  useEffect(()=>{
    async function getData(){
      setLoading(true) ;
      const response = await fetch(url) ;
      const json = await response.json() ;
      setData(json) ;
      setLoading(false) ;
    }
    getData();
  },
    [url])
    return {
      data ,
      isLoading
    }
}

function usePrev(value){
  const ref = useRef() ;
  useEffect(()=>{
    ref.current = value ;
  },[value])

  return ref.current ;
}

function useDebounce(value){
  const [debouncedValue,setDebouncedValue] = useState(value) ;
  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedValue(value) ;
    },200)
    return ()=>{
      clearTimeout(handler) ; 
    }
  },[value]) ; 

  return debouncedValue ;
  
}

function App() {
  const [val,setVal] = useState(null) ;
  const debouncedVal = useDebounce(val) ;
  function update(e){
    setVal(e.target.value) ;
  }
  
  useEffect(()=>{
    console.log(val);
  },[debouncedVal])
  return <div>
    <input type = {"text"} placeholder = {"enter val"} onChange = {update}></input>
  </div>

}

export default App
