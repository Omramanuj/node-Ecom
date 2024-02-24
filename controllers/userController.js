const bcrypt = require("bcrypt");
const db = require("../database/index");
const jwt = require("jsonwebtoken");

const User = db.users;

// User signup handler
const signUp = async (req, res, next) => {
  try {
    const { userName, email, password, role = 'user' } = req.body; // Default role to 'user'
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw { status: 409, message: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role // Include role in user creation
    });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.secretKey, {
      expiresIn: '24h',
    });

    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return res.status(201).json({ user, token }); // Include token in the response
  } catch (error) {
    next(error); // Passing errors to the error middleware
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw { status: 401, message: "Authentication failed" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 401, message: "Authentication failed" };
    }

    const token = jwt.sign({ id: user.id }, process.env.secretKey, {
      expiresIn: '24h',
    });

    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return res.status(201).json(user);
  } catch (error) {
    next(error); // Pass errors to the error middleware
  }
};

const list = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'userName', 'email', 'role'], // Do not return passwords
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
  list
};
