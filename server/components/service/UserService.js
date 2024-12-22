const User = require("../model/Users");
const Class = require("../model/Classes");

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll({ include: Class });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const users = await User.findByPk(id, { include: Class });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    await user.update(userData);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const addUserToClass = async (userId, classId) => {
  try {
    const user = await User.findByPk(userId);
    const classInstance = await Class.findByPk(classId);

    if (!user || !classInstance) throw new Error("User or Class not found");

    await user.addClass(classInstance);
    return { message: "User added to class successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addUserToClass,
};
