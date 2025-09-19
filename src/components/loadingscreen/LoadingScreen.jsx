import React from "react";
import { FaBus } from "react-icons/fa";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="flex items-center space-x-3 text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {/* Bus Icon with bounce animation */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        >
          <FaBus className="text-4xl" />
        </motion.div>

        {/* Loading text with dots animation */}
        <motion.span
          className="text-xl font-semibold"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;