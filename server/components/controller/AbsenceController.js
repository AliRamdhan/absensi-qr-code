const absenceService = require("../service/AbsenceService");

// Create Absence
const createAbsence = async (req, res) => {
  try {
    const data = req.body;
    const absence = await absenceService.createAbsence(data);
    res.status(201).json(absence);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Absences by User
const getAbsencesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const absences = await absenceService.getAbsencesByUser(userId);
    res.status(200).json(absences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Absences by Class
const getAbsencesByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const absences = await absenceService.getAbsencesByClass(classId);
    res.status(200).json(absences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Absence
const updateAbsence = async (req, res) => {
  try {
    const { absenceId } = req.params;
    const data = req.body;
    const updatedAbsence = await absenceService.updateAbsence(absenceId, data);
    res.status(200).json(updatedAbsence);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Absence
const deleteAbsence = async (req, res) => {
  try {
    const { absenceId } = req.params;
    await absenceService.deleteAbsence(absenceId);
    res.status(200).json({ message: "Absence deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAbsence,
  getAbsencesByUser,
  getAbsencesByClass,
  updateAbsence,
  deleteAbsence,
};
