import express from "express";
import ticketModel from "../models/ticketModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tickets = await ticketModel.find();
  res.send(tickets);
});

router.post("/", async (req, res) => {
  const newTicket = new ticketModel(req.body);
  const savedTicket = await newTicket.save();
  res.status(201).send(savedTicket);
});

export default router;
// update ticket:
// const trackTicketChanges = require('../middlewares/trackTicketChanges');

// router.put('/tickets/:ticketId', trackTicketChanges, async (req, res) => {
//   // Update ticket logic
// });

// router.get("/tickets/:ticketId/history", async (req, res) => {
//   const { ticketId } = req.params;

//   const history = await TicketHistory.find({ ticketId }).populate(
//     "changedBy",
//     "name email"
//   );
//   res.json(history);
// });
