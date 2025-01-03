import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {

  return (
    <div>
      <Card>
        <h1>hi there</h1>
      </Card>
      <Card>
        <h1>ock u</h1>
      </Card>
    </div>
  )
}

const Card = ({children})=>{
  return (<div style = {{backgroundColor: "grey" , margin: 10 , padding : 10, color : 'white'}}>
    {children}
  </div>)
}

export default App
