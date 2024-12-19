const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function loginUser(req, res, next) {
  let { username, password } = req.body;

  let missingFields = [];
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (missingFields.length > 0) {
    let error = new Error(`Missing required fields: ${missingFields.join(",")}`);
    error.status = 400;
    return next(error);
  }

  try {
    let user = await User.find({ username });
    if (!user) {
      let error = new Error("Invalid username or password");
      error.status = 401;
      return next(error);
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      let error = new Error("Invalid username or password");
      error.status = 401;
      return next(error);
    }

    let token = await jwt.sign(user.id, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    res.status(200).json({
      message: "User logged in successfully",
      data: {
        id: user.id,
        token,
      },
    });
  } catch (_) {
    next(new Error());
  }
}

async function createUser(req, res, next) {
  let { username, password } = req.body;

  let missingFields = [];
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (missingFields.length > 0) {
    let error = new Error(`Missing required fields: ${missingFields.join(",")}`);
    error.status = 400;
    return next(error);
  }

  try {
    let doesUserExist = await User.find({ username });
    if (doesUserExist) {
      let error = new Error("A user with that username already exists");
      error.status = 409;
      return next(error);
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    let user = new User({ username, passwordHash: hashedPassword });
    await user.save();
    res.status(200).json({
      message: `User created successfully (ID: ${user.id})`,
    });
  } catch (_) {
    next(new Error());
    // TODO: mongoose errors
  }
}

async function deleteUser(req, res, next) {
  let { id } = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error = new Error("Invalid user ID");
    error.status = 400;
    return next(error);
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: `User deleted successfully (ID: ${id})`,
    });
  } catch (_) {
    next(new Error());
    // TODO: mongoose errors
  }
}

module.exports = { loginUser, createUser, deleteUser };
