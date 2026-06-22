const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-auth-1": (res, data) =>
    generateResponse(
      res,
      201,
      "Status - Success",
      "User registered successfully",
      "s-auth-1",
      data,
    ),
  "s-auth-2": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Login successful",
      "s-auth-2",
      data,
    ),
};
