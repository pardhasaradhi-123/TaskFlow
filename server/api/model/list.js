const mongoose = require("mongoose");

const listSchemea = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
});

const listModel = new mongoose.model("list", listSchemea);

module.exports = listModel;
