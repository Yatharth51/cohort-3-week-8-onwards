import { useState , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [timer,setTimer] = useState(0); 
  const interval = useRef() ;
  function startTimer(){
    let value  = setInterval(()=>{
      setTimer(timer=>timer+1)
    },1000)
    interval.current = value;
  }
  function stopTimer(){
    clearInterval(interval.current);
  }

  return (
    <div>
      <button onClick = {startTimer}> Start Timer  </button> 
      <div style = {{margin: 10}}>{timer}</div>
      <button onClick = {stopTimer}> Stop Timer  </button>
    </div>
  )
}




export default App
