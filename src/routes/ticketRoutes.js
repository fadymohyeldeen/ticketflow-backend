import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import ticketModel from "../models/ticketModel.js";
import {
  createTicket,
  getAllTickets,
  getTicketByID,
  updateTicket,
  filterTickets,
} from "../services/ticketServices.js";

const router = express.Router();

router.get("/filter", async (req, res) => {
  try {
    const filteredTickets = await filterTickets(req.query);
    res.json(filteredTickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const tickets = await getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await getTicketByID(id);
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }
    res.send(ticket);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ error: "Please fill all fields" });
    }
    const savedTicket = await createTicket(req.body);
    res.status(201).send(savedTicket);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTicket = await updateTicket(id, req);
    if (!updatedTicket) {
      return res.status(404).send({ error: "Ticket not found" });
    }
    res.status(201).send(updatedTicket);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ticket = await ticketModel.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
