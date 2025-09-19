import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import timetableRouter from "./routes/timetable.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // ✅ Fly.io sets PORT automatically

// Enable CORS for both localhost and deployed frontend
app.use(cors({
  origin: [
    "http://localhost:3000", // for local dev
    "https://hdstravels.netlify.app" // replace with your Netlify domain
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running on Fly.io!");
});

// API routes
app.use("/api/users", usersRouter);
app.use("/api/timetable", timetableRouter);

// Start server (must bind to 0.0.0.0 on Fly.io)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});