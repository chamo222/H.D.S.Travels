import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import TopSearchCard from '../../../components/topsearch/TopSearchCard'

const TopSearch = () => {
  return (
    <RootLayout className="space-y-12">

        {/* Tag */}
        <div className="w-full flex items-center justify-center text-center px-4">
            <h1 className="text-3xl text-neutral-800 font-bold">
                Top Search <span className="text-primary">Routes</span>
            </h1>
        </div>

        {/* Top Search tickets routes Card */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-4">

            <TopSearchCard routeFrom={"Kathmandu"} routeTo={"Pyuthan"} timeDuration={"10 Hrs"} price={"1600"}/>
            <TopSearchCard routeFrom={"Kathmandu"} routeTo={"Pyuthan"} timeDuration={"10 Hrs"} price={"1500"}/>
            <TopSearchCard routeFrom={"Kathmandu"} routeTo={"Pyuthan"} timeDuration={"10 Hrs"} price={"2200"}/>
            <TopSearchCard routeFrom={"Kathmandu"} routeTo={"Pyuthan"} timeDuration={"10 Hrs"} price={"1000"}/>
            <TopSearchCard routeFrom={"Kathmandu"} routeTo={"Pyuthan"} timeDuration={"10 Hrs"} price={"2000"}/>
            <TopSearchCard routeFrom={"Kathmandu"} routeTo={"Pyuthan"} timeDuration={"10 Hrs"} price={"1400"}/>

        </div>
      
    </RootLayout>
  )
}

export default TopSearch