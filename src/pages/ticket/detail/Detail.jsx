import React from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import { Link } from 'react-router-dom'
import WarningAlert from '../../../components/alertmessage/WarningAlert'
import BusSeat from './seat/busseat/BusSeat'
import ToggleBtn from '../../../components/togglebtn/ToggleBtn'
import Amenities from './amenities/Amenities'
import ReservationPolicy from './reservationpolicy/ReservationPolicy'
import BusImage from './busimage/BusImage'

const Detail = () => {

    // Show the warning message box
    const message = (
        <>
            One individual only can book 10 seats. If you want to book more than 10 seats, 
            please <Link to={"/support-team"} className='text-yellow-700 font-medium'>Contact our support team.</Link>
        </>
    );

  return (
        <div className='w-full space-y-12 pb-16'>
            {/* Top Layout */}
            <TopLayout
            bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
            title={"Bus Detail"} 
            />

            <RootLayout className="space-y-12 w-full pb-16">

                {/* Seat layout and selection action detail */}
                    <div className="w-full space-y-8">

                        {/* Warning Message */}
                        <WarningAlert message={message} />

                        {/* Seat Layout */}
                        <BusSeat />
                        
                    </div>

                {/* Bus Detail */}
                <div className="w-full flex items-center justify-center flex-col gap-8 text-center">

                    {/* Short description about the bus */}
                    <p className="text-base text-neutral-500 font-normal text-justify">
                        This is just a small text for the demo purpose. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ex minima pariatur distinctio quos excepturi cupiditate dicta. Sapiente at, nostrum quidem pariatur deleniti officiis tempora. Eius mollitia reprehenderit deserunt ratione?
                        <span className="text-lg text-neutral-600 font-medium ml-2">
                            Want to see more about the bus?
                        </span>
                    </p>

                    {/* Button */}
                    <div className="w-full flex items-center justify-center gap-6 flex-col">

                        <ToggleBtn
                            buttonText={"See Bus Details"}
                            buttonTextHidden={"Hide Bus Details"}
                        >
                            <div className="w-full space-y-10">
                                {/* reservation policy and amenities */}
                                <div className="w-full grid grid-cols-7 gap-20">

                                    {/* Amenities */}
                                    <Amenities /> 

                                    {/* Reservation policy */}
                                    <ReservationPolicy />

                                </div>

                                {/* bus images */}
                                <BusImage />
                                
                            </div>

                        </ToggleBtn>
                    </div>
                </div>
            </RootLayout>
        </div>
    )
}

export default Detail
