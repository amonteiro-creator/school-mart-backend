const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-uniform-1": (res, data) =>
    generateResponse(
      res,
      201,
      "Status - Success",
      "Uniform created successfully",
      "s-uniform-1",
      data,
    ),
  "s-uniform-2": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Uniforms fetched successfully",
      "s-uniform-2",
      data,
    ),
  "s-uniform-3": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Uniform fetched successfully",
      "s-uniform-3",
      data,
    ),
  "s-uniform-4": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Uniform updated successfully",
      "s-uniform-4",
      data,
    ),
  "s-uniform-5": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Uniform archived successfully",
      "s-uniform-5",
      data,
    ),
};
