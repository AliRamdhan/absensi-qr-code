const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/config.db");
const User = require("./Users"); // Import User model
const Class = require("./Classes"); // Import Class model

const Absence = sequelize.define(
  "absence",
  {
    absenceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["present", "pending"],
      defaultValue: "present",
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Define relationships for Absence
Absence.belongsTo(User, { foreignKey: "userId" });
Absence.belongsTo(Class, { foreignKey: "classId" });

module.exports = Absence;
