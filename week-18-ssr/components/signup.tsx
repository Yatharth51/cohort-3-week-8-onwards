export function Signup1({ heading }: ISignUp) {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="Sigin border-1 p-2 flex flex-col gap-1 rounded-xl bg-blue-950">
        <span className="text-2xl text-center">{heading}</span>
        <div>
          <div>
            <label className="font-bold">Username</label>
          </div>
          <input type="text" className="border-1 rounded-md p-1" placeholder="username"></input>
        </div>
        <div>
          <div>
            <label className="font-bold">Password</label>
          </div>
          <input type="password" className="border-1 rounded-md p-1" placeholder = "******"></input>
        </div>
        <button className="mt-2 mb-1 border-1 rounded-md cursor-pointer hover:bg-gray-600 transition-all shadow-indigo-500 shadow-2xl">{heading}</button>
      </div>
    </div>
  );
}

interface ISignUp {
  heading: string;
}
