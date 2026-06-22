const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-cart-1": (res, message) =>
    generateResponse(
      res,
      404,
      "Status - Error",
      message || "Cart not found",
      "e-cart-1",
      null,
    ),
  "e-cart-2": (res, message) =>
    generateResponse(
      res,
      404,
      "Status - Error",
      message || "Item not found in cart",
      "e-cart-2",
      null,
    ),
  "e-cart-3": (res, message) =>
    generateResponse(
      res,
      400,
      "Status - Error",
      message || "Cart is empty",
      "e-cart-3",
      null,
    ),
};
