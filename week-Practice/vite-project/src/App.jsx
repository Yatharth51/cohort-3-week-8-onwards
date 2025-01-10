import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Count } from './components/counts'
import { RecoilRoot } from 'recoil'
import { Buttons } from './components/buttons'

function App() {


  return (
    <>
    <RecoilRoot>
      <Count/>
      <Buttons/>
    </RecoilRoot>
      
    </>
  )
}

export default App
