import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TbArrowsExchange } from 'react-icons/tb';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const Search = ({ theme = "light" }) => {
  const [date, setDate] = useState('');

  // Set colors based on theme
  const isDark = theme === "white";
  const bgColor = isDark ? "bg-neutral-900/70" : "bg-neutral-50/20";
  const borderColor = isDark ? "border-neutral-700" : "border-neutral-300";
  const inputBg = isDark ? "bg-black/70 text-white placeholder:text-neutral-400" : "bg-white/70 text-neutral-700 placeholder:text-neutral-400";
  const btnBg = isDark ? "bg-primary hover:bg-transparent text-white border-yellow-500" : "bg-primary hover:bg-transparent text-neutral-50 border-primary";

  return (
    <motion.div 
      initial={{ opacity: 0, y: -800 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -800 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`w-full ${bgColor} border-2 ${borderColor} shadow-lg rounded-xl p-5`}
    >
      <div className="w-full flex flex-col md:flex-row items-center gap-5 justify-between">

        {/* From and To */}
        <div className="w-full md:w-[60%] flex flex-col sm:flex-row items-center gap-5 relative">

          {/* From */}
          <div className={`w-full sm:w-1/2 h-14 border ${borderColor} ${inputBg} text-base font-medium px-5 flex items-center gap-x-1 rounded-lg`}>
            <input type="text" placeholder='From...' className="flex-1 h-full border-none bg-transparent focus:outline-none" />
            <div className="w-5 h-5 text-neutral-50">
              <FaMapMarkerAlt className='w-full h-full' />
            </div>
          </div>

          {/* To */}
          <div className={`w-full sm:w-1/2 h-14 border ${borderColor} ${inputBg} text-base font-medium px-5 flex items-center gap-x-1 rounded-lg`}>
            <input type="text" placeholder='To...' className="flex-1 h-full border-none bg-transparent focus:outline-none" />
            <div className="w-5 h-5 text-neutral-50">
              <FaMapMarkerAlt className='w-full h-full' />
            </div>
          </div>

          {/* Exchange button */}
          <button className="absolute w-11 h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center bg-primary">
            <TbArrowsExchange className='w-6 h-6 text-neutral-50' />
          </button>

        </div>

        {/* Date and Search Button */}
        <div className="w-full md:flex-1 flex flex-col sm:flex-row items-center gap-4">

          {/* Date input */}
          <div className={`w-full sm:flex-1 h-12 relative border ${borderColor} ${inputBg} text-base font-medium flex items-center rounded-lg px-5`}>
            {!date && (
              <span className={`absolute left-5 ${isDark ? "text-neutral-400" : "text-neutral-50"} pointer-events-none md:hidden`}>
                MM / DD / YYYY
              </span>
            )}
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`flex-1 h-full border-none bg-transparent focus:outline-none relative z-10 appearance-none ${isDark ? "text-white" : "text-neutral-700"}`}
            />
          </div>

          {/* Search Button */}
          <button className={`w-full sm:w-auto px-6 h-12 ${btnBg} rounded-lg text-base font-medium flex items-center justify-center gap-x-2 ease-in-out duration-300`}>
            <FaSearch />
            Search
          </button>

        </div>
      </div>
    </motion.div>
  )
}

export default Search;