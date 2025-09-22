import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Make sure to set this in your .env

const ApiLinksManager = () => {
  const [apiLinks, setApiLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch API links from backend
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/apilinks`);
      const data = await res.json();
      setApiLinks(data);
    } catch (err) {
      console.error("Failed to fetch API links:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddOrEdit = async () => {
    if (!name || !url) return alert("Please fill in both fields");
    setLoading(true);

    try {
      if (editIndex !== null) {
        const id = apiLinks[editIndex]._id;
        await fetch(`${BACKEND_URL}/api/apilinks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, url }),
        });
        setEditIndex(null);
      } else {
        await fetch(`${BACKEND_URL}/api/apilinks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, url }),
        });
      }
      await fetchLinks();
      setName("");
      setUrl("");
    } catch (err) {
      console.error("Error saving API link:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    const id = apiLinks[index]._id;
    setLoading(true);
    try {
      await fetch(`${BACKEND_URL}/api/apilinks/${id}`, { method: "DELETE" });
      await fetchLinks();
    } catch (err) {
      console.error("Error deleting API link:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setName(apiLinks[index].name);
    setUrl(apiLinks[index].url);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 space-y-12">
      {/* Page Header */}
      <motion.div
        className="relative max-w-[90%] mx-auto mt-20"
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="visible"
      >
        <div className="rounded-3xl p-[3px] md:p-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient-border">
          <div className="bg-black rounded-3xl px-6 py-4 md:py-6 shadow-md text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
              H.D.S.Travels: API Panel
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg space-y-6"
        variants={fadeIn("up")}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="API Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={handleAddOrEdit}
          disabled={loading}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition-all duration-300"
        >
          {loading
            ? "Saving..."
            : editIndex !== null
            ? "Update Link"
            : "Add Link"}
        </button>
      </motion.div>

      {/* List Section */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-lg space-y-4"
        variants={fadeIn("up")}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-xl font-bold text-purple-400">Saved API Links</h2>
        {loading ? (
          <p className="text-gray-400 animate-pulse">Loading links...</p>
        ) : apiLinks.length === 0 ? (
          <p className="text-gray-400 text-sm">No API links saved yet.</p>
        ) : (
          <ul className="space-y-3">
            {apiLinks.map((link, index) => (
              <li
                key={link._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-800 px-4 py-3 rounded-lg gap-3"
              >
                <div>
                  <p className="font-medium">{link.name}</p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline text-sm break-all"
                  >
                    {link.url}
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default ApiLinksManager;