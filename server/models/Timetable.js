import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  date: { type: String, required: true },
  departure: { type: String, required: true },
  from: { type: String, default: "" },
  to: { type: String, default: "" },
  arrival: { type: String, default: "" },
  rounds: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

export default mongoose.model("Timetable", timetableSchema);