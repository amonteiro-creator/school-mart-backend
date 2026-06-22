require("dotenv").config();

const generateResponse = (
  res,
  statusCode,
  statusMessage,
  message,
  rid,
  data,
) => {
  res.statusMessage = statusMessage;
  return res.status(statusCode).json({
    message,
    rid,
    data,
  });
};

module.exports = { generateResponse };
