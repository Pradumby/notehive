const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express();
const { body } = require("express-validator");
const validate = require("../middlewares/validate");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  registerUser
);
router.post("/login", loginUser);

module.exports = router;
