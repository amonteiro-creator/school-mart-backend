const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-auth-1": (res, data) =>
    generateResponse(
      res,
      400,
      "Status - Error",
      "Email already registered",
      "e-auth-1",
      data,
    ),
  "e-auth-2": (res, data) =>
    generateResponse(
      res,
      401,
      "Status - Error",
      "Invalid credentials",
      "e-auth-2",
      data,
    ),
  "e-auth-3": (res, data) =>
    generateResponse(
      res,
      401,
      "Status - Unauthorized",
      "Access denied. Invalid or missing token.",
      "e-auth-3",
      data,
    ),
  "e-auth-4": (res, data) =>
    generateResponse(
      res,
      401,
      "Status - Unauthorized",
      "Token has expired. Please login again.",
      "e-auth-4",
      data,
    ),
  "e-auth-5": (res, data) =>
    generateResponse(
      res,
      403,
      "Status - Forbidden",
      "You do not have permission to perform this action.",
      "e-auth-5",
      data,
    ),
};
