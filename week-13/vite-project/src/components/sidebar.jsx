import { useState } from "react"

function WebinarButton(props){
    if (props.sideBarIsOpen)
    return (<button className=" bg-blue-900 p-2 rounded-lg">
        <span className="text-white">Webinar</span>
        <span className="text-cyan-400">.gg</span>
    </button>)
}

function SidebarText(props){
    if (props.sideBarIsOpen){
        return (<div className="group flex my-2 justify-between p-2 hover:bg-gray-300 rounded-lg transition duration-300">
        <span className="text-gray-400 group-hover:text-blue-800">{props.text}</span>
        {props.children}
    </div>)
    }
    return (<div>

    </div>)
    
}

function DropDown(props){
   return <div className="min-w-32 ">
            <svg onClick={()=>{
                props.setSideBar(!props.sideBarIsOpen)
            }} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="my-2 w-10 fixed top-0 pl-3 hover:cursor-pointer"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 5H0V4h16v1zm0 8H0v-1h16v1zm0-4.008H0V8h16v.992z"></path></g></svg> 
        </div>
}

export function NavBar(){
    const [sideBarIsOpen,setSideBar] = useState(false) ;

    if (sideBarIsOpen){
        return (
        
        <div className="w-0 lg:w-1/6 h-full m-6 transition-all duration-300 pt-2 absolute top-0 left-0 md : relative">
        <div>
            <DropDown sideBarIsOpen={sideBarIsOpen} setSideBar={setSideBar}/>
        <div className="flex justify-between p-2">
            <WebinarButton sideBarIsOpen={sideBarIsOpen}/>
            <img src="https://static.wikia.nocookie.net/46683afa-d188-416c-ad6f-a6ab087d8f63" className=" max-w-10 rounded-lg bg-black"></img>
        </div>
        <div className="mt-6">

        <SidebarText sideBarIsOpen={sideBarIsOpen} text="Home"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="" className="w-8 text-gray-400 group-hover:text-blue-800"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="currentColor"></path> </g></svg></SidebarText>

        <SidebarText sideBarIsOpen={sideBarIsOpen} text="Webinars"><svg fill="currentColor" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" className="w-8 text-gray-400 group-hover:text-blue-800"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M36,22.74V21.10193a3.09593,3.09593,0,0,0-1.99084-2.88806,3,3,0,1,0-4.01832,0A3.09593,3.09593,0,0,0,28,21.10193V22.74a6.97916,6.97916,0,0,0,8,0Z"></path><path d="M34.00916,50.21387a3,3,0,1,0-4.01832,0A3.09593,3.09593,0,0,0,28,53.10193V54.74a6.97916,6.97916,0,0,0,8,0V53.10193A3.09593,3.09593,0,0,0,34.00916,50.21387Z"></path><path d="M20,38.74V37.10193a3.09593,3.09593,0,0,0-1.99084-2.88806,3,3,0,1,0-4.01832,0A3.09593,3.09593,0,0,0,12,37.10193V38.74a6.97916,6.97916,0,0,0,8,0Z"></path><path d="M52,38.74V37.10193a3.09593,3.09593,0,0,0-1.99084-2.88806,3,3,0,1,0-4.01832,0A3.09593,3.09593,0,0,0,44,37.10193V38.74a6.97916,6.97916,0,0,0,8,0Z"></path><path d="M32,63A30,30,0,1,0,2,33,30,30,0,0,0,32,63Zm0-6a9,9,0,1,1,9-9A9,9,0,0,1,32,57ZM48,23a9,9,0,1,1-9,9A9,9,0,0,1,48,23ZM32,7a9,9,0,1,1-9,9A9,9,0,0,1,32,7ZM7,32a9,9,0,1,1,9,9A9,9,0,0,1,7,32Z"></path></g></svg></SidebarText>

        <SidebarText sideBarIsOpen={sideBarIsOpen} text="Billing"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--medical-icon" preserveAspectRatio="xMidYMid meet" fill="currentColor" className="w-8 text-gray-400 group-hover:text-blue-800"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.329 46.044c-.573-.156-.573-.14-1.195-.277v-2.521c.846.083 1.462.755 1.463 1.495l2.24.001c0-1.693-1.41-3.387-3.703-3.682v-1.339h-2.145v1.339c-2.162.286-3.566 1.899-3.566 3.336c0 1.451.936 2.589 2.288 2.962c.529.145.805.223 1.298.318v2.688c-.988-.203-1.481-1.053-1.481-1.693h-2.286c0 1.423 1.459 3.601 3.747 3.863v1.434h2.145v-1.434c2.371-.31 3.809-1.544 3.809-3.343c0-1.171-.481-2.567-2.614-3.147zm-3.34-.67c-.959-.171-1.224-.581-1.224-1.023c0-.516.65-1.014 1.224-1.081v2.104zm2.171 4.981v-2.272c.947.136 1.547.543 1.547 1.128c0 .517-.558 1.107-1.547 1.144z" fill="currentColor"></path><path d="M56.073.549H8.458C4.105.549.56 4.094.56 8.451V56.06c0 4.358 3.545 7.902 7.898 7.902h47.615c4.355 0 7.9-3.544 7.9-7.902V8.451c0-4.356-3.545-7.902-7.9-7.902zM46.748 8.7a3.83 3.83 0 0 1 0 7.659a3.828 3.828 0 0 1-3.828-3.829a3.829 3.829 0 0 1 3.828-3.83zm-28.285.171a3.77 3.77 0 1 1-.002 7.54a3.77 3.77 0 0 1 .002-7.54zm-7.869 12.708c.568-1.875 2.423-3.863 4.855-3.863h6.028c2.431 0 4.286 1.988 4.853 3.864l2.126 7.752h-3.314l-1.76-6.392h-1.486l1.717 6.392h-10.3l1.717-6.392h-1.486l-1.761 6.392H8.469l2.124-7.752zm6.476 34.233a8.973 8.973 0 1 1 0-17.946a8.973 8.973 0 0 1 0 17.946zm39.365-19.994l-4.438.002v17.745a2.256 2.256 0 0 1-2.258 2.246a2.247 2.247 0 0 1-2.245-2.246V35.822h-1.431v17.743a2.248 2.248 0 0 1-2.248 2.246a2.255 2.255 0 0 1-2.256-2.246V35.823l-33.461.01v-4.3H41.56V21.47l-7.148 8.464c-1.504 1.737-4.181-.433-2.673-2.29l7.407-8.899c.479-.477.909-1.067 2.677-1.067h9.018a3.406 3.406 0 0 1 3.407 3.404l-.006 10.452h2.194v4.285z" fill="currenColor"></path></g></svg></SidebarText>

        <SidebarText sideBarIsOpen={sideBarIsOpen} text="User Management"><svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" className="w-8 text-gray-400 group-hover:text-blue-800"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>user-management</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Mask" fill="currentColor" transform="translate(64.000000, 64.000000)"> <path d="M298.666667,170.666667 C345.813333,170.666667 384,208.853333 384,256 L384,256 L384,384 L1.42108547e-14,384 L1.42108547e-14,298.666667 C1.42108547e-14,251.52 38.1866667,213.333333 85.3333333,213.333333 L85.3333333,213.333333 L160.853333,213.333333 C175.573333,187.733333 203.093333,170.666667 234.666667,170.666667 L234.666667,170.666667 Z M298.666667,213.333333 L234.666667,213.333333 C211.2,213.333333 192,232.533333 192,256 L192,256 L192,341.333333 L341.333333,341.333333 L341.333333,256 C341.333333,232.533333 322.133333,213.333333 298.666667,213.333333 L298.666667,213.333333 Z M149.333333,256 L85.3333333,256 C61.8666667,256 42.6666667,275.2 42.6666667,298.666667 L42.6666667,298.666667 L42.6666667,341.333333 L149.333333,341.333333 L149.333333,256 Z M106.666667,64 C141.952,64 170.666667,92.7146667 170.666667,128 C170.666667,163.285333 141.952,192 106.666667,192 C71.3813333,192 42.6666667,163.285333 42.6666667,128 C42.6666667,92.7146667 71.3813333,64 106.666667,64 Z M106.666667,104 C93.44,104 82.6666667,114.752 82.6666667,128 C82.6666667,141.248 93.44,152 106.666667,152 C119.893333,152 130.666667,141.248 130.666667,128 C130.666667,114.752 119.893333,104 106.666667,104 Z M266.666667,1.42108547e-14 C307.84,1.42108547e-14 341.333333,33.4933333 341.333333,74.6666667 C341.333333,115.84 307.84,149.333333 266.666667,149.333333 C225.493333,149.333333 192,115.84 192,74.6666667 C192,33.4933333 225.493333,1.42108547e-14 266.666667,1.42108547e-14 Z M266.666667,42.6666667 C249.024,42.6666667 234.666667,57.024 234.666667,74.6666667 C234.666667,92.3093333 249.024,106.666667 266.666667,106.666667 C284.309333,106.666667 298.666667,92.3093333 298.666667,74.6666667 C298.666667,57.024 284.309333,42.6666667 266.666667,42.6666667 Z"> </path> </g> </g> </g></svg></SidebarText>

        <SidebarText sideBarIsOpen={sideBarIsOpen} text="Settings"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 text-gray-400 group-hover:text-blue-800"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"></circle> <path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></SidebarText>

        </div>
        
        </div>
    </div>)
    }
        return (<DropDown sideBarIsOpen= {sideBarIsOpen} setSideBar= {setSideBar}/>)
    
}