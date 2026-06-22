const { Router } = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");

const router = Router();

router.post(
  "/register",
  validate([
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ]),
  register,
);

router.post(
  "/login",
  validate([
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ]),
  login,
);

module.exports = router;
