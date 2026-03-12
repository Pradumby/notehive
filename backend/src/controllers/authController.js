const {
  registerUserService,
  loginUserService,
} = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully ",
    user: user,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const data = await loginUserService(req.body);
  res.status(201).json({
    success: true,
    message: "User login successfully ",
    token: data.token,
  });
});

module.exports = { registerUser, loginUser };
