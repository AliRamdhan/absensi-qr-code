const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/config.db");
const Class = require("./Classes"); // Import Class model after it's defined

const User = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      values: ["admin", "user", "dosen"],
      allowNull: false,
    },
    nim: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    program: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Define the many-to-many relationship after both models are defined
User.belongsToMany(Class, { through: "userClasses", foreignKey: "userId" });
Class.belongsToMany(User, { through: "userClasses", foreignKey: "classId" });

// Export the User model
module.exports = User;
