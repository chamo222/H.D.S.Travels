// SearchResult.jsx
import React from "react";
import { FaBus } from "react-icons/fa";
import { GrRefresh } from "react-icons/gr";
import TicketCard from "../../../components/ticket/TicketCard";

const SearchResult = ({ tickets, loading, onRefresh }) => {
  return (
    <div className="w-full col-span-3 space-y-10 pt-11">
      <div className="space-y-6">
        {loading ? (
          <p className="text-white">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-white">No tickets available.</p>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              icon={FaBus}
              busName={ticket.busName}
              routeFrom={ticket.routeFrom}
              routeTo={ticket.routeTo}
              arrivalTime={ticket.arrivalTime}
              departureTime={ticket.departureTime}
              price={ticket.price}
              availableSeats={ticket.availableSeats}
            />
          ))
        )}
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          onClick={onRefresh}
          className="w-fit px-8 py-3 bg-primary hover:bg-transparent border-2 border-primary rounded-xl text-base font-normal text-neutral-50 flex items-center justify-center gap-x-2 hover:text-primary ease-in-out duration-300"
        >
          <GrRefresh />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default SearchResult;