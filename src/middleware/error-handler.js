const sendResponse = require("../utils/sendResponse");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // If it's a Sequelize error, we might want to handle it specifically
  if (err.name === "SequelizeUniqueConstraintError") {
    return sendResponse(
      {
        rid: "e-global-1",
        message: err.errors[0].message,
      },
      res,
      req,
    );
  }

  // Default internal server error
  return sendResponse(
    {
      rid: "e-global-2",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
    },
    res,
    req,
  );
};

module.exports = errorHandler;
