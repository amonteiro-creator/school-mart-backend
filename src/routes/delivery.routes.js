const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  assignTracking,
  updateTracking,
  getTracking,
} = require("../controllers/delivery.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const router = Router();

router.post(
  "/:orderId",
  verifyToken,
  isAdmin,
  validate([
    param("orderId").isUUID().withMessage("Valid order ID is required"),
    body("status").notEmpty().withMessage("Status is required"),
  ]),
  assignTracking,
);

router.put(
  "/:orderId",
  verifyToken,
  isAdmin,
  validate([
    param("orderId").isUUID().withMessage("Valid order ID is required"),
    body("status").optional().notEmpty().withMessage("Status cannot be empty"),
    body("location")
      .optional()
      .notEmpty()
      .withMessage("Location cannot be empty"),
  ]),
  updateTracking,
);

router.get(
  "/:orderId",
  verifyToken,
  validate([
    param("orderId").isUUID().withMessage("Valid order ID is required"),
  ]),
  getTracking,
);

module.exports = router;
