const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  getCart,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { isParent } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const router = Router();

router.use(verifyToken, isParent);

router.get("/", getCart);

router.post(
  "/",
  validate([
    body("uniform_id").isUUID().withMessage("Valid uniform ID is required"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("size").notEmpty().withMessage("Size is required"),
  ]),
  addItem,
);

router.put(
  "/:id",
  validate([
    param("id").isUUID().withMessage("Valid cart item ID is required"),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("size").optional().notEmpty().withMessage("Size cannot be empty"),
  ]),
  updateItem,
);

router.delete(
  "/:id",
  validate([
    param("id").isUUID().withMessage("Valid cart item ID is required"),
  ]),
  deleteItem,
);

module.exports = router;
