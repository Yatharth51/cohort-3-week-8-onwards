import { useState,useEffect } from "react";

function App(){

  const [count,setCount] = useState(0) ;

  function onClick(){
    setCount(count=>count+1);
  }

  return <div>
    <Counter count = {count}/>
    <button onClick = {onClick}>Press</button>
  </div>
}

function Counter(props){

  useEffect(()=>{
    console.log("mounting call");
    return ()=>{
      console.log("inside return");
    }
  },[props.count])

  return <div>
    <h1>{props.count}</h1>
  </div>
}


export default App ;