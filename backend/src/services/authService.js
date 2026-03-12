const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.registerUserService = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All feilds are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User is already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

exports.loginUserService = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("All feilds are required");
  }

  const user = User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const ismatch = bcrypt.compare(password, user.password);

  if (!ismatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return token;
};
