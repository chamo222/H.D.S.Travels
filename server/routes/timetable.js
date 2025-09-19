import express from "express";
import Timetable from "../models/Timetable.js";

const router = express.Router();

// GET all timetables
router.get("/", async (req, res) => {
  try {
    const timetables = await Timetable.find().sort({ departure: 1 });
    res.json(timetables);
  } catch (err) {
    console.error("Error fetching timetables:", err);
    res.status(500).json({ error: "Failed to fetch timetables", details: err.message });
  }
});

// GET timetable by date
router.get("/date/:date", async (req, res) => {
  try {
    const timetables = await Timetable.find({ date: req.params.date }).sort({ departure: 1 });
    res.json(timetables);
  } catch (err) {
    console.error("Error fetching timetables by date:", err);
    res.status(500).json({ error: "Failed to fetch timetables", details: err.message });
  }
});

// POST new timetable
router.post("/", async (req, res) => {
  try {
    const { busNumber, date, departure, from, to, arrival, rounds } = req.body;
    if (!busNumber || !date || !departure)
      return res.status(400).json({ error: "Missing required fields" });

    const entry = new Timetable({ busNumber, date, departure, from, to, arrival, rounds });
    await entry.save();
    res.json({ message: "Timetable added", entry });
  } catch (err) {
    console.error("Error adding timetable:", err);
    res.status(500).json({ error: "Failed to add timetable", details: err.message });
  }
});

// PUT update timetable
router.put("/:id", async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    if (!entry) return res.status(404).json({ error: "Timetable not found" });
    res.json({ message: "Timetable updated", entry });
  } catch (err) {
    console.error("Error updating timetable:", err);
    res.status(500).json({ error: "Failed to update timetable", details: err.message });
  }
});

// DELETE timetable
router.delete("/:id", async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: "Timetable not found" });
    res.json({ message: "Timetable deleted" });
  } catch (err) {
    console.error("Error deleting timetable:", err);
    res.status(500).json({ error: "Failed to delete timetable", details: err.message });
  }
});

export default router;