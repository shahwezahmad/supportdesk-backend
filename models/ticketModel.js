const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: [true, "enter status of produt"],
      enum: ["new", "open", "closed"],
      default: "new",
    },
    product: {
      type: String,
      required: [true, "Select product"],
      enum: ["iPhone", "Macbook", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "enter description of product"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
