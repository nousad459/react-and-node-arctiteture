const usersRoute = require("./users");
require("dotenv").config();
const API_PRE_FIX = process.env.API_PRE_FIX;

module.exports = (app) => {
  app.use(`${API_PRE_FIX}user`, usersRoute);
};
