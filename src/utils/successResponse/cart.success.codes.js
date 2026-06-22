const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-cart-1": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Item added to cart successfully",
      "s-cart-1",
      data,
    ),
  "s-cart-2": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Cart retrieved successfully",
      "s-cart-2",
      data,
    ),
  "s-cart-3": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Cart updated successfully",
      "s-cart-3",
      data,
    ),
  "s-cart-4": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Item removed from cart successfully",
      "s-cart-4",
      data,
    ),
};
