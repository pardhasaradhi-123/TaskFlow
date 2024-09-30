const express = require("express");
const mongoDbConnection = require("./config/mongoDB");
const cors = require("cors");
const users = require("./api/routes/userRouter");
const list = require("./api/routes/listRouter");

const app = express();
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if PORT isn't defined

// Connect to MongoDB
mongoDbConnection.connect();

// CORS Middleware with specific origin
const corsOptions = {
  origin: 'https://task-flow-client.vercel.app', // Allow only your client
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", users);
app.use("/api/v1/task", list);

// Start server
app.listen(PORT, () => {
  console.log("------------------------");
  console.log(`Server running on port ${PORT}`);
});
