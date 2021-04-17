const { loginSessionServices } = require("../services");
const { jwtHandlersUtils } = require("../utils");

/***
 * SaveSession function will save session.
 * ** */
const saveSession = async (params) => {
  try {
    const saveData = {
      email: params.userDetails.email,
      recordId: params.userDetails.recordId,
      userId: params.userDetails._id,
      authToken: jwtHandlersUtils.getJwtToken(params.email, "web"),
    };
    return await loginSessionServices.save(saveData);
  } catch (err) {
    throw err;
  }
};

/***
 * SaveSession function will delete session.
 * ** */
const deleteSession = async (params) => {
  try {
    const deleteData = {
      userId: params.userId,
     /// authToken: jwtHandlersUtils.getJwtToken(params.email, "web"),
    };
    return await loginSessionServices.deleteAuthToken(params);
  } catch (err) {
    throw err;
  }
};


module.exports = {
  saveSession,
  deleteSession
};
