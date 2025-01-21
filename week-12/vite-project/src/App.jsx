import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Component } from './components/comp1'
import { Otp } from './components/Otp'


function App() {

  return (
    <><div className='h-screen w-full bg-cyan-950'>
      <Otp/>
    </div>
    
    </>
  )
}

export default App
