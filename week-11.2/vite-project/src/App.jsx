import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useContext } from 'react'
import { createContext } from 'react'
import { RecoilRoot , atom ,selector, useRecoilValue, useSetRecoilState, useRecoilState} from "recoil"
import { countAtom } from './store/atoms/countAtom'
import {newtorkSelector} from './store/selectors/network'
import {jobSelector} from './store/selectors/jobs'
import {notificationSelector} from './store/selectors/notifications'

function Buttons(){
  const setCount = useSetRecoilState(countAtom) ;
  return <div>
    <button onClick = {()=>{setCount((prev)=>({...prev,jobsCount : prev.jobsCount+1}))}}>increase Job Count</button>
    <button onClick = {()=>{setCount((prev)=>({...prev,networkCount : prev.networkCount+1}))}}>increase network Count</button>
    <button onClick = {()=>{setCount((prev)=>({...prev,notificationCount : prev.notificationCount+1}))}}>increase notification Count</button>
  </div>
}

function NetworkCount(){
  const count1 = useRecoilValue(newtorkSelector);
  return (<div>
    <p> network Count : {count1}</p>
  </div>)
}

function JobsCount(){
  const count1 = useRecoilValue(jobSelector);
  return (<div>
    <p> jobs Count : {count1}</p>
  </div>)
}

function NotificationCount(){
  const count1 = useRecoilValue(notificationSelector);
  return (<div>
    <p> notifications Count : {count1}</p>
  </div>)
}

function Parent(){
  return (<>
  <div>
    <NetworkCount/>
    <NotificationCount/>
    <JobsCount/>
  </div>
  </>
  )
}

function App() {
  
  return (
    <>
      <div>
      <RecoilRoot>
        <Parent/>
        <Buttons/>
      </RecoilRoot>
      </div>
    </>
  )
}

export default App
