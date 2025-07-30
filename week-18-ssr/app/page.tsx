
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center min-w-screen min-h-screen items-center">
      <div className="p-2 flex flex-col gap-2">
        Hi from Home page, centered Div
        <br/>
        <span className="text-center"> <button className="border-1 rounded-2xl p-2 cursor-pointer hover:bg-gray-600 transition-all" >Click to Signup</button> </span>
        <span className="text-center"> <button className="border-1 rounded-2xl p-2 cursor-pointer hover:bg-gray-600 transition-all">Click to Signin </button> </span>
      </div>
    </div>
  );
}
