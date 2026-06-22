const pingErrorCodes = require("./ping.error.codes");
const authErrorCodes = require("./auth.error.codes");
const schoolErrorCodes = require("./school.error.codes");
const uniformErrorCodes = require("./uniform.error.codes");
const orderErrorCodes = require("./order.error.codes");
const deliveryErrorCodes = require("./delivery.error.codes");
const globalErrorCodes = require("./global.error.codes");
const cartErrorCodes = require("./cart.error.codes");

module.exports = {
  ...pingErrorCodes,
  ...authErrorCodes,
  ...schoolErrorCodes,
  ...uniformErrorCodes,
  ...orderErrorCodes,
  ...deliveryErrorCodes,
  ...globalErrorCodes,
  ...cartErrorCodes,
};
