// server/routes/timetable.js
import express from "express";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const router = express.Router();
const DATA_DIR = path.join(process.cwd(), "data");
const TIMETABLE_FILE = path.join(DATA_DIR, "timetable.json");

// ensure data dir exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(TIMETABLE_FILE)) fs.writeFileSync(TIMETABLE_FILE, "[]", "utf8");

const readFile = () => {
  try {
    const raw = fs.readFileSync(TIMETABLE_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Read timetable error:", err);
    return [];
  }
};

const writeFile = (arr) => {
  try {
    fs.writeFileSync(TIMETABLE_FILE, JSON.stringify(arr, null, 2), "utf8");
  } catch (err) {
    console.error("Write timetable error:", err);
  }
};

// GET all timetable
router.get("/", (req, res) => {
  const items = readFile();
  res.json(items);
});

// GET timetable by date (optional query param)
router.get("/date/:date", (req, res) => {
  const { date } = req.params;
  const items = readFile().filter((i) => i.date === date);
  res.json(items);
});

// POST single timetable entry
router.post("/", (req, res) => {
  const { date, busNumber, from, to, departure, arrival = "", rounds = 1 } = req.body;
  if (!date || !busNumber || !departure) {
    return res.status(400).json({ error: "Missing required fields (date, busNumber, departure)" });
  }
  const items = readFile();
  const newItem = {
    id: randomUUID(),
    date,
    busNumber,
    from: from || "",
    to: to || "",
    departure,
    arrival: arrival || "",
    rounds: Number(rounds) || 1,
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  writeFile(items);
  res.json({ message: "Timetable entry added", entry: newItem });
});

// PUT update timetable entry by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { date, busNumber, from, to, departure, arrival, rounds } = req.body;

  let items = readFile();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Timetable entry not found" });

  // Update fields if provided
  if (date) items[index].date = date;
  if (busNumber) items[index].busNumber = busNumber;
  if (from !== undefined) items[index].from = from;
  if (to !== undefined) items[index].to = to;
  if (departure) items[index].departure = departure;
  if (arrival !== undefined) items[index].arrival = arrival;
  if (rounds) items[index].rounds = Number(rounds);

  items[index].updatedAt = new Date().toISOString();

  writeFile(items);
  res.json({ message: "Timetable entry updated", entry: items[index] });
});

// POST import multiple entries
router.post("/import", (req, res) => {
  const { entries } = req.body;
  if (!Array.isArray(entries)) {
    return res.status(400).json({ error: "Invalid payload; expected entries array" });
  }
  const items = readFile();
  const added = entries.map((e) => {
    const item = {
      id: randomUUID(),
      date: e.date || "",
      busNumber: e.busNumber || "",
      from: e.from || "",
      to: e.to || "",
      departure: e.departure || "",
      arrival: e.arrival || "",
      rounds: Number(e.rounds) || 1,
      createdAt: new Date().toISOString(),
    };
    items.push(item);
    return item;
  });
  writeFile(items);
  res.json({ message: `Imported ${added.length} entries`, added });
});

// DELETE entry
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let items = readFile();
  const before = items.length;
  items = items.filter((i) => i.id !== id);
  writeFile(items);
  res.json({ message: `Deleted ${before - items.length} entries` });
});

export default router;