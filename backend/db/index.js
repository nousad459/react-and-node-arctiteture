const mongoose = require('mongoose');
require('dotenv').config();

/***
 * This is the configuration file for mongoDB.
 * ** */

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .catch(e => {
        console.error('Connection error', e.message)
    });
mongoose.connection.on('connected', () => {
    console.log('connected to DB at', process.env.DB_NAME);
});
mongoose.connection.on('disconnected', () => {
    console.log('disconnected to DB at', process.env.DB_NAME);
});
const db = mongoose.connection

module.exports = db;



