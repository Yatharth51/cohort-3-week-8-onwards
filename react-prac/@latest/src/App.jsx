import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
const ClockContext = createContext();
const tw = 'cursor-pointer border-2 p-1 bg-slate-200';

function Button() {
  let inter = useRef();
  const { setTimer } = useContext(ClockContext);

  function onStart() {
    console.log("clock started");
    inter.current = (setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000));
  }

  function onPause() {
    console.log("clock paused");
    clearInterval(inter.current);
  }

  return (<>
    <button className={tw} onClick={onStart}>Start</button>
    <button className={tw} onClick={onPause}>Pause</button>
  </>
  )
}

function Clock() {

  const [timer, setTimer] = useState(0);

  return (
    <div className='flex gap-2 m-2 text-2xl'>
      <div className={tw}>{timer}</div>
      <ClockContext.Provider value={{ setTimer: setTimer }}>
        <Button />
      </ClockContext.Provider>

    </div>
  )

}

function App() {
  return (
    <div>
      <Clock />
    </div>
  )
}

export default App
