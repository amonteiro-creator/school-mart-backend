const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-order-1": (res, message) =>
    generateResponse(
      res,
      404,
      "Status - Error",
      message || "Order not found",
      "e-order-1",
      null,
    ),
  "e-order-2": (res, message) =>
    generateResponse(
      res,
      400,
      "Status - Error",
      message || "Cannot cancel this order",
      "e-order-2",
      null,
    ),
};
