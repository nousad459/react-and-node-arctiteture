import { combineReducers } from "redux";
import auth from "./authenticationReducer";

/***
   * This is root reduce
   * ** */
export default combineReducers({
  auth,
});
