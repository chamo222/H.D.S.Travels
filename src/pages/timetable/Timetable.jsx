import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Backend URL from env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const Timetable = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all timetables and filter by date
  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/timetable`);
      const data = await res.json();

      // Filter by selected date (YYYY-MM-DD)
      const filtered = data.filter(
        (entry) => entry.date === selectedDate
      );

      // Sort by departure time
      filtered.sort((a, b) => a.departure.localeCompare(b.departure));

      setTimetables(filtered);
    } catch (err) {
      console.error("Failed to fetch timetables:", err);
      setTimetables([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 space-y-12">
      {/* Page Title */}
      <motion.div
        className="relative max-w-[90%] mx-auto mt-20"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
      >
        <div className="rounded-3xl p-[3px] md:p-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-border">
          <div className="bg-black rounded-3xl px-6 py-4 md:py-6 shadow-md text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Bus Timetable
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Date Picker */}
      <motion.div
        className="max-w-3xl mx-auto text-center mt-8"
        variants={fadeIn("up")}
      >
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 rounded-lg text-black font-semibold"
        />
      </motion.div>

      {/* Timetable Cards */}
      <motion.div
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mt-8"
        variants={fadeIn("up")}
      >
        {loading ? (
          <p className="text-center text-gray-400 col-span-full mt-10">
            Loading buses...
          </p>
        ) : timetables.length > 0 ? (
          timetables.map((entry, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-lg flex flex-col space-y-3 hover:scale-105 transition-all duration-300"
              variants={fadeIn("up")}
            >
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400">
                {entry.busNumber}
              </h2>
              <div className="flex justify-between text-gray-300">
                <span>
                  From: <span className="text-white">{entry.from || "-"}</span>
                </span>
                <span>
                  To: <span className="text-white">{entry.to || "-"}</span>
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>
                  Departure: <span className="text-white">{entry.departure}</span>
                </span>
                <span>
                  Arrival: <span className="text-white">{entry.arrival || "-"}</span>
                </span>
              </div>
              <div className="text-gray-300">
                Rounds: <span className="text-white">{entry.rounds || 1}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full mt-10">
            No buses scheduled for this date.
          </p>
        )}
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
    </div>
  );
};

export default Timetable;