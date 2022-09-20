const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  lastLoginDate: { type: String, unique: true, required: false },
  registrDate: { type: String, unique: true, required: false },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
});

module.exports = model('User', User);
