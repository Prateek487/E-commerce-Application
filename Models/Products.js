const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  Name: {
    required: true,
    type: String,
  },
  Quantity: {
    required: true,
    type: Number,
  },
  Colour: {
    type: String,
    required: true,
  },
  Size: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
