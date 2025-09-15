import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import PriceRangeSlider from "../../../components/pricerange/PriceRangeSlider";

const Filter = () => {
  const [rangeValues, setRangeValues] = useState({ min: 1000, max: 3000 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const busTypes = ["Ashok", "Lehren", "Bus"];
  const busCompanies = ["Ashok", "Lehren", "Bus"];
  const amenities = ["Ashok", "Lehren", "Bus"];

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const handleRangeChange = (values) => setRangeValues(values);

  return (
    <>
      {/* Mobile Filter Button Below Search */}
      {!isModalOpen && (
        <div className="sm:hidden sticky top-[100px] left-4 z-50 flex items-center gap-1 cursor-pointer">
          <span
            onClick={() => setIsModalOpen(true)}
            className="text-neutral-50 font-medium flex items-center gap-1"
          >
            Filter
            <motion.span
              animate={{ rotate: isModalOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <FaChevronDown />
            </motion.span>
          </span>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden sm:block w-80 p-4 space-y-4 border border-neutral-200 rounded-lg">
        {/* Price */}
        <div className="border border-neutral-300 rounded-xl p-4 space-y-2">
          <h2 className="text-lg text-neutral-50 font-medium">Price</h2>
          <PriceRangeSlider min={1000} max={3000} onChange={handleRangeChange} />
        </div>

        {/* Bus Types */}
        <div className="border border-neutral-300 rounded-xl p-4 space-y-2">
          <h2 className="text-lg text-neutral-50 font-medium">Bus Types</h2>
          {busTypes.map((type, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" id={`bustype-${i}`} className="h-4 w-4 border border-neutral-300" />
              <label htmlFor={`bustype-${i}`} className="text-sm text-neutral-50 cursor-pointer">{type}</label>
            </div>
          ))}
        </div>

        {/* Bus Companies */}
        <div className="border border-neutral-300 rounded-xl p-4 space-y-2">
          <h2 className="text-lg text-neutral-50 font-medium">Bus Companies</h2>
          {busCompanies.map((company, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" id={`company-${i}`} className="h-4 w-4 border border-neutral-300" />
              <label htmlFor={`company-${i}`} className="text-sm text-neutral-50 cursor-pointer">{company}</label>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="border border-neutral-300 rounded-xl p-4 space-y-2">
          <h2 className="text-lg text-neutral-50 font-medium">Amenities</h2>
          {amenities.map((amenity, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" id={`amenity-${i}`} className="h-4 w-4 border border-neutral-300" />
              <label htmlFor={`amenity-${i}`} className="text-sm text-neutral-50 cursor-pointer">{amenity}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-black rounded-xl shadow-lg w-11/12 max-w-md max-h-[80vh] flex flex-col"
            >
              {/* Close Button */}
              <div className="flex justify-end p-4 flex-shrink-0">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-50 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-4">
                {/* Price Filter */}
                <div className="border border-neutral-300 rounded-xl p-4 space-y-2 relative z-10">
                  <h2 className="text-lg text-neutral-50 font-medium">Price</h2>
                  <PriceRangeSlider min={1000} max={3000} onChange={handleRangeChange} />
                </div>

                {/* Bus Types */}
                <div className="border border-neutral-300 rounded-xl p-4 space-y-2">
                  <h2 className="text-lg text-neutral-50 font-medium">Bus Types</h2>
                  {busTypes.map((type, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" id={`bustype-mobile-${i}`} className="h-4 w-4 border border-neutral-300" />
                      <label htmlFor={`bustype-mobile-${i}`} className="text-sm text-neutral-50 cursor-pointer">{type}</label>
                    </div>
                  ))}
                </div>

                {/* Bus Companies */}
                <div className="border border-neutral-300 rounded-xl p-4 space-y-2">
                  <h2 className="text-lg text-neutral-50 font-medium">Bus Companies</h2>
                  {busCompanies.map((company, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" id={`company-mobile-${i}`} className="h-4 w-4 border border-neutral-300" />
                      <label htmlFor={`company-mobile-${i}`} className="text-sm text-neutral-50 cursor-pointer">{company}</label>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <div className="border border-neutral-300 rounded-xl p-4 space-y-2">
                  <h2 className="text-lg text-neutral-50 font-medium">Amenities</h2>
                  {amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" id={`amenity-mobile-${i}`} className="h-4 w-4 border border-neutral-300" />
                      <label htmlFor={`amenity-mobile-${i}`} className="text-sm text-neutral-50 cursor-pointer">{amenity}</label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filter;