const { Router } = require("express");
const { body, param, query } = require("express-validator");
const {
  createUniform,
  getUniforms,
  getUniformById,
  updateUniform,
  deleteUniform,
} = require("../controllers/uniform.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  validate([
    body("school_id").isUUID().withMessage("Valid school ID is required"),
    body("name").notEmpty().withMessage("Uniform name is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("price").isDecimal().withMessage("Valid price is required"),
    body("sizes").isJSON().withMessage("Sizes must be a valid JSON"),
  ]),
  createUniform,
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
    body("school_id")
      .optional()
      .isUUID()
      .withMessage("School ID must be a valid UUID"),
  ]),
  getUniforms,
);

router.get(
  "/:id",
  verifyToken,
  validate([param("id").isUUID().withMessage("Valid uniform ID is required")]),
  getUniformById,
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validate([
    param("id").isUUID().withMessage("Valid uniform ID is required"),
    body("price").optional().isDecimal().withMessage("Valid price is required"),
    body("sizes").optional().isJSON().withMessage("Sizes must be a valid JSON"),
  ]),
  updateUniform,
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  validate([param("id").isUUID().withMessage("Valid uniform ID is required")]),
  deleteUniform,
);

module.exports = router;
