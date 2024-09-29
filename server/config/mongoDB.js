const mongoose = require("mongoose");
require("dotenv").config();
const mongoString = process.env.MONGODB_URL;

module.exports = {
  connect: () => {
    mongoose.connect(mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("connected to DB");
    });
    db.on("error", (err) => {
      console.log(err.message);
    });
  },
};
