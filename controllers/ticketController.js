const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

const createTicket = async (req, res) => {
  console.log("userid -> " + req.user.id);
  const user = await User.findById(req.user.id);
  console.log(user);
  // check user
  if (!user) {
    console.log("user not found");
    return;
  }

  const { product, description } = req.body;

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: "new",
  });

  if (ticket) {
    res.status(200).json(ticket);
  }
};
const getTickets = async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log(user);
  if (!user) {
    res.status(400).send("User not found");
    return;
  }

  const ticket = await Ticket.find({ user: req.user.id });
  console.log("tickes is ->" + ticket.user);

  res.status(200).json(ticket);
};
const getTicket = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400).send("User not found");
  }
  const ticket = await Ticket.findById({ _id: req.params.id });
  console.log(ticket);
  if (ticket.user.toString() !== req.user.id) {
    res.status(400).send("Not authorized user");
    return;
  }
  res.status(200).json(ticket);
};
const updateTicket = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  const ticket = await Ticket.findById(req.params.id);
  if (ticket.user.toString() !== req.user.id) {
    res.status(400).send("Not authorized user");
    return;
  }

  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateTicket);
};
const deleteTicket = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400).send("user not found");
    return;
  }
  const ticket = await Ticket.findById(req.params.id);
  if (ticket.user.toString() !== req.user.id) {
    res.status(400).send("Not user user");
  }
  const deletedTicket = await Ticket.deleteOne({ _id: ticket._id });
  res
    .status(200)
    .json({ deletedTicket, message: "Ticket deleted successfully" });
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
