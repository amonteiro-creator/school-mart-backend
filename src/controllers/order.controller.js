const orderService = require("../services/order.service");
const sendResponse = require("../utils/sendResponse");

const createOrder = async (req, res, next) => {
  try {
    const response = await orderService.createOrderFromCart(req.user.user_id);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-cart")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const response = await orderService.getOrders(
      req.user.user_id,
      req.user.role,
      req.body,
      req.query,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const response = await orderService.getOrderById(
      req.params.id,
      req.user.user_id,
      req.user.role,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-order")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const response = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-order")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const response = await orderService.cancelOrder(
      req.params.id,
      req.user.user_id,
      req.user.role,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-order")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
