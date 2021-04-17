const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/***
 * This is the LoginSession schema.
 * ** */
const LoginSession = new Schema(
  {
    email: {
      type: String,
      index: true,
      sparse: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    userId: {
      type: String,
      index: true,
      required: true,
    },
    recordId: {
      type: String,
      index: true
    },
    authToken: {
      type: String,
      index: true,
      required: true
    },
    status: {
      type: Number,
      default: 1, // 1- Active, 2- Inactive
    }
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('login_session', LoginSession)
