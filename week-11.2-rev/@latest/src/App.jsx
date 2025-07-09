import { useState,memo } from 'react' 
import './App.css'
import {useRecoilValue, useSetRecoilState,RecoilRoot,atom,selector} from "recoil"

const countAtom = atom({
  key : "count",
  default : {
    notificationCount : 0,
    jobCount : 0
  }
})

const notifSelector = selector({
  key : "notificationCount",
  get : ({get})=> {
    const atom = get(countAtom) ;
    return atom.notificationCount ;
  }
});
const JobSelector = selector({
  key : "jobCount",
  get : ({get})=> {
    const atom = get(countAtom) ;
    return atom.jobCount ;
  }
});

const isEvenSelector = selector({
  key : "isEven",
  get : ({get})=>{
    const atom = get(countAtom) ;
    return !(atom.notificationCount%2) ;
  }
}) ;

const Buttons = ()=>{
  const setCount = useSetRecoilState(countAtom);
  return (<div><button onClick={()=>{setCount((prev)=>({...prev,notificationCount:prev.notificationCount+2}))}}>{"Increase Notif Count"}</button>
    <button onClick={()=>{setCount((prev)=>({...prev,jobCount:prev.jobCount+1}))}}>Increase Job Count</button>
    </div> );
}

const Buttons2 = () =>{
  const setNotifCount = useSetRecoilState(notifSelector) ;
  return (<div><button onClick={setNotifCount(p=>p+1)}>Increase notif count</button></div>)
}

const Display= ()=>{
  const notifcount = useRecoilValue(notifSelector) ;
  return (<div>Notification Count : 
  {notifcount}</div>)
}

function Display2(){
  const jobCount = useRecoilValue(JobSelector) ;
  return (<div>Job Count : {jobCount}</div>)
}

function IsEven(){
  const ifEven = useRecoilValue(isEvenSelector) ;
  return (<div>{ifEven? "notificaion COunt is even" : "notif count is odd"}</div>)
}


function App() {

  return (<>
  <RecoilRoot>
  <Buttons></Buttons>
  <Display></Display>
  <Display2/>
  <IsEven/>
  </RecoilRoot>
  </>)
}

export default App
