const JWT = require("jsonwebtoken");

const generateToken = async (userId) => {
  return JWT.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = generateToken;
