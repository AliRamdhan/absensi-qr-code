const authService = require("../service/AuthService");

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Register User
const register = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, register };
