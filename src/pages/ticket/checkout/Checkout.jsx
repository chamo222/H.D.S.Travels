import React from 'react';
import TopLayout from '../../../layout/toppage/TopLayout';
import RootLayout from '../../../layout/RootLayout';
import PassengerData from "./passengerdata/PassengerData";
import BookingStatus from './bookingstatus/BookingStatus';

const Checkout = () => {
  return (
    <div className='w-full space-y-12 pb-16'>
      {/* Top Layout */}
      <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
        title={"Checkout"} 
      />

      <RootLayout className="space-y-12 w-full pb-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 items-start gap-8 md:gap-16 lg:gap-44 relative">

          {/* Passenger Detail */}
          <div className="md:col-span-1 lg:col-span-4">
            <PassengerData />
          </div>

          {/* Ticket Report Status */}
          <div className="md:col-span-1 lg:col-span-3">
            <BookingStatus />
          </div>

        </div>
      </RootLayout>
    </div>
  )
}

export default Checkout