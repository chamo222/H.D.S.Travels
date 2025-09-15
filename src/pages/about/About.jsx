import React from "react";
import { motion } from "framer-motion";

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 space-y-20">
      {/* Page Title */}
      <motion.div
        className="relative mt-12 sm:mt-20 mb-12 max-w-[90%] mx-auto"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="rounded-3xl p-[3px] md:p-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-border">
          <div className="bg-black rounded-3xl px-4 sm:px-12 py-4 md:py-6 shadow-md text-center">
            <h1 className="text-base xs:text-lg sm:text-2xl md:text-5xl font-extrabold text-white">
              About H.D.S Travels
            </h1>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradientMove 3s linear infinite;
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      {/* Company Overview */}
      <motion.div
        className="max-w-5xl mx-auto text-center space-y-6"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          Who We Are
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          H.D.S Travels is one of Sri Lanka’s trusted names in transportation,
          offering safe, reliable, and comfortable journeys across the island.
          With a modern fleet of Ashok Leyland, Viking, and luxury buses, we
          serve both local commuters and long-distance travelers. Our team is
          dedicated to ensuring every passenger enjoys punctual service,
          convenience, and peace of mind.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to redefine bus travel by combining comfort,
            efficiency, and innovation. Whether it’s a daily commute, a school
            trip, or long-distance travel, we focus on delivering services that
            prioritize passenger safety, affordability, and satisfaction.
          </p>
        </div>
        <motion.img
          src="/src/assets/bus1.jpg"
          alt="Mission"
          className="rounded-2xl shadow-lg w-full h-80 object-cover"
          variants={fadeIn("up")}
        />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        className="max-w-6xl mx-auto text-center space-y-10"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          Why Choose H.D.S Travels?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg"
            variants={fadeIn("up")}
          >
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              Modern Fleet
            </h3>
            <p className="text-gray-300 text-sm">
              Equipped with air-conditioning, reclining seats, and modern
              interiors for a premium ride.
            </p>
          </motion.div>
          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg"
            variants={fadeIn("up")}
          >
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              Safety First
            </h3>
            <p className="text-gray-300 text-sm">
              Every bus follows strict safety standards with seatbelts, GPS
              tracking, and professional drivers.
            </p>
          </motion.div>
          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg"
            variants={fadeIn("up")}
          >
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              Islandwide Service
            </h3>
            <p className="text-gray-300 text-sm">
              From Colombo to Jaffna, Kandy to Galle, we connect communities
              across the country reliably.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-4"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Get in Touch
        </h2>
        <p className="text-gray-300">Have questions or want to book with us? Reach out today.</p>
        <p className="text-gray-400 text-sm">
          📍 Colombo, Sri Lanka |{" "}
          <a href="tel:+94771234567" className="text-yellow-400 hover:underline">
            📞 +94 77 123 4567
          </a>{" "}
          |{" "}
          <a href="mailto:info@hdstravels.com" className="text-yellow-400 hover:underline">
            ✉ info@hdstravels.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default About;