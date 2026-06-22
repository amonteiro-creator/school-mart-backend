const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-school-1": (res, data) =>
    generateResponse(
      res,
      404,
      "Status - Error",
      "School not found",
      "e-school-1",
      data,
    ),
};
