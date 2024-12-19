const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User username is required"],
    minlength: [3, "User username must be at least 3 characters long"],
  },
  passwordHash: {
    type: String,
    required: [true, "User passwordHash is required"],
  },
});

module.exports = mongoose.model("User", userSchema);
