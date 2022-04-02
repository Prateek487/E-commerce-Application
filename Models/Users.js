const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  Mobile: {
    required: true,
    type: String,
  },
  Photo : {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model("Users", UserSchema);
