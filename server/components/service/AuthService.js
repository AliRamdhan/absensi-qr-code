const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/Users");

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({ ...userData, password: hashedPassword });
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

module.exports = { login, register };
