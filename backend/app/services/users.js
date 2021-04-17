const users = require("../schemas/users");

/***
 * This service will save the user.
 * ** */
const save = (params) => {
  return new Promise((resolve, reject) => {
    const usersSchema = new users(params);
    usersSchema
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
 * This service will update one record.
 * ** */
const updateOne = (conditions, params) => {
  return new Promise((resolve, reject) => {
    users
      .updateOne(conditions, params)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/***
 * This service will find one record of user.
 * ** */
const findOne = (params, fields = {}) => {
  return new Promise((resolve, reject) => {
    users
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
 * This service will find all record of user.
 * ** */
const find = (params = {}, fields = {}) => {
  return new Promise((resolve, reject) => {
    users
      .find(params, fields)
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
  updateOne,
  findOne,
  find,
};
