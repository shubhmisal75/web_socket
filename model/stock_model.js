const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    stock_name: {
      type: String,
      required: true,
    },
    stock_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stock", stockSchema);
