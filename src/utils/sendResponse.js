const errorResponse = require("./errorResponse");
const successResponse = require("./successResponse");

module.exports = (reqRes, res, req) => {
  const isSuccess = reqRes.rid[0] === "s";
  const handlers = isSuccess ? successResponse : errorResponse;
  const handler = handlers[reqRes.rid];

  if (handler) {
    return handler(res, isSuccess ? reqRes.data : reqRes.message);
  }

  return res.status(500).json({
    status: "Error",
    message: `Response handler for RID ${reqRes.rid} not found.`,
  });
};
