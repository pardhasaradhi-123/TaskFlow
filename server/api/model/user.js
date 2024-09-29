const mongoose = require("mongoose");

const userSchemea = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "list",
    },
  ],
});

const userModel = mongoose.model("user", userSchemea);

module.exports = userModel;
