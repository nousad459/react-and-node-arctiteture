import * as types from "../Action";
import { combineReducers } from "redux";


/***
   * Reducer for user Registration
   * ** */
function userRegisterReducer(state = [], action) {
  const response = action.response;
  switch (action.type) {
    case types.REGISTER_USER:
      return { loading: true, ...state };
    case types.REGISTER_USER_SUCCESS:
      return { loading: false, response };
    case types.REGISTER_USER_ERROR:
      return { loading: false, response };
    default:
      return state;
  }
}

/***
   * Reducer for user login 
   * ** */
function userLoginReducer(state = [], action) {
  const response = action.response;
  switch (action.type) {
    case types.LOGIN_USER:
      return { loading: true, ...state };
    case types.LOGIN_USER_SUCCESS:
      return { loading: false, response };
    case types.LOGIN_USER_ERROR:
      return { loading: false, response };
    default:
      return state;
  }
}

export default combineReducers({
  login: userLoginReducer,
  register:userRegisterReducer
});
