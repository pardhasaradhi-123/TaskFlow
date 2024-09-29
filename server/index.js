const express = require("express");
const mongoDbConnection = require("./config/mongoDB");
const cors = require("cors");
const users = require("./api/routes/userRouter");
const list = require("./api/routes/listRouter");

const app = express();
const PORT = process.env.PORT;

mongoDbConnection.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", users);
app.use("/api/v1/task", list);

app.listen(PORT, () => {
  console.log("------------------------");
  console.log(`Server running at ${PORT}`);
});
