import * as api from "../Utils/api";

/***
   * Service for User Register
   * ** */
export const registerService = async (payload) => {  
    let response = await api.post("api/v0/user/signUp", payload);
    return response;  
};

/***
   * Service for User Login
   * ** */
export const loginService = async (payload) => {
  try {
    let response = await api.post("api/v0/user/login", payload);
    return response;
  } catch (error) {
    return error;
  }
};

/***
   * Service for user logout
   * ** */
export const logoutService = async (payload) => {
  try {
    let response = await api.post("api/logout/", payload);
    return response;
  } catch (error) {
    return error;
  }
};

