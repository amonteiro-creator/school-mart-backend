const pingSuccessCodes = require("./ping.success.codes");
const authSuccessCodes = require("./auth.success.codes");
const schoolSuccessCodes = require("./school.success.codes");
const uniformSuccessCodes = require("./uniform.success.codes");
const orderSuccessCodes = require("./order.success.codes");
const deliverySuccessCodes = require("./delivery.success.codes");
const cartSuccessCodes = require("./cart.success.codes");

module.exports = {
  ...pingSuccessCodes,
  ...authSuccessCodes,
  ...schoolSuccessCodes,
  ...uniformSuccessCodes,
  ...orderSuccessCodes,
  ...deliverySuccessCodes,
  ...cartSuccessCodes,
};
