import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [counter,setCounter] = useState(0) ;
  return (<div>
    <Counter count = {counter} setCounter = {setCounter}/>
  </div>)
}

function Counter(props){

  useEffect(function(){

    const interval = setInterval(()=>{
      props.setCounter(c=>c+1) ;
    },1000)

    return function (){
      clearInterval(interval);
    }
  },[props.count])

  return (<div>
    Counter {props.count}
  </div>)
}


export default App
