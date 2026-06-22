const { pingServer } = require("../helpers/ping.helper");
const sendResponse = require("../utils/sendResponse");

const getPing = async (req, res, next) => {
  try {
    const response = await pingServer();
    return sendResponse(response, res, req);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPing,
};
