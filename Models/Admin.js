const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  Name: {
    required: true,
    type: String,
  },
  Email: {
    required: true,
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admins", AdminSchema);