import ticketModel from "../models/ticketModel.js";

export const getAllTickets = async () => {
  try {
    return await ticketModel.find();
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};

export const getTicketByID = async (id) => {
  try {
    return await ticketModel.findById(id);
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};

export const createTicket = async (ticketData) => {
  try {
    return await ticketModel.create(ticketData);
  } catch (err) {
    throw new Error(`Database error: ${err.message}`);
  }
};

export const updateTicket = async (id, req) => {
  try {
    return await ticketModel.findByIdAndUpdate(id, req.body, {
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
