import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaBus, FaEdit, FaSearch, FaTrash } from "react-icons/fa";

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  // User management states
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Timetable states
  const [busNumber, setBusNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [arrival, setArrival] = useState("");
  const [rounds, setRounds] = useState(1);
  const [timetables, setTimetables] = useState([]);
  const [editId, setEditId] = useState(null);

  // Timetable search
  const [timetableSearch, setTimetableSearch] = useState("");

  useEffect(() => {
    if (!isSignedIn) navigate("/signin");
    if (user && user.publicMetadata?.role !== "admin") navigate("/");
  }, [isSignedIn, user, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/users`, {
        headers: { "x-user-id": user?.id },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchTimetables = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/timetable`);
      const data = await res.json();
      setTimetables(data);
    } catch (err) {
      console.error("Failed to fetch timetable:", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUsers();
      fetchTimetables();
    }

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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const removeRole = async (userId) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateTimetable = async () => {
    if (!busNumber || !date || !time) return alert("Please fill all required fields");

    const payload = { busNumber, date, departure: time, from, to, arrival, rounds };

    try {
      if (editId) {
        await fetch(`${BACKEND_URL}/api/timetable/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setEditId(null);
      } else {
        await fetch(`${BACKEND_URL}/api/timetable`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      fetchTimetables();
      setBusNumber(""); setDate(""); setTime(""); setFrom(""); setTo(""); setArrival(""); setRounds(1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (timetable) => {
    setEditId(timetable._id);
    setBusNumber(timetable.busNumber);
    setDate(timetable.date);
    setTime(timetable.departure);
    setFrom(timetable.from || "");
    setTo(timetable.to || "");
    setArrival(timetable.arrival || "");
    setRounds(timetable.rounds || 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timetable?")) return;
    try {
      await fetch(`${BACKEND_URL}/api/timetable/${id}`, { method: "DELETE" });
      fetchTimetables();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const rows = text.split("\n").slice(1);
      const newEntries = rows
        .map((row) => {
          const [busNumber, date, time, from, to, arrival, rounds] = row.split(",");
          return busNumber && date && time
            ? { busNumber, date, departure: time, from, to, arrival, rounds: rounds || 1 }
            : null;
        })
        .filter(Boolean);

      try {
        await Promise.all(
          newEntries.map((entry) =>
            fetch(`${BACKEND_URL}/api/timetable`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(entry),
            })
          )
        );
        fetchTimetables();
      } catch (err) {
        console.error("Error importing CSV:", err);
      }
    };
    reader.readAsText(file);
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

  // Filter timetables by bus number, from, or to
  const filteredTimetables = timetables.filter(
    (t) =>
      t.busNumber.toLowerCase().includes(timetableSearch.toLowerCase()) ||
      (t.from && t.from.toLowerCase().includes(timetableSearch.toLowerCase())) ||
      (t.to && t.to.toLowerCase().includes(timetableSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 space-y-12">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <FaBus className="text-purple-400 text-5xl animate-bounce" />
          <p className="text-gray-300 mt-2">Loading, H.D.S.Travels Admin Panel...</p>
        </div>
      ) : (
        <>
          {/* User Management */}
          <motion.div className="relative max-w-[90%] mx-auto mt-20" variants={fadeIn("up")} initial="hidden" whileInView="visible">
            <div className="rounded-3xl p-[3px] md:p-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-border">
              <div className="bg-black rounded-3xl px-6 py-4 md:py-6 shadow-md text-center">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">Admin Panel: Promote Users</h1>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto relative"
            variants={fadeIn("up")}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-50">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search users, drivers, or admins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </motion.div>

          <motion.div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg space-y-6 relative z-20" variants={fadeIn("up")}>
            <p className="text-gray-300 text-lg text-center">
              Select a user to promote to <span className="text-yellow-400 font-semibold">Driver</span> or <span className="text-purple-400 font-semibold">Admin</span>.
            </p>

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between cursor-pointer border border-gray-600 rounded-lg px-4 py-3 bg-black text-white focus:outline-none"
              >
                {selectedUser ? (
                  <div className="flex items-center gap-3">
                    <img src={selectedUser.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
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
                      <img src={user.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
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

          {/* Timetable Management */}
          <motion.div
            className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg space-y-6 mt-16"
            variants={fadeIn("up")}
          >
            <h2 className="text-2xl font-bold text-center text-purple-400">Timetable Management</h2>

            {/* Manual Add/Edit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input type="text" placeholder="Bus Number" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-900 text-white" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-900 text-white" />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-900 text-white" />
              <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-900 text-white" />
              <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-900 text-white" />
              <input type="time" placeholder="Arrival" value={arrival} onChange={(e) => setArrival(e.target.value)} className="px-4 py-2 rounded-lg bg-gray-900 text-white" />
              <input type="number" placeholder="Rounds" value={rounds} onChange={(e) => setRounds(e.target.value)} min={1} className="px-4 py-2 rounded-lg bg-gray-900 text-white" />
              <button onClick={addOrUpdateTimetable} className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold">
                {editId ? "Update" : "Add"}
              </button>
            </div>

            {/* CSV Import */}
            <div>
              <label className="block text-gray-300 mb-2">Import Timetable (CSV with Bus Number, Date, Time, From, To, Arrival, Rounds)</label>
              <input type="file" accept=".csv" onChange={handleFileUpload} className="block w-full text-sm text-gray-300" />
            </div>

            {/* Timetable Search */}
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-50">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search by Bus Number..."
                value={timetableSearch}
                onChange={(e) => setTimetableSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Timetable Table */}
            <TimetableTable timetables={filteredTimetables} handleEdit={handleEdit} handleDelete={handleDelete} />
          </motion.div>
        </>
      )}
      <motion.div
        className="max-w-3xl mx-auto text-gray-400 text-sm text-center"
        variants={fadeIn("up")}
      >
        ⚠️ Only admin users can access this page. Ensure you select the
        correct user before promoting.
      </motion.div>
    </div>
  );
};

// UserTable component
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
            <td className="px-4 py-2">{user.email}</td>
            <td className={`px-4 py-2 font-semibold text-${roleColor || "blue"}-400`}>{user.role}</td>
            {removeRole && (
              <td className="px-4 py-2">
                <button
                  onClick={() => removeRole(user.id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white text-sm"
                >
                  Remove Role
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// TimetableTable component (with scrollable body)
const TimetableTable = ({ timetables, handleEdit, handleDelete }) => (
  <div className="bg-neutral-800 backdrop-blur-sm p-6 rounded-3xl shadow-lg overflow-x-auto">
    <h2 className="text-xl font-bold mb-4 text-white text-center">All Timetables</h2>
    <div className="max-h-96 overflow-y-auto">
      <table className="min-w-full border-collapse text-white">
        <thead>
          <tr>
            <th className="border-b border-gray-600 px-4 py-2 text-left">Bus No</th>
            <th className="border-b border-gray-600 px-4 py-2 text-left">Date</th>
            <th className="border-b border-gray-600 px-4 py-2 text-left">Departure</th>
            <th className="border-b border-gray-600 px-4 py-2 text-left">From</th>
            <th className="border-b border-gray-600 px-4 py-2 text-left">To</th>
            <th className="border-b border-gray-600 px-4 py-2 text-left">Arrival</th>
            <th className="border-b border-gray-600 px-4 py-2 text-left">Rounds</th>
            <th className="border-b border-gray-600 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timetables.map((timetable) => (
            <tr key={timetable._id} className="hover:bg-gray-800">
              <td className="px-4 py-2">{timetable.busNumber}</td>
              <td className="px-4 py-2">{timetable.date}</td>
              <td className="px-4 py-2">{timetable.departure}</td>
              <td className="px-4 py-2">{timetable.from}</td>
              <td className="px-4 py-2">{timetable.to}</td>
              <td className="px-4 py-2">{timetable.arrival}</td>
              <td className="px-4 py-2">{timetable.rounds}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => handleEdit(timetable)} className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md flex items-center gap-1">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(timetable._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Admin;