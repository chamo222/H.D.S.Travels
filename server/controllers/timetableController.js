import Timetable from "../models/Timetable.js";

// GET all
export const getAllTimetables = async (req, res) => {
  try {
    const items = await Timetable.find().sort({ departure: 1 });
    res.json(items);
  } catch (err) {
    console.error("Error fetching timetables:", err);
    res.status(500).json({ error: "Failed to fetch timetables" });
  }
};

// GET by date
export const getTimetableByDate = async (req, res) => {
  try {
    const items = await Timetable.find({ date: req.params.date }).sort({ departure: 1 });
    res.json(items);
  } catch (err) {
    console.error("Error fetching timetable by date:", err);
    res.status(500).json({ error: "Failed to fetch timetable" });
  }
};

// POST add
export const addTimetable = async (req, res) => {
  try {
    const { date, busNumber, from, to, departure, arrival, rounds } = req.body;
    if (!date || !busNumber || !departure) return res.status(400).json({ error: "Missing required fields" });

    const entry = new Timetable({ date, busNumber, from, to, departure, arrival, rounds });
    await entry.save();
    res.json({ message: "Timetable added", entry });
  } catch (err) {
    console.error("Error adding timetable:", err);
    res.status(500).json({ error: "Failed to add timetable" });
  }
};

// PUT update
export const updateTimetable = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    if (!entry) return res.status(404).json({ error: "Timetable not found" });
    res.json({ message: "Updated successfully", entry });
  } catch (err) {
    console.error("Error updating timetable:", err);
    res.status(500).json({ error: "Failed to update timetable" });
  }
};

// DELETE
export const deleteTimetable = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: "Timetable not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting timetable:", err);
    res.status(500).json({ error: "Failed to delete timetable" });
  }
};