const mongoose = require("mongoose");

const courierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Courier name is required"],
  },

  // TODO
});

module.exports = mongoose.model("Courier", courierSchema);
