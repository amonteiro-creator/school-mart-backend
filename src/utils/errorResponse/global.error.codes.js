const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-global-1": (res, message) =>
    generateResponse(
      res,
      400,
      "Status - Error",
      message || "Validation Error",
      "e-global-1",
      null,
    ),
  "e-global-2": (res, message) =>
    generateResponse(
      res,
      500,
      "Status - Error",
      message || "Internal Server Error",
      "e-global-2",
      null,
    ),
  "e-global-3": (res, message) =>
    generateResponse(
      res,
      404,
      "Status - Error",
      message || "Resource Not Found",
      "e-global-3",
      null,
    ),
};
