import {BrowserRouter,Routes,Route,Link,Outlet} from "react-router-dom"
import './App.css'


function App() {

  const router = [{
    path : "/class-12-result",
    element : <ClassResult class = {"12"} percentage = {"94.2"}/>
  },
  {
    path : "/class-10-result",
    element : <ClassResult class = {"10"} percentage = {"93.8"}/>
  }
]

  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route path = "/" element = {<Layout/>}> 
      {router.map(route=><>
        <Route path = {route.path} element = {route.element}/>
      </>)}
      </Route>
      </Routes>
      </BrowserRouter>
      </>
  )
}

function Layout(){
  return (
    <div>
      <Link to = {"/class-12-result"}>12th result</Link><span> </span>
      <Link to = {"/class-10-result"}>10th result</Link>
      <Outlet/>
      Footer | Contact Us
    </div>
  )
}

function ClassResult(props){
  return (
    <div>
      class {props.class}th result is {props.percentage} %
    </div>
  )
}

export default App
