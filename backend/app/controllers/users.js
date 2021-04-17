const { userServices } = require("../services");
var md5 = require("MD5");
const loginSessionController = require("./login-session");

/***
 * SignUp function will save user.
 * ** */
const signUp = async (params) => {
  try {
    let userDetails = {
      ...params,
      password: md5(params.password),
    };
    return await userServices.save(userDetails);
  } catch (err) {
    throw err;
  }
};

/***
 * Login function will login.
 * ** */

const login = async (params) => {
  try {
    let userDetails = await userServices.findOne({
      email: params.email,
      password: md5(params.password),
    });
    params.userDetails = userDetails;
    return await loginSessionController.saveSession(params);
  } catch (err) {
    throw err;
  }
};

/***
 * Logout function will logout.
 * ** */
const logout = async (params) => {
  try {
    return await loginSessionController.deleteSession(params);
  } catch (err) {
    throw err;
  }
};

/***
 * GetUser function will get user data.
 * ** */

const getUser = async (params) => {
  try {
    return await userServices.find(params);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  signUp,
  login,
  getUser,
  logout
};
