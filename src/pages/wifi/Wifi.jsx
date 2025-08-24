import React, { useState, useEffect } from "react";

const Wifi = () => {
  const [ssids, setSsids] = useState([]);
  const [selectedSsid, setSelectedSsid] = useState("");
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [message, setMessage] = useState("");

  const API = "http://localhost:5001/api/wifi";

  // Fetch the available SSIDs from backend
  useEffect(() => {
    fetch(`${API}/list`)
      .then(res => res.json())
      .then(data => setSsids(data));
  }, []);

  // Activate Wi-Fi session
  const activate = async () => {
    if (!selectedSsid) return setMessage("Please select a Wi-Fi SSID");

    const res = await fetch(`${API}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ssid: selectedSsid }) // no user needed
    });
    const data = await res.json();
    if (res.ok) {
      setActive(true);
      setRemaining(data.duration / 1000);
      setMessage(data.message);
    } else {
      setMessage(data.message);
    }
  };

  // Disconnect Wi-Fi session
  const disconnect = async () => {
    const res = await fetch(`${API}/disconnect`, { method: "POST" });
    const data = await res.json();
    setActive(false);
    setRemaining(0);
    setMessage(data.message);
  };

  // Countdown timer
  useEffect(() => {
    let timer;
    if (active && remaining > 0) {
      timer = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            setActive(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [active, remaining]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center mb-4">Free Wi-Fi</h1>

        {ssids.length > 0 && (
          <select
            className="px-4 py-2 border rounded-lg"
            value={selectedSsid}
            onChange={e => setSelectedSsid(e.target.value)}
            disabled={active}
          >
            <option value="">Select SSID</option>
            {ssids.map(s => <option key={s.ssid} value={s.ssid}>{s.ssid}</option>)}
          </select>
        )}

        {!active ? (
          <button
            className="bg-green-500 text-white py-2 rounded-lg"
            onClick={activate}
          >
            Activate Wi-Fi
          </button>
        ) : (
          <button
            className="bg-red-500 text-white py-2 rounded-lg"
            onClick={disconnect}
          >
            Disconnect Wi-Fi
          </button>
        )}

        {active && <p>Time remaining: {Math.floor(remaining / 60)}m {remaining % 60}s</p>}
        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Wifi;