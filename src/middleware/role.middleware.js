const sendResponse = require("../utils/sendResponse");

/**
 * isAdmin — allows access only if the authenticated user has ADMIN role.
 * Must be used AFTER verifyToken middleware.
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return sendResponse({ rid: "e-auth-5" }, res, req);
  }
  next();
};

/**
 * isParent — allows access only if the authenticated user has PARENT role.
 * Must be used AFTER verifyToken middleware.
 */
const isParent = (req, res, next) => {
  if (!req.user || req.user.role !== "PARENT") {
    return sendResponse({ rid: "e-auth-5" }, res, req);
  }
  next();
};

/**
 * isAdminOrParent — allows access for both ADMIN and PARENT roles.
 * Must be used AFTER verifyToken middleware.
 */
const isAdminOrParent = (req, res, next) => {
  if (!req.user || !["ADMIN", "PARENT"].includes(req.user.role)) {
    return sendResponse({ rid: "e-auth-5" }, res, req);
  }
  next();
};

module.exports = { isAdmin, isParent, isAdminOrParent };
