const jwt = require("jsonwebtoken");
const { MESSAGES } = require("../constants");

/***
 * This function will generate auth token.
 * ** */
const getJwtToken = (email, platformName) => {
  try {
    const timePeriod = process.env.JSON_WEB_TOKEN_SESSION_EXPIRE;
    const expireObject =
      platformName.toLowerCase() === MESSAGES.platformConstant.app.toLowerCase()
        ? {}
        : { expiresIn: timePeriod };
    const token = jwt.sign(
      { email },
      process.env.JSON_WEB_TOKEN_SECRET_KEY,
      expireObject
    );
    return token;
  } catch (err) {
    throw err;
  }
};

/***
 * This function will verify auth token.
 * ** */
const verifyJwtToken = (token) => {
  try {
    jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
    return;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getJwtToken,
  verifyJwtToken,
};
