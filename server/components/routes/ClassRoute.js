// routes/classRoutes.js
const router = require("express").Router();
const classController = require("../controller/ClassController");

router.post("/", classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/:id", classController.getClassById);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);

module.exports = router;
