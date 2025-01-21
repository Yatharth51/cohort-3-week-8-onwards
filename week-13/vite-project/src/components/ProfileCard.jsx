export function ProfileCard(){
    return (<div className="flex flex-col items-center w-1/6 p-4 border-2 mx-4 my-1 border-gray-400 rounded-md ">
        <img src="https://static.wikia.nocookie.net/46683afa-d188-416c-ad6f-a6ab087d8f63" className=" max-w-20 rounded-md bg-black text-center"></img>
        <h1 className="font-bold mt-4">Yatharth Kapoor</h1>
        <div className="flex flex-col text-center mt-2 text-gray-700 font-light">
            <h3>yatharth51@gmail.com</h3>
        <h3>7011157889</h3>
        </div>
        
        <h3 className="mt-4 text-gray-700 font-light">Delhi,India</h3>
    </div>)
}