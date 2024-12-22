// services/classService.js
const Class = require("../model/Classes");
const User = require("../model/Users");

const createClass = async (classData) => {
  return await Class.create(classData);
};

const getAllClasses = async () => {
  return await Class.findAll();
};

const getClassById = async (id) => {
  return await Class.findByPk(id, { include: User });
};

const updateClass = async (id, updatedData) => {
  const classInstance = await Class.findByPk(id);
  if (!classInstance) {
    throw new Error("Class not found");
  }
  return await classInstance.update(updatedData);
};

const deleteClass = async (id) => {
  const classInstance = await Class.findByPk(id);
  if (!classInstance) {
    throw new Error("Class not found");
  }
  return await classInstance.destroy();
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
