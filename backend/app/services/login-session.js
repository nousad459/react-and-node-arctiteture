const loginSession = require("../schemas/login-session");

/***
 * This service will save the user.
 * ** */
const save = (params) => {
  return new Promise((resolve, reject) => {
    const loginSessionSchema = new loginSession(params);
    loginSessionSchema
      .save()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/***
 * This service will find one record of user.
 * ** */
const findOne = (params, fields = {}) => {
  return new Promise((resolve, reject) => {
    loginSession
      .findOne(params, fields)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/***
 * This service will find a user by id and delete.
 * ** */
const deleteAuthToken = (params, fields = {}) => {
  return new Promise((resolve, reject) => {
    loginSession
      .findByIdAndDelete(params._id, fields)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  save,
  findOne,
  deleteAuthToken
};
