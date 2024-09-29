const express = require("express");
const mongoDbConnection = require("./config/mongoDB");
const cors = require("cors");
const users = require("./api/routes/userRouter");
const list = require("./api/routes/listRouter");

const app = express();
const PORT = process.env.PORT;

mongoDbConnection.connect();

app.use(cors({
  origin: 'https://task-flow-9xhd.vercel.app', // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // If you need to send cookies or authentication headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", users);
app.use("/api/v1/task", list);

app.listen(PORT, () => {
  console.log("------------------------");
  console.log(`Server running at ${PORT}`);
});
