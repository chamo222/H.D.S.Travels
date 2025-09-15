import React from "react";
import RootLayout from "../../../layout/RootLayout";
import ServiceCard from "../../../components/service/ServiceCard";
import { RiRefund2Line, RiSecurePaymentLine } from "react-icons/ri";
import { PiHeadsetFill } from "react-icons/pi";
import { FaBusAlt, FaMapMarkedAlt, FaBolt, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const Services = () => {
  return (
    <RootLayout className="space-y-16 py-12 bg-black text-white">
      {/* Page Title */}
      <motion.div
        className="relative mt-8 sm:mt-14 mb-12 max-w-[90%] mx-auto"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="rounded-3xl p-[3px] md:p-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-border">
          <div className="bg-black rounded-3xl px-6 sm:px-12 py-4 md:py-6 shadow-md text-center">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-extrabold text-white">
              Our <span className="text-yellow-400">Services</span>
            </h1>
            <p className="mt-3 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              At H.D.S Travels, we make your journey simple, safe, and enjoyable. 
              From booking to reaching your destination, we provide complete support 
              with modern facilities and trusted service.
            </p>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradientMove 3s linear infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* First Section (with cards) */}
      <motion.div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <ServiceCard
          icon={RiSecurePaymentLine}
          title={"Secure Payment"}
          desc={"Safe and reliable online payment methods for ticket booking."}
        />
        <ServiceCard
          icon={RiRefund2Line}
          title={"Refund Policy"}
          desc={"Easy refunds with transparent terms for canceled trips."}
        />
        <ServiceCard
          icon={PiHeadsetFill}
          title={"24/7 Support"}
          desc={"Our team is always available to assist you anytime, anywhere."}
        />
      </motion.div>

      {/* Second Section (About-page style, no boxes) */}
      <div className="max-w-5xl mx-auto space-y-12 px-6">
        {/* Online Booking */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8"
          variants={fadeIn("left")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaBusAlt className="text-yellow-400 text-5xl" />
          <div>
            <h2 className="text-2xl font-bold text-white">Online Booking</h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Book your tickets online quickly with just a few clicks, avoiding 
              long queues and saving time for your journey.
            </p>
          </div>
        </motion.div>

        {/* Wide Route Coverage */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-8"
          variants={fadeIn("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaMapMarkedAlt className="text-pink-400 text-5xl" />
          <div>
            <h2 className="text-2xl font-bold text-white">Wide Route Coverage</h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              Our buses cover multiple towns and cities across the region, ensuring 
              you can always find a ride wherever you are.
            </p>
          </div>
        </motion.div>

        {/* Fast & Reliable */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8"
          variants={fadeIn("left")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaBolt className="text-purple-400 text-5xl" />
          <div>
            <h2 className="text-2xl font-bold text-white">Fast & Reliable</h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              With punctual departures and safe journeys, H.D.S Travels ensures 
              your trip is always smooth and dependable.
            </p>
          </div>
        </motion.div>

        {/* 24x7 CCTV Cameras */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-8"
          variants={fadeIn("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaVideo className="text-blue-400 text-5xl" />
          <div>
            <h2 className="text-2xl font-bold text-white">24/7 CCTV Cameras</h2>
            <p className="text-gray-300 mt-2 leading-relaxed">
              All our buses are equipped with 24/7 CCTV cameras to ensure passenger safety and monitoring during your journey.
            </p>
          </div>
        </motion.div>
      </div>
    </RootLayout>
  );
};

export default Services;