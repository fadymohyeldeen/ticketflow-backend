import ticketModel from "../models/ticketModel.js";

export const getAllTickets = async () => {
  try {
    return await ticketModel.find();
  } catch (err) {
    console.error("Error fetching tickets:", err);
    throw new Error(`Database error: ${err.message}`);
  }
};

export const filterTickets = async (filterObject) => {
  try {
    const tickets = await ticketModel.find(filterObject);
    return tickets;
  } catch (err) {
    console.error("Error fetching tickets:", err);
    throw new Error(`Database error: ${err.message}`);
  }
};

export const getTicketByID = async (id) => {
  try {
    return await ticketModel.findById(id).lean();
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};

export const createTicket = async (ticketData) => {
  try {
    const ticket = new ticketModel(ticketData);
    return await ticket.save();
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};

export const updateTicket = async (id, req) => {
  try {
    const updateData = { ...req.body };

    if (updateData.updatedAt) {
      delete updateData.updatedAt;
    }

    return await ticketModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};

export const deleteTicket = async (id) => {
  try {
    return await ticketModel.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};
