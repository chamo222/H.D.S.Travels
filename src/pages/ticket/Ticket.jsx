import React from 'react'
import TopLayout from '../../layout/toppage/TopLayout'
import RootLayout from '../../layout/RootLayout'

import { motion } from 'framer-motion';
import Search from '../home/hero/search/Search';
import Filter from './filter/Filter';
import SearchResult from './searchresult/SearchResult';

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

function Ticket() {
  return (
    <div className='w-full bg-black text-white min-h-screen space-y-12 pb-16'>
      {/* Top Layout */}
      <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
        title={"Reserve Your Ticket"} 
        textColor="white"
      />

      <RootLayout className="space-y-12 relative">

        {/* Search section (gradient heading added) */}
        <div className="space-y-5 w-full bg-black flex py-4 items-center justify-center flex-col sticky top-0 z-30">
          <motion.h1
            initial={{ opacity: 0, y: -800 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{ duration: 1.35, ease: "easeOut" }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400"
          >
            Want to change the route?
          </motion.h1>

          {/* Search */}
          <Search theme="dark" />
        </div>

        {/* Tickets Section */}
        <motion.div
          className="w-full h-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 px-4 md:px-0"
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="visible"
        >
          {/* Filter Panel */}
          <div className="col-span-1">
            <Filter className="space-y-4 sticky top-52 z-20 bg-neutral-900/70 p-4 rounded-3xl shadow-lg border border-gradient-to-r from-purple-400 via-pink-500 to-yellow-500" />
          </div>

          {/* Search Results */}
          <div className="col-span-3 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <SearchResult theme="dark" cardResponsive={true} />
            </div>
          </div>
        </motion.div>

      </RootLayout>
    </div>
  )
}

export default Ticket