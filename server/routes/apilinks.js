import express from "express";
import ApiLink from "../models/ApiLink.js";

const router = express.Router();

// Get all API links
router.get("/", async (req, res) => {
  try {
    const links = await ApiLink.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch API links" });
  }
});

// Add new API link
router.post("/", async (req, res) => {
  try {
    const { name, url } = req.body;
    const newLink = new ApiLink({ name, url });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to save API link" });
  }
});

// Update API link
router.put("/:id", async (req, res) => {
  try {
    const { name, url } = req.body;
    const updatedLink = await ApiLink.findByIdAndUpdate(
      req.params.id,
      { name, url },
      { new: true }
    );
    res.json(updatedLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to update API link" });
  }
});

// Delete API link
router.delete("/:id", async (req, res) => {
  try {
    await ApiLink.findByIdAndDelete(req.params.id);
    res.json({ message: "API link deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete API link" });
  }
});

export default router;