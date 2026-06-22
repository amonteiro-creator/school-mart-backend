const deliveryService = require("../services/delivery.service");
const sendResponse = require("../utils/sendResponse");

const assignTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const response = await deliveryService.assignTracking(orderId, status);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-order")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const updateTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, location } = req.body;
    const response = await deliveryService.updateTracking(
      orderId,
      status,
      location,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-delivery")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const getTracking = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const response = await deliveryService.getTracking(orderId);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-delivery")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

module.exports = {
  assignTracking,
  updateTracking,
  getTracking,
};
