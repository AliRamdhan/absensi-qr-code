const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV || "development"}.env`),
});

require("./config/config.db");
const classRoutes = require("./components/routes/ClassRoute");
const authRoutes = require("./components/routes/AuthRoute");
const userRoutes = require("./components/routes/UserRoute");
const absenceRoutes = require("./components/routes/AbsenceRoute");
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/api/v1", (req, res) => {
  res.send("Welcome to the API Application");
});

// Class routes
app.use("/api/v1/class", classRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/attend", absenceRoutes);

// Start the server
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
