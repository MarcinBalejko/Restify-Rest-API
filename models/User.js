const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('User', UserSchema);
