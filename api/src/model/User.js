const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  cpfCnpf: {
    type: String,
    require: true,
  },
  sex: {
    type: String,
    require: false,
  },
  birthday: {
    type: Date,
    require: false,
  },
  phone: {
    type: String,
    require: true,
  },
  photoUrl: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
