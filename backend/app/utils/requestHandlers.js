const { MESSAGES } = require("../constants");
const winston = require("winston");

/***
 * winston.createLogger function will create logger for error.
 * ** */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
});


/***
 * This function will create API responses.
 * ** */
const sendSuccess = (res, result, message) => {
  const response = {};
  response.code = 200;
  response.status = "success";
  response.result = result;
  response.time = new Date().getTime();
  if (message) {
    response.message = message;
  }
  return res.status(200).json(response);
};

/***
 * This function will create API error responses.
 * ** */
const sendError = (res, err = {}, message) => {
  const response = {};
  response.time = new Date().getTime();
  let errorCode = err.code || 404;
  if (!err.code) {
    response.errorCode = 500;
    response.message = MESSAGES.internalServer;
    errorCode = 500;
    response.err = err;
  } else {
    if (message) {
      response.message = message;
    }
    if (err.errorCode) {
      response.errorCode = err.errorCode;
    } else {
      errorCode = 500;
    }
    if (errorCode !== 200) {
      response.err = err;
    }
  }
  logger.log({
    level: "error",
    message: response,
  });
  return res.status(errorCode).json(response);
};

/***
 * This function will create validation error.
 * ** */
const validationError = (res, error) => {
  error.time = new Date().getTime();
  error.status = "error";
  error.code = 400;
  error.result = error.result ? error.result : null;
  logger.log({
    level: "warn",
    message: error,
  });
  return res.status(400).json(error);
};

/***
 * This function will redirect to specified URL .
 * ** */
const redirectToReturnUrl = (res, result) => {
  res.redirect(
    result.returnUrl + "?token=" + result.token + "&status=canceled"
  );
};
module.exports = {
  sendSuccess,
  sendError,
  validationError,
  redirectToReturnUrl,
};
