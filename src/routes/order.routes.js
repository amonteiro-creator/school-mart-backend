const { Router } = require("express");
const { body, param, query } = require("express-validator");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/order.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  isAdmin,
  isParent,
  isAdminOrParent,
} = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const router = Router();

router.post("/", verifyToken, isParent, createOrder);

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
  getOrders,
);

router.get(
  "/:id",
  verifyToken,
  validate([param("id").isUUID().withMessage("Valid order ID is required")]),
  getOrderById,
);

router.put(
  "/:id/status",
  verifyToken,
  isAdmin,
  validate([
    param("id").isUUID().withMessage("Valid order ID is required"),
    body("status").notEmpty().withMessage("Status is required"),
  ]),
  updateOrderStatus,
);

router.delete(
  "/:id",
  verifyToken,
  isAdminOrParent,
  validate([param("id").isUUID().withMessage("Valid order ID is required")]),
  cancelOrder,
);

module.exports = router;
