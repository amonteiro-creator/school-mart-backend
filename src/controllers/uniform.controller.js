const uniformService = require("../services/uniform.service");
const sendResponse = require("../utils/sendResponse");

const createUniform = async (req, res, next) => {
  try {
    const response = await uniformService.createUniform(req.body);
    return sendResponse(response, res, req);
  } catch (error) {
    next(error);
  }
};

const getUniforms = async (req, res, next) => {
  try {
    const response = await uniformService.getUniforms(req.body, req.query);
    return sendResponse(response, res, req);
  } catch (error) {
    next(error);
  }
};

const getUniformById = async (req, res, next) => {
  try {
    const response = await uniformService.getUniformById(req.params.id);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-uniform")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const updateUniform = async (req, res, next) => {
  try {
    const response = await uniformService.updateUniform(
      req.params.id,
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

const deleteUniform = async (req, res, next) => {
  try {
    const response = await uniformService.deleteUniform(req.params.id);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-uniform")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

module.exports = {
  createUniform,
  getUniforms,
  getUniformById,
  updateUniform,
  deleteUniform,
};
