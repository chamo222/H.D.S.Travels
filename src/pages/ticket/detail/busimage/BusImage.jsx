import React from 'react'

const BusImage = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-5 items-center border-t border-neutral-300 pt-7 pb-2'>
        <div className="w-full rounded-xl overflow-hidden">
            <img src="/src/assets/bus2.jpg" alt="bus images" className="w-full aspect-video object-cover object-center rounded-xl border border-neutral-300/50 bg-neutral-200/15" />
        </div> 
        <div className="w-full rounded-xl overflow-hidden">
            <img src="/src/assets/bus1.jpg" alt="bus images" className="w-full aspect-video object-cover object-center rounded-xl border border-neutral-300/50 bg-neutral-200/15" />
        </div>
        <div className="w-full rounded-xl overflow-hidden">
            <img src="/src/assets/bus3.jpg" alt="bus images" className="w-full aspect-video object-cover object-center rounded-xl border border-neutral-300/50 bg-neutral-200/15" />
        </div>
        <div className="w-full rounded-xl overflow-hidden">
            <img src="/src/assets/H.D.C.Trackers.jpg" alt="bus images" className="w-full aspect-video object-cover object-center rounded-xl border border-neutral-300/50 bg-neutral-200/15" />
        </div>
      
    </div>
  )
}

export default BusImage
