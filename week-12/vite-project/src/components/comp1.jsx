
export function Component(){
    return <div className=' h-screen w-full bg-blue-950 flex flex-col gap-2 font-mono'>
        <div className='mt-64 mx-auto flex flex-col'>
          <div className='flex justify-center text-3xl'>
            <div className='text-cyan-300'>Webinar</div><div className='text-cyan-50'>.gg</div>
          </div>
          <p className='mt-12 text-center text-3xl text-cyan-50'>Verify your age</p>
          <p className='mt-8 text-xs text-cyan-50'>Please confirm your Birth year. This data will not be stored. </p>
        </div>
        <div className='flex flex-col gap-6 mx-auto mt-6'>
          <input type = "text" placeholder='Your Birth Year' className='min-w-80 rounded-md bg-blue-200 pl-2 py-1'/>
          <button className='bg-blue-100 rounded-md min-w-80 py-1 hover:bg-blue-700'>Continue</button>
        </div>
    </div>
  }