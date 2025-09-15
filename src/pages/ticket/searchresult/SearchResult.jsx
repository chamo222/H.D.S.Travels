import React from 'react';
import { FaBus } from 'react-icons/fa';
import { GrRefresh } from 'react-icons/gr';
import TicketCard from '../../../components/ticket/TicketCard';



const SearchResult = () => {
  return (
    <div className="w-full col-span-3 space-y-10 pt-11">
      
      <div className="space-y-6">

        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        <TicketCard icon={FaBus} busName={"H.D.S Travels"} routeFrom={"Colombo"} routeTo={"Kandy"} arrivalTime={"10:00 AM"} departureTime={"2:00 PM"} price={"1500"} availableSeats={42}/>
        
      </div>

      <div className="w-full flex items-center justify-center">
        <button className="w-fit px-8 py-3 bg-primary hover:bg-transparent border-2 border-primary hover:border-primary rounded-xl text-base font-normal text-neutral-50 flex items-center justify-center gap-x-2 hover:text-primary ease-in-out duration-300">
            <GrRefresh />
            Load More
        </button>
      </div>

    </div>
  )
}

export default SearchResult
