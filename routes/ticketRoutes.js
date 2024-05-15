const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");
router.route("/").post(protect, createTicket).get(protect, getTickets);
router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
