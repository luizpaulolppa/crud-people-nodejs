const mongoose = require('../database');

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
  complement: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  zipCode: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
