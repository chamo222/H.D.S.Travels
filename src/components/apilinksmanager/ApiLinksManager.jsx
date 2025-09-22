import React, { useState } from "react";

const ApiLinksManager = () => {
  const [apiLinks, setApiLinks] = useState(() => {
    const saved = localStorage.getItem("apiLinks");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const saveLinks = (links) => {
    setApiLinks(links);
    localStorage.setItem("apiLinks", JSON.stringify(links));
  };

  const handleAddOrEdit = () => {
    if (!name || !url) return alert("Please fill in both fields");
    let updatedLinks;
    if (editIndex !== null) {
      updatedLinks = [...apiLinks];
      updatedLinks[editIndex] = { name, url };
      setEditIndex(null);
    } else {
      updatedLinks = [...apiLinks, { name, url }];
    }
    saveLinks(updatedLinks);
    setName("");
    setUrl("");
  };

  const handleDelete = (index) => {
    const updatedLinks = apiLinks.filter((_, i) => i !== index);
    saveLinks(updatedLinks);
  };

  const handleEdit = (index) => {
    setName(apiLinks[index].name);
    setUrl(apiLinks[index].url);
    setEditIndex(index);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full md:w-80">
      <h2 className="text-lg font-bold text-white mb-4 text-center">API Links</h2>

      <input
        type="text"
        placeholder="API Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400"
      />
      <button
        onClick={handleAddOrEdit}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg mb-4"
      >
        {editIndex !== null ? "Update Link" : "Add Link"}
      </button>

      <ul className="space-y-2">
        {apiLinks.map((link, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg"
          >
            <div>
              <p className="font-medium text-white">{link.name}</p>
              <p className="text-gray-400 text-sm truncate w-40">{link.url}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded-md text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiLinksManager;