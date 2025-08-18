import React from 'react'

function Home() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center flex-col'>
        {/* Hero */}
        <div className="w-full h-screen flex items-center justify-center">
            <h1 className="text-5xl text-neutral-950 font-bold">
                This is the Hero section
            </h1>
        </div>

         {/* About */}
        <div className="w-full h-screen flex items-center justify-center bg-neutral-950">
            <h1 className="text-5xl text-neutral-50 font-bold">
                This is the About section
            </h1>
        </div>
    </div>
  )
}

export default Home
