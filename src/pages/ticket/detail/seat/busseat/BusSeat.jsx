import React, { useState, useEffect } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import busSeatData from '../../../../../constants/busseat/BusSeatData';
import { MdOutlineChair } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../../../../components/alertmessage/error/ErrorMessage';
 

const BusSeat = () => {

    // Track seat selection
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showError, setShowError] = useState(false);

    // toggle seat selection
    const handleSeatClick = (seatId) => {
        // If the seat is already booked, ignore the click or disable it
        const selectedSeats = busSeatData.find((seat) => seat.id === seatId);
        if (selectedSeats.status === 'booked') {
            return; // do nothing
        };

        // If the seat is available, select it
        setSelectedSeats((prevSelectedSeats) => {
            // check if the seat is already selected
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter((seat) => seat !== seatId); // vice versa or deselect
            } else {
                // Show the error if more than 10 seats are selected
                if (prevSelectedSeats.length >= 10) {
                    setShowError(true);
                    return prevSelectedSeats; // Do not select the seat more than 10
                } else {
                    return [...prevSelectedSeats, seatId];
                }
            }
        })
    };

    // Hide the error message after 10 seconds
    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer); 
        }
    }, [showError]);



    // function to determine seat class or seat name on status
    const getSeatName = (seat) => {
        if (seat.status === 'booked') {
            return 'text-primary cursor-not-allowed' // booked seat unavailable
        } if (selectedSeats.includes(seat.id)) {
            return 'text-yellow-600 cursor-pointer' // selected seat
        }
        return 'text-neutral-500 cursor-pointer' // available seat
    };
    

  return (
    <div className='w-full grid grid-cols-5 gap-10'>

        {/* Seat Layout */}
        <div className="col-span-3 w-full flex items-center justify-center shadow-sm rounded-xl p-4 border border-neutral-200">

            <div className="w-full space-y-7">
                <p className="text-base text-neutral-600 font-medium text-center">
                    Click on available seat to reserve your seat.
                </p>

                {/* Seat Layout */}
                <div className="w-full flex items-stretch gap-x-1.5">
                    <div className="w-10 h-fit">
                        <GiSteeringWheel className='text-4xl mt-7 text-primary -rotate-90' />
                    </div>

                    {/* Seat rows */}
                    <div className="flex flex-col items-center border-1-2 border-dashed border-neutral-300 pl-7">

                        <div className="flex-1 space-y-5">
                            {/* First row */}
                            <div className="w-full h-auto grid grid-cols-11 gap-x-3 justify-end">
                                {busSeatData.slice(0, 11).map((seat) => (
                                    <div 
                                        key={seat.id} 
                                        className='flex items-center gap-x-0' 
                                        onClick={() => handleSeatClick(seat.id)}>
                                        <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                                        <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`}/>
                                    </div>
                                ))}
                            </div>

                            {/* Second row */}
                            <div className="w-full h-auto grid grid-cols-11 gap-x-3 justify-end">
                                {busSeatData.slice(11, 22).map((seat) => (
                                    <div 
                                        key={seat.id} 
                                        className='flex items-center gap-x-0' 
                                        onClick={() => handleSeatClick(seat.id)}>
                                        <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                                        <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`}/>
                                    </div>
                                ))}
                            </div>

                            {/* Third row */}
                            <div className="w-full h-auto grid grid-cols-10 gap-x-3 justify-end">
                                <div className="col-span-9"></div>
                                {busSeatData.slice(22, 23).map((seat) => (
                                    <div 
                                        key={seat.id} 
                                        className='flex items-center gap-x-0' 
                                        onClick={() => handleSeatClick(seat.id)}>
                                        <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                                        <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`}/>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Fourth row */}
                            <div className="w-full h-auto grid grid-cols-10 gap-x-3 justify-end">
                                <div className="col-span-9"></div>
                                {busSeatData.slice(23, 24).map((seat) => (
                                    <div 
                                        key={seat.id} 
                                        className='flex items-center gap-x-0' 
                                        onClick={() => handleSeatClick(seat.id)}>
                                        <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                                        <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`}/>
                                    </div>
                                ))}
                            </div>

                            {/* Fifth row */}
                            <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                                {busSeatData.slice(24, 33).map((seat) => (
                                    <div 
                                        key={seat.id} 
                                        className='flex items-center gap-x-0' 
                                        onClick={() => handleSeatClick(seat.id)}>
                                        <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                                        <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`}/>
                                    </div>
                                ))}
                            </div>

                            {/* Sixth row */}
                            <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                                {busSeatData.slice(33, 42).map((seat) => (
                                    <div 
                                        key={seat.id} 
                                        className='flex items-center gap-x-0' 
                                        onClick={() => handleSeatClick(seat.id)}>
                                        <h6 className="text-base text-neutral-600 font-bold">{seat.id}</h6>
                                        <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                        

                </div>

                {/* reservation info */}
                <div className="w-full flex items-center justify-center gap-6 border-t border-neutral-200 pt-5">
                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className="text-xl text-neutral-500 -rotate-90"/>
                        <p className="text-sm text-neutral-600 font-medium">Available</p>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className="text-xl text-primary -rotate-90"/>
                        <p className="text-sm text-neutral-600 font-medium">Booked</p>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <MdOutlineChair className="text-xl text-yellow-600 -rotate-90"/>
                        <p className="text-sm text-neutral-600 font-medium">Selected</p>
                    </div>

                     <div className="flex items-center gap-x-2">
                        <RiMoneyRupeeCircleLine className="text-xl text-neutral-500 "/>
                        <p className="text-sm text-neutral-600 font-medium">Rs. 1600</p>
                    </div>
                </div>

            </div>

        </div> 

        {/* Seat selection action  */}
        <div className="col-span-2 w-full space-y-5 bg-neutral-50 rounded-xl py-4 px-6 border border-neutral-200 shadow-sm">

            <div className="w-full space-y-2">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-neutral-600 font-medium">
                        Your Destination
                    </h1>
                    <Link to={"/bus-tickets"} className='text-sm text-primary font-normal'>
                        Change route
                    </Link>
                </div>

                <div className="space-y-0.5 w-full">
                    <div className="w-full flex items-center justify-between gap-x-5">
                        <p className="text-sm text-neutral-400 font-normal">
                            From <span className="text-xs">(New Buspark)</span>
                        </p>
                        <p className="text-sm text-neutral-400 font-normal">
                            To <span className="text-xs">(Colombo)</span>
                        </p>
                    </div>

                    <div className="w-full flex items-center justify-between gap-x-4">
                        <h1 className="text-sm text-neutral-600 font-normal">
                            Kadawatha <span className="font-medium">(06:15 am)</span>
                        </h1>

                        <div className="flex-1 border-dashed border border-neutral-300" />

                        <h1 className="text-sm text-neutral-600 font-normal">
                            Pettah <span className="font-medium">(07:45 am)</span>
                        </h1>
                    </div>
                </div>

            </div>


            <div className="w-full space-y-2">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-lg text-neutral-600 font-medium">
                        Selected Seats
                    </h1>

                    <div className="bg-primary/20 rounded-lg py-0.5 px-1.5 text-xs text-neutral-600 font-normal uppercase">
                        Non-refundable
                    </div>
                </div>

                {
                    selectedSeats.length > 0 
                        ?
                        <div className='w-full flex items-center gap-x-3'>
                            {selectedSeats.map((seatId) => {
                                return (
                                    <div key={seatId} className='w-9 h-9 bg-neutral-200/80 rounded-lg flex items-center justify-center text-base text-neutral-700 font-semibold'>
                                        {seatId}
                                    </div>
                                )
                            })}

                        </div>
                        :
                        <div className='w-full flex items-center gap-x-3'>
                            <p className="text-sm text-neutral-500 font-normal">No seat selected</p>
                        </div>
                }
            </div>


            <div className="w-full space-y-2">
                <h1 className="text-lg text-neutral-600 font-medium">
                    Fare Details
                </h1>

                <div className="w-full flex items-center justify-between border-dashed border-1-[1.5px] border-neutral-400 pl-2">
                    <h3 className="text-sm text-neutral-500 font-medium">Basic Fare:</h3>
                    <p className="text-sm text-neutral-600 font-medium">Rs. 1600</p>
                </div>

                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex gap-y-0.5 flex-col">
                        <h3 className="text-base text-neutral-500 font-medium">Total Price</h3>
                        <span className="text-xs text-neutral-500 font-normal">
                            (Including all taxes)
                        </span>
                    </div>

                    {/* Calculate the total price */}
                    <p className="text-base text-neutral-600 font-semibold">
                        Rs. {" "}
                        {selectedSeats.reduce((total, seatId) => {
                            const seat = busSeatData.find(busSeat => busSeat.id === seatId);
                            return total + (seat ? seat.price : 0);
                        }, 0)}
                    </p>
                </div>
            </div>


            <div className="w-full flex items-center justify-center">
                {
                    selectedSeats.length > 0
                    ?
                    <Link to="/bus-tickets/checkout" className="w-full bg-primary hover:bg-primary/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center rounded-lg transition">
                        Processed to Checkout
                    </Link>

                    :
                    <div className='w-full space-y-0.5'>
                        <button disabled className='w-full bg-primary hover:bg-primary/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center rounded-lg transition cursor-not-allowed'>
                            Processed to Checkout
                        </button>
                        <small className="text-xs text-neutral-600 font-normal px-1">
                            Please select at least one seat to proceed to checkout page.
                        </small>
                    </div>
                }
            </div>


        </div>

        {/* Show the erromessage if more than 10 seats are selected  */}

        {showError && <ErrorMessage message={"You can't select more than 10 seats."}/> }
      
    </div>
  )
}

export default BusSeat
