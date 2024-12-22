const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/config.db");

const Class = sequelize.define(
  "class",
  {
    namaDosen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mataKuliah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    namaKelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pertemuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Export the Class model
module.exports = Class;
