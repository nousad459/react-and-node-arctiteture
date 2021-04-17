/***
   * Prefix for all api calls
   * ** */
const LOCAL_URL = process.env.REACT_APP_API_BASE_URL;
const PRODUCTION_URL = process.env.REACT_APP_API_PRODUCTION_URL;

// debugger
/***
   * This function use for set end point for different platform 
   * ** */
export const DEPLOY_PLATFORM =
  "localhost" === window.location.hostname || "lcl" === window.location.hostname
    ? LOCAL_URL
    : "epcdemo.azurewebsites.net" === window.location.hostname
    ? PRODUCTION_URL
    : "quality";

export const BASENAME = process.env.REACT_APP_USER_BASE_NAME;
export const BACKEND_BASENAME = process.env.REACT_APP_BACKEND_BASENAME;
