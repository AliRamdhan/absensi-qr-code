const express = require("express");
const absenceController = require("../controller/AbsenceController");

const router = express.Router();

// Create Absence
router.post("/", absenceController.createAbsence);

// Get Absences by User
router.get("/user/:userId", absenceController.getAbsencesByUser);

// Get Absences by Class
router.get("/class/:classId", absenceController.getAbsencesByClass);

// Update Absence
router.put("/:absenceId", absenceController.updateAbsence);

// Delete Absence
router.delete("/:absenceId", absenceController.deleteAbsence);

module.exports = router;
