import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  routeFrom: { type: String, required: true },
  routeTo: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  date: { type: String, required: true }, // <-- NEW field
}, { timestamps: true });

export default mongoose.model("Ticket", TicketSchema);