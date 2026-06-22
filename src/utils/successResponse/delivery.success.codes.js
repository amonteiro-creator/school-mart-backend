const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-delivery-1": (res, data) =>
    generateResponse(
      res,
      201,
      "Status - Success",
      "Tracking created successfully",
      "s-delivery-1",
      data,
    ),
  "s-delivery-2": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Tracking updated successfully",
      "s-delivery-2",
      data,
    ),
  "s-delivery-3": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Tracking fetched successfully",
      "s-delivery-3",
      data,
    ),
};
