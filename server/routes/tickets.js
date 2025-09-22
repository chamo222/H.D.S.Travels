// routes/ticket.js
import express from "express";
import {
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from "../controllers/ticket.controller.js";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// CRUD routes
router.get("/", getAllTickets);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

// Delete all tickets
router.delete("/", async (req, res) => {
  try {
    await Ticket.deleteMany({});
    res.json({ message: "All tickets deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;