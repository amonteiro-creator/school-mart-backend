const cartService = require("../services/cart.service");
const sendResponse = require("../utils/sendResponse");

const getCart = async (req, res, next) => {
  try {
    const response = await cartService.getActiveCartByUserId(req.user.user_id);
    return sendResponse(response, res, req);
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const response = await cartService.addItemToCart(
      req.user.user_id,
      req.body,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-uniform")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const response = await cartService.updateCartItem(
      req.user.user_id,
      req.params.id,
      req.body,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-cart")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const response = await cartService.removeCartItem(
      req.user.user_id,
      req.params.id,
    );
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-cart")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  deleteItem,
};
