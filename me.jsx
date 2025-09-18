import React from 'react'
import { FaBus, FaStar } from 'react-icons/fa'
import { MdOutlineChair } from 'react-icons/md'
import { RiVipFill } from 'react-icons/ri'
import { TbAirConditioning } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const TicketCard = ({ icon: Icon, busName, routeFrom, routeTo, arrivalTime, departureTime, price, availableSeats }) => {
  return (
    <div className='w-full rounded-xl p-5 border-2 border-neutral-300 space-y-5'>

      {/* bus info, routes */}
      <div className="space-y-4 w-full border-b border-neutral-300/60 pb-4">

        {/* Bus Info */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-x-2 flex-1">
            <FaBus className='h-5 w-5 text-primary'/>
            <p className="text-lg font-semibold truncate">{busName}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-2 py-1 text-xs">
              <TbAirConditioning className='w-4 h-4 text-primary'/>
              AC
            </div>

            <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-2 py-1 text-xs">
              <FaStar className='w-4 h-4 text-yellow-600'/>
              4.5
            </div>

            <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-2 py-1 text-xs">
              <RiVipFill className='w-4 h-4 text-primary'/>
              Sofa
            </div>

            <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-2 py-1 text-xs">
              <MdOutlineChair className='w-4 h-4 text-primary -rotate-90'/>
              {availableSeats} seats
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="space-y-1">
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-2">
            <h1 className="text-2xl font-semibold">{arrivalTime}</h1>

            <div className="flex-1 border-dashed border border-neutral-300 relative my-2 sm:my-0">
              <p className="absolute w-12 h-12 p-0.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 border-dashed border-neutral-400 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </p>
            </div>

            <h1 className="text-2xl font-semibold">{departureTime}</h1>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 text-sm text-neutral-500">
            <p>{routeFrom}</p>
            <p>{routeTo}</p>
          </div>
        </div>
      </div>

      {/* Price and Reserve Button */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <h1 className="text-xl font-semibold">
          Rs. {price} <span className="text-sm text-neutral-500 font-normal">/per seat</span>
        </h1>

        <h1 className="text-sm font-normal flex items-center justify-center gap-x-1.5 text-neutral-600">
          <span className="text-lg font-bold pt-0.5">{availableSeats}</span> seats available
        </h1>

        <Link
          to="/bus-tickets/detail"
          className="w-full sm:w-fit px-5 py-1.5 bg-primary hover:bg-transparent border-2 border-primary hover:border-primary rounded-xl text-sm font-normal text-neutral-50 flex items-center justify-center gap-x-2 hover:text-primary ease-in-out duration-300"
        >
          Reserve Seat
        </Link>
      </div>
    </div>
  )
}

export default TicketCard 

{ label: "Admin", link: "/admin/driver", icon: <MdAdminPanelSettings /> },