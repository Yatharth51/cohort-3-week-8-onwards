import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Button'
import { CiShare2 } from "react-icons/ci";

function App() {

  return (
    <div className='bg-gray-800 min-h-[100vh]'>
      <div className='flex gap-4'>
        <Button variant='secondary' icon = {<CiShare2 />} text = "Share Brain" onClick={()=>{}} />
      <Button variant='primary' icon = {<CiShare2 />} text = "Add Content" onClick={()=>{}} />
      </div>
      
    </div>
  )
}

export default App
