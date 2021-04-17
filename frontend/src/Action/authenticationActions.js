import * as types from "./index";

/***
   * Action for User Registration
   * ** */
export const userRegisterAction = (payload) => {
  return {
    type: types.REGISTER_USER,
    payload,
  };
};

/***
   * Action for user login
   * ** */
export const loginUserAction = (user) => {
  return {
    type: types.LOGIN_USER,
    user,
  };
};

/***
   * Action for user logout
   * ** */
export const userLogoutAction = (userId) => {
  return {
    type: types.LOGOUT_USER,
    userId,
  };
};


