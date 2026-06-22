const schoolService = require("../services/school.service");
const sendResponse = require("../utils/sendResponse");

const createSchool = async (req, res, next) => {
  try {
    const response = await schoolService.createSchool(req.body);
    return sendResponse(response, res, req);
  } catch (error) {
    next(error);
  }
};

const getSchools = async (req, res, next) => {
  try {
    const response = await schoolService.getSchools(req.body, req.query);
    return sendResponse(response, res, req);
  } catch (error) {
    next(error);
  }
};

const getSchoolById = async (req, res, next) => {
  try {
    const response = await schoolService.getSchoolById(req.params.id);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-school")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const updateSchool = async (req, res, next) => {
  try {
    const response = await schoolService.updateSchool(req.params.id, req.body);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-school")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

const deleteSchool = async (req, res, next) => {
  try {
    const response = await schoolService.deleteSchool(req.params.id);
    return sendResponse(response, res, req);
  } catch (error) {
    if (error.message.startsWith("e-school")) {
      return sendResponse({ rid: error.message }, res, req);
    }
    next(error);
  }
};

module.exports = {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
