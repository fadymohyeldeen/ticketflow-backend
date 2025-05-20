import mongoose from "mongoose";
import { updateTimestamp } from "../middlewares/ticketMiddleware.js";

const ticketSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientNumber: { type: Number, required: true },
  ticketSubject: { type: String, required: true },
  ticketMessage: { type: String, required: true },
  ticketStatus: {
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

updateTimestamp(ticketSchema);

export default mongoose.model("Ticket", ticketSchema);
