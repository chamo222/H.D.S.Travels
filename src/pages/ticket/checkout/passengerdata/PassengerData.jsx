import React from 'react'
import PaymentMethod from './payment/PaymentMethod'

const PassengerData = () => {
  return (
    <div className='w-full col-span-4 py-4 space-y-6'>
        <h1 className="text-xl text-neutral-700 font-semibold">
            Passenger Information
        </h1>

        <div className="space-y-7">
            <div className="w-full space-y-2">
                <label htmlFor="fullname" className="text-sm text-neutral-500 font-medium">Full Name</label>
                <input type="text" placeholder='e.g. H.D.S.Travels' className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal placeholder:text-neutral-400" />
            </div>

            <div className="w-full space-y-2">
                <label htmlFor="email" className="text-sm text-neutral-500 font-medium">Email Address</label>
                <input type="email" placeholder='e.g. H.D.S.Travels@gmail.com' className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal placeholder:text-neutral-400" />
            </div>

            <div className="w-full space-y-2">
                <label htmlFor="phone" className="text-sm text-neutral-500 font-medium">Phone</label>
                <input type="number" placeholder='e.g. +94 0770182402' className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal placeholder:text-neutral-400" />
            </div>

            <div className="w-full space-y-2">
                <label htmlFor="altphone" className="text-sm text-neutral-500 font-medium">Alternative Phone</label>
                <input type="number" placeholder='e.g. +94 0770182402' className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal placeholder:text-neutral-400" />
            </div>

            <div className="w-full space-y-2">
                <label className="text-sm text-neutral-500 font-medium">Pickup Station</label>

                <select className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal">
                    <option selected disabled>
                        Choose Your Nearest Pickup Station
                    </option>
                    <option value="colombo">Colombo</option>
                    <option value="pettah">Pettah</option>
                    <option value="kadawatha">Kadawatha</option>
                    <option value="peliyagoda">Peliyagoda</option>
                </select>
            </div>
        </div>

        {/* Payment method */}
        <PaymentMethod />
      
    </div>
  )
}

export default PassengerData