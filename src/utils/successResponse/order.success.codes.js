const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-order-1": (res, data) =>
    generateResponse(
      res,
      201,
      "Status - Success",
      "Order created successfully",
      "s-order-1",
      data,
    ),
  "s-order-2": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Orders fetched successfully",
      "s-order-2",
      data,
    ),
  "s-order-3": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Order fetched successfully",
      "s-order-3",
      data,
    ),
  "s-order-4": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Order updated successfully",
      "s-order-4",
      data,
    ),
  "s-order-5": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Order cancelled successfully",
      "s-order-5",
      data,
    ),
};
