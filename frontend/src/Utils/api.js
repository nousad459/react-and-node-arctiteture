import axios from "axios";
import { DEPLOY_PLATFORM } from "./config";
import { message } from "antd";
import { checkCookie } from "../Utils/cookies";


/***
 * Here,Below statement will set the header for Axios
 * ** */

axios.defaults.baseURL = DEPLOY_PLATFORM;
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Pragma"] = "no-cache";
axios.defaults.headers.common["Expires"] = -1;


/***
 * Interface function will use to use set token for each API
 * ** */
axios.interceptors.request.use(
  (config) => {
    const token = checkCookie();
    if (token !== null) {
      config.headers["Authorization"] = "Bearer " + token;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

/***
 * Get function will use to get data
 * ** */
export const get = async (url, config) => {
  return (await axios.get(url, config)).data;
};


/***
 * GetImageBase64 function will use to get image in base64 format
 * ** */
export const getImageBase64 = async (url) => {
  return await axios
    .get(url, { responseType: "arrayBuffer" })
    .then(
      (response) =>
        `data:${response.headers["content-type"]};base64,${btoa(
          String.fromCharCode(...new Uint8Array(response.data))
        )}`
    )
    .catch((error) => {
      console.log("getImageBase64 failed", error);

      return null;
    });
};

/***
 * Post function will use to save data
 * ** */
export const post = async (url, data) => {
  return (await axios.post(url, data)).data;
};


/***
 * Post function will use to save data with file or image
 * ** */
export const postFile = async (url, data) => {
  return (
    await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};

/***
 * Put function will use to update data
 * ** */
export const put = async (url, data) => {
  return (await axios.put(url, data)).data;
};

/***
 * DeleteRec function will use to delete data
 * ** */
export const deleteRec = async (url) => {
  return (await axios.delete(url)).data;
};

/***
 * DeleteRecWithData function will use to delete data and get data in response
 * ** */
export const deleteRecWithData = async (url, data) => {
  return (await axios({ method: "delete", url: url, data: data })).data;
};


/***
 * GenerateApiParameters function will use to create parameter for Pagination, Filter and Sorter
 * ** */
export const generateApiParameters = (pagination, filters, sorter) => {
  let params = {
    limit: pagination.pageSize,
    offset: (pagination.current - 1) * pagination.pageSize,
    sort:
      sorter.field &&
      `${sorter.order === "descend" ? "-" : "+"}${sorter.field}`,
  };
  Object.keys(filters).forEach((item) => {
    if (filters[item]) {
      params[item] = filters[item][0];
    }
  });
  return params;
};


/***
 *handleSimpleApiError will use to handle API errors that return an error in the format
 * ** */
export const handleSimpleApiError = (error, intl) => {
  const { response } = error.errors[0];
  //  debugger
  // console.log("error", error);
  if (!response.response) {
    console.error(error);
    message.error({
      content: "Connection Refused, Please Check Your Server",
      // className: 'custom-class',
      style: {
        textAlign: "right",
      },
    });
  } else {
    if (response.response.data) {
      message.error(
        `${response.response.data.error.message}`
      );
    } else {
      message.error(error.errors[0].response.response.data.message);
    }
  }
};
