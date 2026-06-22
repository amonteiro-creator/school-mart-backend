const jwt = require("jsonwebtoken");
const { UserToken } = require("../models");
const sendResponse = require("../utils/sendResponse");

/**
 * verifyToken — validates the incoming JWT from the Authorization header.
 * Also checks the token exists and is not expired in user_tokens table.
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse({ rid: "e-auth-3" }, res, req);
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT signature + expiry
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return sendResponse({ rid: "e-auth-3" }, res, req);
    }

    // Check token exists in DB and is not expired
    const dbToken = await UserToken.findOne({ where: { token } });
    if (!dbToken) {
      return sendResponse({ rid: "e-auth-3" }, res, req);
    }

    if (new Date(dbToken.expires_at) < new Date()) {
      return sendResponse({ rid: "e-auth-4" }, res, req);
    }

    // Attach user payload to request
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyToken };
