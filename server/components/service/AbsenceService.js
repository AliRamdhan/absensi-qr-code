const Absence = require("../model/Absence"); // Import the Absence model
const Class = require("../model/Classes");
const User = require("../model/Users");

// Create Absence
const createAbsence = async (data) => {
  try {
    const absence = await Absence.create(data);
    return absence;
  } catch (error) {
    throw error;
  }
};

// Get all Absences by User
const getAbsencesByUser = async (userId) => {
  try {
    const absences = await Absence.findAll({
      where: { userId },
      include: [
        { model: User }, // Menggunakan alias "User"
        { model: Class }, // Menggunakan alias "Class"
      ],
    });
    return absences;
  } catch (error) {
    throw error;
  }
};

// Get all Absences by Class
const getAbsencesByClass = async (classId) => {
  try {
    const absences = await Absence.findAll({
      where: { classId },
      include: [
        { model: User }, // Menggunakan alias "User"
        { model: Class }, // Menggunakan alias "Class"
      ],
    });
    return absences;
  } catch (error) {
    throw error;
  }
};

// Update Absence
const updateAbsence = async (absenceId, data) => {
  try {
    const absence = await Absence.findByPk(absenceId);
    if (!absence) {
      throw new Error("Absence not found");
    }
    return await absence.update(data);
  } catch (error) {
    throw error;
  }
};

// Delete Absence
const deleteAbsence = async (absenceId) => {
  try {
    const absence = await Absence.findByPk(absenceId);
    if (!absence) {
      throw new Error("Absence not found");
    }
    await absence.destroy();
    return absence;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAbsence,
  getAbsencesByUser,
  getAbsencesByClass,
  updateAbsence,
  deleteAbsence,
};
