import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST","PATCH","DELETE"],
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/", (req,res) => res.send("Server is running!"));

// Users routes
app.use("/api/users", usersRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));