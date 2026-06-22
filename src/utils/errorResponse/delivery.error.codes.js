const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-delivery-1": (res, data) =>
    generateResponse(
      res,
      404,
      "Status - Error",
      "Tracking not found",
      "e-delivery-1",
      data,
    ),
};
