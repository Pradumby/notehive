const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUserService = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All feilds are required");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = await generateToken(user._id);
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  };
};

const loginUserService = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("All feilds are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = await generateToken(user._id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  };
};

module.exports = { registerUserService, loginUserService };
