const { Router } = require("express");
const { body, param, query } = require("express-validator");
const {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controllers/school.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  validate([
    body("name").notEmpty().withMessage("School name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("contact_number").notEmpty().withMessage("Contact number is required"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
  ]),
  createSchool,
);

router.post(
  "/list",
  verifyToken,
  validate([
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer"),
  ]),
  getSchools,
);

router.get(
  "/:id",
  verifyToken,
  validate([param("id").isUUID().withMessage("Valid school ID is required")]),
  getSchoolById,
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validate([
    param("id").isUUID().withMessage("Valid school ID is required"),
    body("name")
      .optional()
      .notEmpty()
      .withMessage("School name cannot be empty"),
    body("address")
      .optional()
      .notEmpty()
      .withMessage("Address cannot be empty"),
    body("contact_number")
      .optional()
      .notEmpty()
      .withMessage("Contact number cannot be empty"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
  ]),
  updateSchool,
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  validate([param("id").isUUID().withMessage("Valid school ID is required")]),
  deleteSchool,
);

module.exports = router;
