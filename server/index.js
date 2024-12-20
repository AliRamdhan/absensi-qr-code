const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV || "development"}.env`),
});

// Debugging logs
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("HOST:", process.env.HOST);
console.log("PORT:", process.env.PORT);

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/api/v1", (req, res) => {
  res.send("Welcome to the API Posyandu Application");
});

// Start the server
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
