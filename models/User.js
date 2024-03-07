const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  walletaddress: {
    type: String,
    required: true,
    unique: true,
    default: "0xNewUer"
  },
  invitecode: {
    type: String,
    required: true,
    unique: true,
    default: "TEDLEE"
  },
  point: {
    type: Number,
    default: 0
  },
  bridgedtoken: {
    type: Number,
    default: 0
  },
  startday: {
    type: Number,
    default: 0
  },
  invitedfriends: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('user', UserSchema);
