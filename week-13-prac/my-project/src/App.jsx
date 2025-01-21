import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaArrowsAltH } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import './App.css'
const pfpimage = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aae48a5d-ee59-4699-8f20-1c7482c2696a/deygf1l-ef9a66f0-25e8-498b-82e7-b22fae9d1a4a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FhZTQ4YTVkLWVlNTktNDY5OS04ZjIwLTFjNzQ4MmMyNjk2YVwvZGV5Z2YxbC1lZjlhNjZmMC0yNWU4LTQ5OGItODJlNy1iMjJmYWU5ZDFhNGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yr67CWeBjHl_GwQUXSxmOBgNfm5eenzFGCZZreLrOMY" ;


function WebinarButton(){
  return (<button className='bg-blue-800 p-2 rounded-md '>
    <span className='text-white'>Webinar</span>
    <span className='text-cyan-200'>.gg</span>
  </button>)
}

function SideBarText({sideBarOpen}){
  return (<div className='flex justify-between items-center
   m-8'>
    <h1 className={`font-bold transition-all duration-300 ${!sideBarOpen ? "hidden" : "block"}`}>Home
    </h1>
    <FaHome className={`h-[39px] w-[39px] ${!sideBarOpen ? "mx-4" : " "}`} />
  </div>)
}

function SideBar(){

  const[sideBarOpen,setSideBarOpen] = useState(false);

  return (<div className ={` ${sideBarOpen ? "w-96" : "w-32"} transition-all duration-200  h-screen relative shadow-md shadow-black`}>

    <FaArrowsAltH className= {`bg-slate-200 absolute -right-6 top-7 h-10 w-7 rounded-xl p-1 border border-black cursor-pointer shadow-sm ${!open ? "rotate-180" :""}  `} onClick={()=>{setSideBarOpen(c=>!c)}}/>

    <div className='m-6 flex justify-between'>
      <WebinarButton/>
      <img src={pfpimage} className={`w-14 ${sideBarOpen ? "" : "hidden"} `}></img>
    </div>

  <SideBarText sideBarOpen={sideBarOpen}/>
  <SideBarText sideBarOpen={sideBarOpen}/>
  <SideBarText sideBarOpen={sideBarOpen}/>

  </div>)
}

function ProfileCard(){
  return (<div className=' flex flex-col items-center p-8 rounded-xl ml-4 -mt-10 col-span-2 shadow-md shadow-black'>
    <img src = {pfpimage} className='w-36 rounded-xl'></img>
    <h1 className='mt-6 font-bold'>Prabhleen Kaur</h1>
    <div className='text-center mt-2' >
      <h3 className='font-extralight'>prabhleen@gmail.com</h3>
      <h3 className='font-extralight'> 98999999</h3>
    </div>
    <h3 className='mt-2 font-extralight'>Delhi,India</h3>
  </div>)
}

function Calendar(){
  return (<div className='col-span-8 md:col-span-4 m-6 bg-white shadow-md shadow-black'>
    <h1>Monday,14 October</h1>
  </div>)
}

function IntercativeComponents(){
  return <div className='flex flex-col items-center max-w-40'>
    <MdCalendarMonth className='w-16 h-16 bg-cyan-200 mx-2 rounded-md'/>
    <h1 className='text-center p-2'>Schedule a Webinar</h1>
  </div>
}

function Intercative(){
  return (<div className={`col-span-8 md:col-span-2 border shadow-md m-4 p-2 shadow-black`}>
    <div className='flex'>
  <IntercativeComponents/>
    <IntercativeComponents/>
    </div >
    <IntercativeComponents/>
  </div>)
}

function MainComponent(){
  return (<div className='w-full h-screen'>
    <div className='bg-black h-40'>
    </div>
    <div className='grid grid-cols-8 gap-10 mt-4'>
  <ProfileCard />
  <Calendar/>
  <Intercative/>
    </div>
  </div>)
}


function App() {

  return (
    <>
      <div className='flex'>
        <SideBar/>
        <MainComponent/>
      </div>
    </>
  )
}

export default App
