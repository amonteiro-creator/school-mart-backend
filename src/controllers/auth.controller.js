const { registerUser, loginUser } = require("../services/auth.service");
const sendResponse = require("../utils/sendResponse");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const response = await registerUser(name, email, password);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-auth")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-auth")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

module.exports = {
  register,
  login,
};
