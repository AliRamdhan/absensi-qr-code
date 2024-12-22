const { Sequelize } = require("sequelize");

// Create a Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_BASE_URL,
    dialect: "mysql",
    logging: false, // Disable logging for production
  }
);

// Connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Exit the process with failure code
  }
};

// Sync database
const syncDB = async () => {
  try {
    // Check if it's a production environment
    const syncOptions =
      process.env.NODE_ENV === "production"
        ? { alter: true }
        : { force: false };

    await sequelize.sync(syncOptions); // Sync models with the database
    console.log("Database synced successfully.");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};
connectDB()
// syncDB()
// Export sequelize instance and connectDB function
module.exports = { sequelize, connectDB, syncDB };
