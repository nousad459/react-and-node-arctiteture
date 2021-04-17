const jwt = require("jsonwebtoken");
const { userServices } = require("../services");
var md5 = require("MD5");
// const { requestHandlersUtils } = require("../utils");
// const { MESSAGES } = require("../constants");


/***
 * This Function will verify User Email Id during login.
 * ** */
const verifyLogin = async (req, res, next) => {
  try {
    let userDetails = await userServices.findOne({
      email: req.body.email,
      password: md5(req.body.password),
    });
    if (userDetails === null) {
      let error = {
        status: false,
        message: "Wrong credential",
        time: new Date().getTime(),
        errorCode: 403,
      };
      res.status(403).json({
        error,
      });
    } else {
      next();
    }
  } catch (err) {
    throw err;
  }
};

/***
 * This Function will Check, If User already Saved.
 * ** */

const checkUser = async (req, res, next) => {
  try {
    let userDetails = await userServices.findOne({
      email: req.body.email,
    });
    if (!(userDetails === null)) {
      let error = {
        status: false,
        message: "This user already saved",
        time: new Date().getTime(),
        errorCode: 403,
      };
      res.status(403).json({
        error,
      });
    } else {
      next();
    }
  } catch (err) {
    throw err;
  }
};

/***
 * This Function will verify User Email Id during login.
 * ** */
const verifyToken = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  const accessToken = token;

  //if there is no token, the request is unauthorized
  if (!accessToken) {
    let error = {
      status: false,
      message: "Access denied",
      time: new Date().getTime(),
      errorCode: 403,
    };
    return res.status(403).json({
      error,
    });
  }

  let payload;
  try {
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    payload = jwt.verify(accessToken, process.env.JSON_WEB_TOKEN_SECRET_KEY);
    next();
  } catch (e) {
    //if an error occur return request unauthorized error

    let error = {
      status: false,
      message: "Unauthorized",
      time: new Date().getTime(),
      errorCode: 401,
    };
    return res.status(401).json({
      error,
    });
  }
};

module.exports = {
  verifyLogin,
  verifyToken,
  checkUser
};
