const usersRouter = require("express").Router();
const { usersController } = require("../controllers");
const { requestHandlersUtils } = require("../utils");
const { verifyLogin, verifyToken, checkUser } = require("../middlewares/commonMiddleware");
const { MESSAGES } = require("../constants");

/***
 * This router function will get the user data.
 * ** */
usersRouter.route("/getUser").get([verifyToken], async (req, res) => {
  try {
    const params = req.body;
    await usersController
      .getUser(params)
      .then((result) => {
        requestHandlersUtils.sendSuccess(res, result, MESSAGES.userFetched);
      })
      .catch((err) => {
        requestHandlersUtils.sendError(res, err, MESSAGES.apiFailed);
      });
  } catch (err) {
    requestHandlersUtils.sendError(res, err, MESSAGES.apiFailed);
  }
});


/***
 * This router function will register the user.
 * ** */
usersRouter.route("/signUp").post([checkUser], async (req, res) => {
  try {
    const params = req.body;
    await usersController
      .signUp(params)
      .then((result) => {
        requestHandlersUtils.sendSuccess(res, result, MESSAGES.signUpSuccess);
      })
      .catch((err) => {
        requestHandlersUtils.sendError(res, err, MESSAGES.signUpFailed);
      });
  } catch (err) {
    requestHandlersUtils.sendError(res, err, MESSAGES.apiFailed);
  }
});

/***
 * This router function will login the user.
 * ** */
usersRouter.route("/login").post([verifyLogin], async (req, res) => {
  try {
    const params = req.body;
    await usersController
      .login(params)
      .then((result) => {
        requestHandlersUtils.sendSuccess(res, result, MESSAGES.loginSuccess);
      })
      .catch((err) => {
        requestHandlersUtils.sendError(res, err, MESSAGES.loginFailed);
      });
  } catch (err) {
    requestHandlersUtils.sendError(res, err, MESSAGES.apiFailed);
  }
});

/***
 * This router function will logout the user.
 * ** */
usersRouter.route("/logout").delete([verifyToken], async (req, res) => {
  try {
    const params = req.body;
    await usersController
      .logout(params)
      .then((result) => {
        requestHandlersUtils.sendSuccess(res, result, MESSAGES.logoutSuccess);
      })
      .catch((err) => {
        requestHandlersUtils.sendError(res, err, MESSAGES.loginFailed);
      });
  } catch (err) {
    requestHandlersUtils.sendError(res, err, MESSAGES.apiFailed);
  }
});
module.exports = usersRouter;
