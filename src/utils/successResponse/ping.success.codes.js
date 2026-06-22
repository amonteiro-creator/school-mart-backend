const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-ping-1": (res, data) => {
    generateResponse(
      res,
      200,
      "Status - Success",
      "Welcome to School Accessories Mart Backend",
      "s-ping-1",
      data,
    );
  },
};
