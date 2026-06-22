const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-school-1": (res, data) =>
    generateResponse(
      res,
      201,
      "Status - Success",
      "School created successfully",
      "s-school-1",
      data,
    ),
  "s-school-2": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "Schools fetched successfully",
      "s-school-2",
      data,
    ),
  "s-school-3": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "School fetched successfully",
      "s-school-3",
      data,
    ),
  "s-school-4": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "School updated successfully",
      "s-school-4",
      data,
    ),
  "s-school-5": (res, data) =>
    generateResponse(
      res,
      200,
      "Status - Success",
      "School archived successfully",
      "s-school-5",
      data,
    ),
};
