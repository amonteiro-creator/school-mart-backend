const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-uniform-1": (res, data) =>
    generateResponse(
      res,
      404,
      "Status - Error",
      "Uniform not found",
      "e-uniform-1",
      data,
    ),
};
