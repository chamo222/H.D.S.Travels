import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

// Use environment variable for backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Driver = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isSignedIn) navigate("/signin");
    if (user && user.publicMetadata?.role !== "admin") navigate("/");
  }, [isSignedIn, user, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users`, {
        headers: { "x-user-id": user?.id },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch users");
    }
  };

  useEffect(() => {
    if (user?.id) fetchUsers();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user]);

  const promoteUser = async (role) => {
    if (!selectedUser) return setMessage("Please select a user");
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/make-${role}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser.id }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      fetchUsers();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const removeRole = async (userId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/remove-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      fetchUsers();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const getUserDisplayName = (user) => user.fullName || user.email;

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const regularUsers = filteredUsers.filter((u) => u.role === "user");
  const drivers = filteredUsers.filter((u) => u.role === "driver");
  const admins = filteredUsers.filter((u) => u.role === "admin");

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 space-y-12">
      {/* Page Title */}
      <motion.div
        className="relative max-w-[90%] mx-auto mt-20"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="rounded-3xl p-[3px] md:p-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-border">
          <div className="bg-black rounded-3xl px-6 py-4 md:py-6 shadow-md text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Admin Panel: Promote Users
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
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Search */}
      <motion.div className="max-w-3xl mx-auto" variants={fadeIn("up")}>
        <input
          type="text"
          placeholder="Search users, drivers, or admins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </motion.div>

      {/* Users Dropdown & Buttons */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg space-y-6 relative z-20"
        variants={fadeIn("up")}
      >
        <p className="text-gray-300 text-lg text-center">
          Select a user to promote to{" "}
          <span className="text-yellow-400 font-semibold">Driver</span> or{" "}
          <span className="text-purple-400 font-semibold">Admin</span>.
        </p>

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between cursor-pointer border border-gray-600 rounded-lg px-4 py-3 bg-black text-white focus:outline-none"
          >
            {selectedUser ? (
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div>{getUserDisplayName(selectedUser)}</div>
                  <div className="text-gray-400 text-sm">{selectedUser.email}</div>
                </div>
              </div>
            ) : (
              <span>Select a user</span>
            )}
            <span className="text-gray-400">{dropdownOpen ? "▲" : "▼"}</span>
          </div>

          {dropdownOpen && (
            <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-black border border-gray-600 rounded-lg shadow-lg">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 cursor-pointer"
                >
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div>{getUserDisplayName(user)}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => promoteUser("driver")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Make Driver
          </button>
          <button
            onClick={() => promoteUser("admin")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Make Admin
          </button>
        </div>

        {message && <p className="text-center text-yellow-400 font-medium mt-2">{message}</p>}
      </motion.div>

      {/* User Tables */}
      <motion.div className="space-y-12 max-w-6xl mx-auto" variants={fadeIn("up")}>
        <UserTable title="Users" users={regularUsers} />
        <UserTable title="Drivers" users={drivers} roleColor="purple" removeRole={removeRole} />
        <UserTable title="Admins" users={admins} roleColor="yellow" removeRole={removeRole} />
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto text-gray-400 text-sm text-center"
        variants={fadeIn("up")}
      >
        ⚠ Only admin users can access this page. Ensure you select the correct user before promoting.
      </motion.div>
    </div>
  );
};

const UserTable = ({ title, users, roleColor, removeRole }) => (
  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl shadow-lg overflow-x-auto">
    <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
    <table className="min-w-full border-collapse text-white">
      <thead>
        <tr>
          <th className="border-b border-gray-600 px-4 py-2 text-left">Profile</th>
          <th className="border-b border-gray-600 px-4 py-2 text-left">Full Name</th>
          <th className="border-b border-gray-600 px-4 py-2 text-left">Email</th>
          <th className="border-b border-gray-600 px-4 py-2 text-left">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-800">
            <td className="px-4 py-2">
              <img src={user.profileImageUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            </td>
            <td className="px-4 py-2">{user.fullName}</td>
            <td className="px-4 py-2 text-gray-300 text-sm">{user.email}</td>
            <td className="px-4 py-2 flex items-center gap-2">
              {roleColor === "yellow" ? (
                <span className="text-yellow-400 font-semibold">{user.role}</span>
              ) : roleColor === "purple" ? (
                <span className="text-purple-400 font-semibold">{user.role}</span>
              ) : (
                <span className="text-gray-300">{user.role}</span>
              )}
              {(roleColor === "yellow" || roleColor === "purple") && removeRole && (
                <button
                  onClick={() => removeRole(user.id)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Remove Role
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Driver;