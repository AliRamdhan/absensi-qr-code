const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/:id/classes/:classId", UserController.addUserToClass);

module.exports = router;
