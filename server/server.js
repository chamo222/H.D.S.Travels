import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const HOST = "0.0.0.0"; // Important for Fly.io deployment

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://hdstravels.netlify.app", // replace with your frontend URL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Test route at root
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Users routes
app.use("/api/users", usersRouter);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});