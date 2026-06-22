const { validationResult } = require("express-validator");
const sendResponse = require("../utils/sendResponse");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Since we need to follow the rid format, we'll use a generic validation error RID
    // Customizing the message with the first validation error
    return sendResponse(
      {
        rid: "e-global-1",
        message: errors.array()[0].msg,
      },
      res,
      req,
    );
  };
};

module.exports = validate;
