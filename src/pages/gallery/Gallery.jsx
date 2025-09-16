import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

import Bus1 from "../../assets/bus1.jpg";
import Bus2 from "../../assets/bus2.jpg";
import Bus3 from "../../assets/bus3.jpg";
import HDCBus4 from "../../assets/hdcbus4.jpg";
import HDCTrackers from "../../assets/H.D.C.Trackers.jpg";
import Server from "../../assets/server.jpg";

const images = [
  {
    src: Bus1,
    alt: "Ashok Bus",
    title: "Ashok Bus",
    description:
      "The Ashok Bus is a reliable and comfortable option for long-distance travel. It features ergonomic seating, air conditioning, and large windows for scenic views. Perfect for families, students, and travelers who want a smooth ride on highways and urban routes. Safety features include seat belts, emergency exits, and anti-lock braking systems. Ideal for trips across the country while maintaining comfort and punctuality.",
  },
  {
    src: Bus2,
    alt: "Leyland Bus",
    title: "Leyland Bus",
    description:
      "The Leyland Bus combines modern design with comfort and durability. It comes equipped with reclining seats, on-board entertainment, and high-efficiency suspension systems. Designed for urban and rural travel, Leyland Buses are trusted for their reliability, ease of maintenance, and long-lasting performance. Perfect for group tours, city transport, and regular commuter routes.",
  },
  {
    src: Bus3,
    alt: "Viking Bus",
    title: "Viking Bus",
    description:
      "Viking Buses are known for their robust construction and high passenger capacity. With modern interiors, efficient fuel systems, and safety compliance, they are suitable for long-haul journeys as well as intercity travel. Comfortable seating and quiet engines make the Viking Bus ideal for daily commuters and travel agencies looking for premium service.",
  },
  {
    src: HDCBus4,
    alt: "HDC Bus",
    title: "HDC Bus",
    description:
      "HDC Buses offer a perfect balance of style and functionality. Designed with spacious interiors, climate control, and safety features, they cater to both private and public transport needs. Its sturdy design ensures durability on highways and rough terrains, making it a versatile choice for modern transportation solutions.",
  },
  {
    src: HDCTrackers,
    alt: "HDC Trackers",
    title: "HDC Trackers",
    description:
      "HDC Trackers provide advanced GPS and tracking solutions for buses. Fleet managers can monitor routes, ensure safety, and improve efficiency. Integrated with digital dashboards and real-time updates, this system is essential for modern transport services that value operational excellence and customer satisfaction.",
  },
  {
    src: Server,
    alt: "Server Setup",
    title: "Server Infrastructure",
    description:
      "Our Server Infrastructure powers the HDS Travels booking system. It ensures smooth ticketing, real-time availability, and secure payment processes. Optimized for high traffic, reliability, and speed, the backend supports all operational aspects of HDS Travels, guaranteeing seamless service for passengers.",
  },
];

const fadeIn = (direction = "left") => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const GalleryItem = ({ img, reverse }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 p-4 rounded-2xl shadow-lg bg-gray-900/50 backdrop-blur-sm ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn(reverse ? "right" : "left")}
    >
      {/* Image */}
      <div className="flex-1 cursor-pointer">
        <img
          src={img.src}
          alt={img.alt}
          className="rounded-2xl shadow-lg w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Title + Description */}
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400">
          {img.title}
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          {img.description}
        </p>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-black px-6 py-16 space-y-16">
      {/* Page Title */}
      <motion.div
        className="relative mt-12 sm:mt-20 mb-12 max-w-[90%] mx-auto"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Outer gradient border */}
        <div className="rounded-3xl p-[3px] md:p-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-border">
          {/* Inner card with solid white background */}
          <div className="bg-black rounded-3xl px-4 sm:px-12 py-4 md:py-6 shadow-md text-center">
            <h1 className="text-base xs:text-lg sm:text-2xl md:text-5xl font-extrabold text-white">
              H.D.S Travels Bus Gallery
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

      {/* Gallery Items */}
      {images.map((img, index) => (
        <div key={index} onClick={() => setSelectedImage(img)}>
          <GalleryItem img={img} reverse={index % 2 === 1} />
        </div>
      ))}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="rounded-2xl w-full max-h-[80vh] object-contain shadow-2xl"
            />
            <div className="bg-gray-900 p-6 rounded-b-2xl shadow-lg mt-4">
              <h3 className="text-2xl font-bold text-white">
                {selectedImage.title}
              </h3>
              <p className="text-gray-300 mt-2">{selectedImage.description}</p>
            </div>
            <button
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery;