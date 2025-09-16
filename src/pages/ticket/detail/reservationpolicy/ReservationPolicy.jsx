import React from 'react'

const ReservationPolicy = () => {
  return (
    <div className='col-span-4 w-full border-l border-neutral-300 pl-5 
      max-md:border-l-0 max-md:pl-0 max-md:pt-4'>
      <div className="w-full space-y-3 text-left">
        <h1 className="text-lg md:text-xl text-neutral-600 font-medium text-start">
          Reservation Policies
        </h1>

        <ul className="w-full list-disc list-outside space-y-2.5 px-4 max-md:px-2">
          <li className="text-sm md:text-base text-neutral-500 font-normal leading-relaxed">
            Please note that this ticket is non-refundable.
          </li>
          <li className="text-sm md:text-base text-neutral-500 font-normal leading-relaxed">
            Passengers must keep their tickets until the journey ends; otherwise, they will need to purchase a new one.
          </li>
          <li className="text-sm md:text-base text-neutral-500 font-normal leading-relaxed">
            Tickets can be cancelled 24 hours before the departure time for a 50% fee.
          </li>
          <li className="text-sm md:text-base text-neutral-500 font-normal leading-relaxed">
            Bus services may be cancelled, rescheduled, or delayed due to natural disasters or other unforeseen circumstances.
          </li>
          <li className="text-sm md:text-base text-neutral-500 font-normal leading-relaxed">
            Passengers must arrive at the bording point 30 minutes before the departure time. The company is not responsible for missed buses due to late arrivals.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ReservationPolicy