// controllers/classController.js
const classService = require("../service/ClassService");

const createClass = async (req, res) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classInstance = await classService.getClassById(req.params.id);
    if (!classInstance) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classInstance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const updatedClass = await classService.updateClass(req.params.id, req.body);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    await classService.deleteClass(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};