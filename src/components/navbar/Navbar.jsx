import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaWifi,
  FaUser,
  FaHome,
  FaBus,
  FaInfoCircle,
  FaHandsHelping,
} from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  const navItems = [
    { label: "Home", link: "/", icon: <FaHome /> },
    { label: "Services", link: "/services", icon: <FaHandsHelping /> },
    { label: "Tickets", link: "/bus-tickets", icon: <FaBus /> },
    { label: "About", link: "/about", icon: <FaInfoCircle /> },
    { label: "Gallery", link: "/gallery", icon: <MdPhotoLibrary /> },
  ];

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const handleRedirect = (link) => {
    navigate(link);
    handleClose();
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollState = window.scrollY;
      if (currentScrollState > scrollPosition && currentScrollState > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setScrollPosition(currentScrollState);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  return (
    <>
      {/* Glow animation */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 5px rgba(34,197,94,0.6), 0 0 10px rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 20px rgba(34,197,94,0.9), 0 0 35px rgba(34,197,94,0.6); }
        }
        .glow { animation: glowPulse 1.5s infinite ease-in-out; }
      `}</style>

      {/* Overlay for Sidebar */}
      {open && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Navbar */}
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-transform duration-500
          ${isVisible ? "translate-y-0" : "-translate-y-full"} 
          ${
            scrollPosition > 50
              ? "backdrop-blur-md bg-white/30 shadow-md h-[7ch]"
              : "bg-transparent h-[9ch]"
          }`}
      >
        <div className="w-full h-full flex items-center justify-between lg:px-24 md:px-16 sm:px-7 px-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight hover:scale-110 transition-transform"
          >
            H.D.S. Travels
          </Link>

          {/* Mobile Wi-Fi Button (only when sidebar closed) */}
          {!open && (
            <Link to="/wifi" className="md:hidden">
              <button className="ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-full border border-green-500 glow flex items-center gap-2 hover:bg-transparent hover:text-green-500 hover:shadow-lg hover:scale-110 transition-all duration-300">
                <FaWifi /> Free Wi-Fi
              </button>
            </Link>
          )}

          {/* Hamburger */}
          <div
            className="md:hidden cursor-pointer text-neutral-400"
            onClick={handleToggle}
          >
            {open ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-10 text-lg font-medium text-neutral-700">
              {navItems.map((item, ind) => (
                <li key={ind}>
                  <Link
                    to={item.link}
                    className="relative group hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Free Wi-Fi Button */}
            <Link to="/wifi">
              <button className="px-5 py-2 bg-green-500 text-white font-semibold rounded-full border border-green-500 glow flex items-center gap-2 hover:bg-transparent hover:text-green-500 hover:shadow-lg hover:scale-110 transition-all duration-300">
                <FaWifi /> Free Wi-Fi
              </button>
            </Link>

            {/* User Section */}
            {isSignedIn ? (
              <div className="flex items-center gap-3 bg-white/70 dark:bg-neutral-800 px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-12 h-12 rounded-full border-2 border-primary",
                    },
                  }}
                />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {user.fullName || user.firstName}
                </span>
              </div>
            ) : (
              <Link to="/signin">
                <button className="px-6 py-2 bg-primary text-white font-semibold rounded-full border border-primary flex items-center gap-2 hover:bg-transparent hover:text-primary hover:shadow-lg hover:scale-110 transition-all duration-300">
                  <FaUser /> Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/10 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-primary">H.D.S Travels</h2>
            <FaTimes
              className="w-6 h-6 cursor-pointer text-neutral-50"
              onClick={handleClose}
            />
          </div>

          {/* Mobile Nav Items */}
          <ul className="flex flex-col gap-5 text-lg font-medium text-neutral-700">
            {navItems.map((item, ind) => (
              <li
                key={ind}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/60 shadow-sm hover:shadow-md hover:bg-red-100 transition-all duration-300"
              >
                <span className="text-primary">{item.icon}</span>
                <button
                  onClick={() => handleRedirect(item.link)}
                  className="hover:text-primary text-left w-full"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* User Info + Wi-Fi */}
          <div className="mt-auto flex flex-col gap-3">
            {isSignedIn ? (
              <div className="flex items-center gap-3 bg-white/70 dark:bg-neutral-800 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all justify-center">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-12 h-12 rounded-full border-2 border-primary",
                    },
                  }}
                />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {user.fullName || user.firstName}
                </span>
              </div>
            ) : (
              <button
                onClick={() => handleRedirect("/signin")}
                className="w-full py-3 bg-primary text-white font-semibold rounded-full border border-primary flex items-center justify-center gap-2 hover:bg-transparent hover:text-primary hover:shadow-md transition-all duration-300"
              >
                <FaUser /> Sign In
              </button>
            )}

            <button
              onClick={() => handleRedirect("/wifi")}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-full border border-green-500 glow flex items-center justify-center gap-2 hover:bg-transparent hover:text-green-500 hover:shadow-md transition-all duration-300"
            >
              <FaWifi /> Free Wi-Fi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;