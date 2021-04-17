const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/***
 * This is the user schema.
 * ** */
const User = new Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    },
    recordId: {
      type: String,
      trim: true,
      index: true,
      // unique: true,
      sparse: true,
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

module.exports = mongoose.model('user', User)
