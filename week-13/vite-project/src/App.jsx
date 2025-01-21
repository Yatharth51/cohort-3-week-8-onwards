import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavBar } from './components/sidebar'
import { Image } from './components/headerImg'
import { Dashboard } from './components/Dashboard'

function App() {

  return (
    <>
    <div className='flex w-full'>
      <NavBar/>
      <div className="max-h-60 max-w-auto">
        <Image/>
        <Dashboard/>
      </div>
    </div>
      
    </>
  )
}

export default App
