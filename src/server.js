import express from "express";
import cors from "cors";
import wifiRoutes from "./api/wifi.js"; // your Wi-Fi API

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Mount Wi-Fi routes
app.use("/api/wifi", wifiRoutes);

app.get("/", (req, res) => {
  res.send("Wi-Fi test server running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});