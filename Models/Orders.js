const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  ProductId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  UserId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  OrderedOn: {
    type: Date,
    default: Date.now,
  },
  Address: {
    required: true,
    type: String,
  },
  OrderBill: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Orders", OrderSchema);
