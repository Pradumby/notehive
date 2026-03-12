const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const user = await User.findById(decoded.userId).select("-password");
      req.user = user;

      next();
    } else {
      const error = new Error("Not authorized, token missing");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = protect;
