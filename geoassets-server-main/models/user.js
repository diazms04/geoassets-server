const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  nit: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'admin'
  },
  licenseKey: {
    type: String,
    required: false,
    trim: true
  },
  licenseStatus: {
    type: String,
    enum: ['active', 'expired', 'pending'],
    default: 'pending'
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  licenseIssuedAt: {
  type: Date,
  default: Date.now
  },
  licenseExpiresAt: {
    type: Date
  }
});

module.exports = mongoose.model('User', UserSchema);
