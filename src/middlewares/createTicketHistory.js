// const TicketHistory = require('../models/ticketHistoryModel');

// const trackTicketChanges = async (req, res, next) => {
//   const { ticketId } = req.params;
//   const updatedData = req.body;
//   const userId = req.user.id; // Assuming user info is in `req.user`

//   // Fetch the current ticket data
//   const ticket = await Ticket.findById(ticketId);

//   if (!ticket) {
//     return res.status(404).json({ error: 'Ticket not found' });
//   }

//   // Compare changes
//   const changes = {};
//   for (const key in updatedData) {
//     if (ticket[key] !== updatedData[key]) {
//       changes[key] = { old: ticket[key], new: updatedData[key] };
//     }
//   }

//   // Log changes if any
//   if (Object.keys(changes).length > 0) {
//     await TicketHistory.create({
//       ticketId,
//       changedBy: userId,
//       changes,
//     });
//   }

//   next();
// };

// module.exports = trackTicketChanges;
